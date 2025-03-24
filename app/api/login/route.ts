import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);

  const { username, password } = req.body;

  const PATH_VARIABLE = process.env.NEXT_PUBLIC_API_URL;

  // 调用后端登录接口
  const response = await fetch(`${PATH_VARIABLE}/system/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await response.json();

  return res.status(response.status).json(data);
}

// 如果需要处理其他 HTTP 方法，可以在这里定义相应的函数
// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//   // 处理 GET 请求
// }
