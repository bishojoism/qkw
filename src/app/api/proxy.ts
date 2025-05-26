export default function proxy(req: Request) {
    try {
        const url = new URL(req.url).searchParams.get('url')
        if (url === null) return new Response("请在网址里填写搜索参数url", { status: 400 })
        const { method, headers, body } = req
        headers.delete('host')
        return fetch(url, {
            method,
            headers,
            body,
            // @ts-ignore
            duplex: 'half'
        })
    } catch (e) {
        return new Response(String(e))
    }
}