'use client'

import { AppBar, Container, IconButton, Link, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { GitHub } from "@mui/icons-material"
import { useEffect, useMemo, useState } from "react";
import { decode256to64, encode64to256 } from "./base";

const suffixes = [
  '.jpg', '.jpeg', '.jfif',
  '.png',
  '.bmp',
  '.gif',
  '.tif', '.tiff',
  '.webp',
  '.pdf',
  '.svg'
]

export default function Home() {
  const [url, setUrl] = useState('')
  const [text, setText] = useState('')
  useEffect(() => {
    setText(encode64to256(url.substring(25)))
  }, [url])
  const filename = useMemo(() => decode256to64(text), [text])
  const thisLink = useMemo(() => typeof location === 'undefined' ? '' : `${location.href}${filename}`, [filename])
  const thatLink = useMemo(() => suffixes.some(value => filename.endsWith(value)) && `https://files.catbox.moe/${filename}`, [filename])
  const thatLink1 = useMemo(() => `https://wsrv.nl/?url=${thatLink}`, [thatLink])
  const thatLink2 = useMemo(() => `https://cdn.cdnjson.com/pic.html?url=${thatLink}`, [thatLink])
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
            如何使用乾坤文（无需魔法）：将乾坤文复制粘贴至“乾坤文”文本框内，普通下载链接将自动显示于“本站链接”后面，如果是主流图片格式（JPEG、PNG、BMP、GIF、TIFF、WebP、PDF、SVG），高速下载链接将自动显示于“别站链接（推荐）”后面。
          </Typography>
          <Typography>
            如何制作乾坤文（需要魔法）：将文件上传至<Link href="https://catbox.moe">Catbox</Link>，将生成的链接复制粘贴至“Catbox链接”文本框内，乾坤文将自动显示于“乾坤文”文本框内。建议先点击别站链接让其进行缓存，加速用户的查看。
          </Typography>
          <TextField label="Catbox链接" value={url} onChange={event => setUrl(event.target.value)} />
          <TextField label="乾坤文" value={text} onChange={event => setText(event.target.value)} />
          <Typography>
            本站链接：<Link href={thisLink}>{thisLink}</Link>
          </Typography>
          {thatLink &&
            <>
              <Typography>
                别站链接1（推荐）：<Link href={thatLink1}>{thatLink1}</Link>
              </Typography>
              <Typography>
                别站链接2（推荐）：<Link href={thatLink2}>{thatLink2}</Link>
              </Typography>
            </>
          }
        </Stack>
      </Container>
    </>
  )
}
