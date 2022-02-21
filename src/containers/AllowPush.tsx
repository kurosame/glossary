import React from 'react'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'

import { isPermission, requestPermission } from '@/sw/fcm'

const AllowPush: React.VFC = () => {
  const [open, setOpen] = React.useState(isPermission() === 'default')
  const handleRequestPermission = () => requestPermission()
  const handleClose = (): void => setOpen(false)

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      message="Can test push notifications"
      action={
        <>
          <Button
            color="primary"
            data-testid="allow-push-ok"
            onClick={(): void => {
              handleRequestPermission()
              handleClose()
            }}
          >
            OK
          </Button>
          <IconButton color="inherit" data-testid="allow-push-close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </>
      }
    />
  )
}

export default AllowPush
