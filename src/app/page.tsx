'use client'

import { AppBar, Container, IconButton, Link, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { GitHub } from "@mui/icons-material"
import { useEffect, useMemo, useState } from "react";
import { decode256to64, encode64to256 } from "./base";

export default function Home() {
  const [url, setUrl] = useState('')
  const [text, setText] = useState('')
  useEffect(() => {
    setText(encode64to256(url.substring(25)))
  }, [url])
  const filename = useMemo(() => decode256to64(text), [text])
  const link1 = useMemo(() => `https://api.codetabs.com/v1/proxy?quest=https://files.catbox.moe/${filename}`, [filename])
  const link2 = useMemo(() => `https://cdn.cdnjson.com/pic.html?url=https://files.catbox.moe/${filename}`, [filename])
  const link3 = useMemo(() => `https://i0.wp.com/files.catbox.moe/${filename}`, [filename])
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            乾坤文 1.0
          </Typography>
          <IconButton href="https://github.com/bishojoism/qkw" color="inherit" size="large" edge="end">
            <GitHub />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container sx={{ paddingY: 3 }}>
        <Stack spacing={2}>
          <Typography>
            如何使用乾坤文（无需魔法）：将乾坤文复制粘贴至“乾坤文”文本框内，链接将自动显示于“乾坤文”文本框下方。
          </Typography>
          <Typography>
            如何制作乾坤文（需要魔法）：将文件上传至<Link href="https://catbox.moe">Catbox</Link>，将生成的链接复制粘贴至“Catbox链接”文本框内，乾坤文将自动显示于“乾坤文”文本框内。
          </Typography>
          <TextField label="Catbox链接" value={url} onChange={event => setUrl(event.target.value)} />
          <TextField label="乾坤文" value={text} onChange={event => setText(event.target.value)} />
          <Typography>
            链接1（所有格式都支持，但是慢）：<Link href={link1}>{link1}</Link>
          </Typography>
          <Typography>
            链接2（只支持图片格式，但是快）：<Link href={link2}>{link2}</Link>
          </Typography>
          <Typography>
            链接3（只支持图片格式，但是快）：<Link href={link3}>{link3}</Link>
          </Typography>
        </Stack>
      </Container>
    </>
  )
}
