'use client'
import { Box, Button, Grid, InputBase, Modal, Paper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';




const ChangePassword = ({ passOpen, setPassOpen }) => {
    const [password, setPassword] = useState({
        currPassword: "",
        newPassword: "",
        confPassword: "",
        first:false,
        second:false,
        third:false
    })


    const handleClose = () => {
        setPassOpen(false)
    };

    const handleCollect = (e) => {
        const { name, value } = e.target;
        setPassword({ ...password, [name]: value });
    }

    const handleSubmit = async () => {
        const uid = await JSON.parse(localStorage.getItem('UID'))

        try {
            if (password.confPassword != '' && password.currPassword != '' && password.newPassword != '' && (password.newPassword == password.confPassword)) {
                const respData = await axios.patch(`/api/changepassword/${uid}`, { currPassword: password.currPassword, newPassword: password.newPassword })
                console.log("response data", respData)
                if(respData.data.message == "Password Changed Successfully"){
                    alert(respData.data.message)
                    setPassOpen(false)
                }
                if(respData.data.message == "Incorrect Password"){
                    alert(respData.data.message)
                }
                setPassword({currPassword: "",newPassword: "",confPassword: ""})
            }
            else {
               alert('Please Check The Entered Data!')
            }
        }
        catch (err) {
            console.log(err);
            alert(err.message)
        }

    }
    const handleHideShow =(item)=>{
                setPassword({...password,[item]:!password[item]})
    }
    // console.log(password)

  


    return (
        <>
            <Modal open={passOpen} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, bgcolor: 'white', p: 4, bgcolor: "white" }}>
                    <Box>
                        <Typography align='center' sx={{ fontSize: "17px", fontWeight: "800" }}>Change Password</Typography>
                    </Box>
                    <Box sx={{ marginTop: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box sx={{ mt: 1 }}>
                        <Grid container spacing={2} sx={{mr:"10px"}}>
                                <Grid item xs={12} sx={{display:"flex",alignItems:"center"}}>
                                    <InputBase type={password.first  ? 'text' : 'password'} name="currPassword" required fullWidth label="Current Password" value={password.currPassword} onChange={handleCollect} sx={{border:"1px solid #bdbdbd",pl:"10px",borderRight:"none",height:'45px',borderRadius:"10px 0px 0px 10px"}}/>
                                    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",border:"1px solid #bdbdbd",borderLeft:"none",height:"43.4px",borderRadius:"0px 10px 10px 0px",pr:"10px"}}>
                                        {
                                            !password.first ?
                                            <VisibilityIcon  sx={{cursor:"pointer"}} onClick={()=>{handleHideShow('first')}}/>
                                             :
                                            <VisibilityOffIcon  sx={{cursor:"pointer"}} onClick={()=>{handleHideShow('first')}}/>
                                        }
                                    </Box>
                                </Grid>

                                <Grid item xs={12} sx={{display:"flex",alignItems:"center"}}>
                                    <InputBase type={password.second ? 'text' : 'password'} required fullWidth label="New Password" name="newPassword" value={password.newPassword} onChange={handleCollect} sx={{border:"1px solid #bdbdbd",pl:"10px",borderRight:"none",height:'45px',borderRadius:"10px 0px 0px 10px"}}/>
                                    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",border:"1px solid #bdbdbd",borderLeft:"none",height:"43px",borderRadius:"0px 10px 10px 0px",pr:"10px"}}>
                                        {
                                            !password.second ?
                                            <VisibilityIcon  sx={{cursor:"pointer"}} onClick={()=>{handleHideShow('second')}}/>
                                             :
                                            <VisibilityOffIcon  sx={{cursor:"pointer"}} onClick={()=>{handleHideShow('second')}}/>
                                        }
                                    </Box>
                                </Grid>

                                 <Grid item xs={12} sx={{display:"flex",alignItems:"center"}}>
                                    <InputBase type={password.third  ? 'text' : 'password'} required fullWidth  label="Confirm Password" name="confPassword" value={password.confPassword} onChange={handleCollect} sx={{border:"1px solid #bdbdbd",pl:"10px",borderRight:"none",height:'45px',borderRadius:"10px 0px 0px 10px"}}/>
                                    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",border:"1px solid #bdbdbd",borderLeft:"none",height:"43px",borderRadius:"0px 10px 10px 0px",pr:"10px"}}>
                                        {
                                            !password.third ?
                                            <VisibilityIcon  sx={{cursor:"pointer"}} onClick={()=>{handleHideShow('third')}}/>
                                             :
                                            <VisibilityOffIcon  sx={{cursor:"pointer"}} onClick={()=>{handleHideShow('third')}}/>
                                        }
                                    </Box>
                                </Grid>

                                

                               


                            </Grid>
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Box>
                    </Box>

                </Paper>


            </Modal>
        </>
    )
}

export default ChangePassword

