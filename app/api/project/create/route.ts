import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  

  const body = await req.json();
  console.log(body.name);
  console.log(body.description);
  console.log(body.token);

  const PATH_VARIABLE = process.env.NEXT_PUBLIC_API_URL;

  const params = JSON.stringify({
    name: body.name,
    description: body.description,
  });
  console.log(params);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${body.token}`
  };
  
  // 调用后端登录接口
  const response = await fetch(`${PATH_VARIABLE}/project/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: params,
  });

  const data = await response.json();

  return NextResponse.json(data);
}