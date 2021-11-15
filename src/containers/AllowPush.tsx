import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { requestPermission, isPermission } from '@/utils/messaging'

const AllowPush: React.FC = () => {
  const [open, setOpen] = React.useState(isPermission() === 'default')
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
