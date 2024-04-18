export async function GET(){
  return new Response("Hello World", {status: 200})
}

export async function POST(request: Request){
  const data = await request.json();
  return new Response(JSON.stringify(data), {status: 200})
}