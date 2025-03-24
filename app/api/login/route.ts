import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  

  const body = await req.json();
  console.log(body);
  console.log(body.username);
  console.log(body.tenantName);

  const PATH_VARIABLE = process.env.NEXT_PUBLIC_API_URL;

  const params = JSON.stringify({
    username: body.username,
    password: body.password,
    tenantName: body.tenantName,
  });
  console.log(params);
  
  // 调用后端登录接口
  const response = await fetch(`${PATH_VARIABLE}/system/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: params,
  });

  const data = await response.json();

  return NextResponse.json(data);
}