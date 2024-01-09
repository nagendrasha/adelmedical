import { Alert, Snackbar } from '@mui/material'
import React from 'react'

const SnackBarCustom = ({customSnack, setCustomSnack}) => {



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setCustomSnack({...customSnack,open:false});
      };
    
  return (
    
          <Snackbar open={customSnack.open} anchorOrigin={{ vertical:'bottom', horizontal: 'left' }} autoHideDuration={2000} onClose={handleClose}>
             <Alert onClose={handleClose} severity="success"  sx={{ width: '100%'}}>
               {customSnack.message}
              </Alert>
          </Snackbar>
    
  )
}

export default SnackBarCustom