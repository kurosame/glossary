import React from 'react'

import { Close } from '@mui/icons-material'
import { Button, IconButton, Snackbar } from '@mui/material'

import { isPermission, requestPermission } from '@/sw/fcm'

const AllowPush: React.FC = () => {
  const [open, setOpen] = React.useState(isPermission() === 'default')
  const handleRequestPermission = () => requestPermission()
  const handleClose = (): void => setOpen(false)

  return (
    <Snackbar
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      open={open}
      message="Can test push notifications"
      action={
        <>
          <Button
            color="primary"
            data-testid="allow-push-ok"
            onClick={async () => {
              await handleRequestPermission()
              handleClose()
            }}
          >
            OK
          </Button>
          <IconButton color="inherit" data-testid="allow-push-close" onClick={handleClose}>
            <Close />
          </IconButton>
        </>
      }
    />
  )
}

export default AllowPush
