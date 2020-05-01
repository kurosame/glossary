import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { requestPermission } from '@/utils/messaging'

const AllowPush: React.FC = () => {
  const [open, setOpen] = React.useState(Notification.permission === 'default')
  const handleRequestPermission = (): void => requestPermission()
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
            onClick={(): void => {
              handleRequestPermission()
              handleClose()
            }}
          >
            OK
          </Button>
          <IconButton color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </>
      }
    />
  )
}

export default AllowPush
