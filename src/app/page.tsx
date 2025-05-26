'use client'

import { AppBar, Backdrop, Box, CircularProgress, Container, IconButton, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { Download, GitHub, Upload } from "@mui/icons-material"
import { useState } from "react";
import { MuiFileInput } from "mui-file-input";
import { decode256to64, encode64to256 } from "./base";
import { saveAs } from "file-saver";

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState('')
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
              label="选择文件"
              value={file}
              onChange={setFile}
              sx={{ width: 'calc(100% - 40px)' }}
            />
            {file &&
              <IconButton onClick={async () => {
                setLoading(true)
                try {
                  const body = new FormData()
                  body.append('reqtype', 'fileupload')
                  body.append('fileToUpload', file)
                  setText(encode64to256((await (await fetch(`/api?url=${encodeURIComponent('https://catbox.moe/user/api.php')}`, { method: 'POST', body })).text()).substring(25)))
                } catch (e) {
                  alert(e)
                }
                setLoading(false)
              }}>
                <Upload />
              </IconButton>
            }
          </Box>
          <Box display="flex" alignItems="center">
            <TextField
              label="乾坤文"
              value={text}
              onChange={event => setText(event.target.value)}
              sx={{ width: 'calc(100% - 40px)' }}
            />
            {text &&
              <IconButton onClick={() => {
                const filename = decode256to64(text)
                saveAs(`/api?url=${encodeURIComponent(`https://files.catbox.moe/${filename}`)}`, filename)
              }}>
                <Download />
              </IconButton>
            }
          </Box>
        </Stack>
      </Container>
    </>
  )
}
