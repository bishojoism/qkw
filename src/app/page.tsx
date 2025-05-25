'use client'

import { AppBar, Container, IconButton, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { GitHub } from "@mui/icons-material"
import { useState } from "react";

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
          <input type="file" onChange={event => fetch('/api', { method: 'POST', body: event.target.files![0] }).then(res => res.text()).then(text => setText(text))}></input>
          <TextField label="代号" value={text} onChange={event => setText(event.target.value)} />
          <object data={`/api?text=${text}`} />
        </Stack>
      </Container>
    </>
  )
}
