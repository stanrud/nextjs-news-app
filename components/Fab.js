import * as React from 'react'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

export default function FloatingActionButtonSize() {
  return (
    <Fab color='primary' aria-label='add' href='/articles/add'>
      <AddIcon />
    </Fab>
  )
}