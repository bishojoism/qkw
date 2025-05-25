import { decode256to64, encode64to256 } from "./base";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    const body = new FormData()
    body.append('reqtype', 'fileupload')
    body.append('fileToUpload', await req.blob())
    console.log(body)
    return new Response(encode64to256((await (await fetch("https://catbox.moe/user/api.php", { method: 'POST', body })).text()).substring(25)))
}

export const GET = async (req: NextRequest) => {
    return new Response(await (await fetch(`https://files.catbox.moe/${decode256to64(new URL(req.url!).searchParams.get('text')!)}`)).blob())
}