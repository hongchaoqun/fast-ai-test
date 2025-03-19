import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen mx-auto w-full bg-gradient-to-r from-blue-300 to-indigo-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">登录</h2>
        <form className="space-y-4">
          <div>
            <Label htmlFor="username" className="text-gray-700">账号</Label>
            <Input 
              type="text" 
              id="username" 
              name="username" 
              required 
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
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 transition duration-300"
            />
          </div>
          <div>
            <Button 
              type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              登录页面
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
