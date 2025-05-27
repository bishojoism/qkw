'use client'

import { AppBar, Button, ButtonGroup, Container, IconButton, Link, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { GitHub } from "@mui/icons-material"
import { useState } from "react";
import { decode256to64, encode64to256 } from "./base";
import { saveAs } from "file-saver";

export default function Home() {
  const [text, setText] = useState('')
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
            如何制作乾坤文：将文件上传至<Link href="https://catbox.moe">Catbox</Link>，将生成的链接复制粘贴至本页面下方的文本框内，点击“制作乾坤文”按钮。
          </Typography>
          <Typography>
            如何使用乾坤文：将乾坤文复制粘贴至本页面下方的文本框内，点击“使用乾坤文”按钮。
          </Typography>
          <ButtonGroup disabled={!text}>
            <Button onClick={() => {
              setText(encode64to256(text.substring(25)))
            }}>
              制作乾坤文
            </Button>
            <Button onClick={() => {
              const filename = decode256to64(text)
              saveAs(`/api?url=${encodeURIComponent(`https://files.catbox.moe/${filename}`)}`, filename)
            }}>
              使用乾坤文
            </Button>
          </ButtonGroup>
          <TextField autoFocus value={text} onChange={event => setText(event.target.value)} />
        </Stack>
      </Container>
    </>
  )
}
