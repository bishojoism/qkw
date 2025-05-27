'use client'

import { AppBar, Backdrop, Box, Button, ButtonGroup, CircularProgress, Container, IconButton, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { GitHub } from "@mui/icons-material"
import { useState } from "react";
import { MuiFileInput } from "mui-file-input";
import { decode256to64, encode64to256 } from "./base";
import { saveAs } from "file-saver";

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState('')
  const upload = async (proxy: boolean) => {
    if (!file) return
    setLoading(true)
    try {
      const body = new FormData()
      body.append('reqtype', 'fileupload')
      body.append('fileToUpload', file)
      const url = 'https://catbox.moe/user/api.php'
      const res = await fetch(proxy ? `/api?url=${encodeURIComponent(url)}` : url, { method: 'POST', body })
      const text = await res.text()
      if (!res.ok) throw text
      setText(encode64to256(text.substring(25)))
    } catch (e) {
      alert(e)
    }
    setLoading(false)
  }
  const download = async (proxy: boolean) => {
    const filename = decode256to64(text)
    const url = `https://files.catbox.moe/${filename}`
    saveAs(proxy ? `/api?url=${encodeURIComponent(url)}` : url, filename)
  }
  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
          <Box display="flex" alignItems="center">
            <MuiFileInput
              label="选择或拖拽文件"
              value={file}
              onChange={setFile}
              sx={{ width: 256 }}
            />
            <ButtonGroup disabled={!file}>
              <Button onClick={() => upload(true)}>
                免魔法上传
              </Button>
              <Button onClick={() => upload(false)}>
                原接口上传
              </Button>
            </ButtonGroup>
          </Box>
          <Box display="flex" alignItems="center">
            <TextField
              label="乾坤文"
              value={text}
              onChange={event => setText(event.target.value)}
              sx={{ width: 256 }}
            />
            <ButtonGroup disabled={!text}>
              <Button onClick={() => download(true)}>
                免魔法下载
              </Button>
              <Button onClick={() => download(false)}>
                原接口下载
              </Button>
            </ButtonGroup>
          </Box>
        </Stack>
      </Container>
    </>
  )
}
