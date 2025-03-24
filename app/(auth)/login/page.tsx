"use client"

import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 处理登录逻辑
  const handleLogin = async (event: { preventDefault: () => void; }) => {
    event.preventDefault(); // 阻止表单默认提交行为

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('登录失败');
      }

      const data = await response.json();

      if (data.code === 0) {
        // 登录成功，保存 token 到 localStorage
        const { accessToken } = data.data;
        localStorage.setItem('token', accessToken);
        alert('登录成功');
        // 可以在这里跳转到其他页面
      } else {
        // 登录失败，提示错误信息
        alert(data.msg || '登录失败');
      }
    } catch (error) {
      console.error('登录失败:', error);
      alert('登录失败，请稍后再试');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mx-auto w-full bg-gradient-to-r from-blue-300 to-indigo-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">登录</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <Label htmlFor="username" className="text-gray-700">账号</Label>
            <Input 
              type="text" 
              id="username" 
              name="username" 
              required 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 transition duration-300"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-gray-700">密码</Label>
            <Input 
              type="password" 
              id="password" 
              name="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 transition duration-300"
            />
          </div>
          <div>
            <Button 
              type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              登录
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}