async function proxy(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const targetUrl = searchParams.get('url');
        if (!targetUrl) return new Response("Missing 'url' parameter", { status: 400 });
        const port = searchParams.get('port')
        if (!port) return new Response("Missing 'port' parameter", { status: 400 })

        const forwardedHeaders = new Headers(req.headers);
        forwardedHeaders.delete('host');

        const res = await fetch(targetUrl, {
            method: req.method,
            headers: forwardedHeaders,
            body: req.body,
            // @ts-expect-error only in Node.js
            duplex: 'half'
        });

        const newHeaders = new Headers(res.headers);
        newHeaders.set('Access-Control-Allow-Origin', `http://localhost:${port}`);

        return new Response(res.body, {
            status: res.status,
            statusText: res.statusText,
            headers: newHeaders
        });
    } catch (e) {
        return new Response(String(e), { status: 500 });
    }
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
export const HEAD = proxy;
