import { Alert, Snackbar } from '@mui/material'
import React from 'react'

const SnackBarCustomError = ({errorSnack, setErrorSnack}) => {



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setErrorSnack({...errorSnack,open:false});
      };
    
  return (
    
          <Snackbar open={errorSnack.open} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={2000} onClose={handleClose}>
             <Alert onClose={handleClose} severity="error" >
               {errorSnack.message}
              </Alert>
          </Snackbar>
    
  )
}

export default SnackBarCustomError