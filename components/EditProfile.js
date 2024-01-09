'use client'
import { Box, Button, CircularProgress, Grid, Icon, Modal, Paper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import profile from '../assests/profile.avif';
import { useEffect, useState } from 'react';
import axios from 'axios';





const EditProfile = ({ openEdit, setOpenEdit,userData,fetchUserDetails,customSnack,setCustomSnack}) => {

    const [inputData , setInputData] = useState({
        fullName:"",
        mobile:"",
        email:""
    })
    const [loader , setLoader] = useState({loading:false,isDisabled:true})
 
    const handleClose = () => {
        setOpenEdit(false)
    };

    const handleCollect = (e) =>{
        const {name , value} = e.target
       console.log(value)
        setInputData({...inputData,[name]:value})

        if(value != userData[name]){
            setLoader({...loader,isDisabled:false})
        }
        else{
            setLoader({...loader,isDisabled:true})

        }
    }

    useEffect(()=>{
      setInputData({...inputData,fullName:userData.fullName,mobile:userData.mobile,email:userData.email})
    },[userData])
    

    const handleSubmit = async () => {
        setLoader({...loader,loading:true})
        const uid = await JSON.parse(localStorage.getItem('UID'))

        try {
            if (inputData.fullName != '' && inputData.mobile != '' && inputData.email != '') {
                const respData = await axios.patch(`/api/editprofile/${uid}`, { fullName: inputData.fullName, mobile: inputData.mobile,email:inputData.email })
                console.log("response data", respData)
                if(respData.data.message == "Profile Updated Successfully"){
                    setCustomSnack({...customSnack,open:true,message:respData.data.message})
                    fetchUserDetails();
                    setOpenEdit(false)
                    setLoader({...loader,isDisabled:true,loading:false})
                   
                }
                if(respData.data.message == "Failed To Update Profile"){
                    alert(respData.data.message)
                    setLoader({...loader,isDisabled:true,loading:false})
                    

                }
               
            }
            else {
               alert('Please Fill The Data Properly')
            }
        }
        catch (err) {
            console.log(err);
            alert(err.message)
        }

    }


    return (
        <>
            <Modal open={openEdit} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, bgcolor: 'white', p: 4, bgcolor: "white"}}>
            <Box sx={{marginTop: 1,display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
                <Box sx={{mt:"30px",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
                 <Box sx={{ position: "relative", height: "100px", width: "100px", borderRadius: "100%", overflow: "hidden" }}>
                    <Image src={profile} style={{ position: "absolute", height: "100%", width: "100%" }} />
                </Box>
                <Button variant='contained' sx={{fontSize:"12px",mt:"15px"}}>Change Photo</Button>
              </Box>
                <Typography component="h1" variant="h5" sx={{ mt: "20px" }}>
                    User Profile
                </Typography>
                <Box  sx={{ mt: 3 }}>
                {/* this grid conatiner giving error on build time  */}
                    <Grid container spacing={2} >
                        <Grid item xs={12} >
                            <TextField  name="fullName" required fullWidth  label="Full Name"  value={inputData.fullName} onChange={handleCollect}/>
                        </Grid>
                       
                        <Grid item xs={12}>
                            <TextField required fullWidth   label="Email Address" name="email"  value={inputData.email} onChange={handleCollect}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField required fullWidth  label="Mobile" name="mobile"  value={inputData.mobile} onChange={handleCollect}/>
                        </Grid>
                       

                    </Grid>
                    {
                        !loader.loading ? <Button type="submit" disabled={loader.isDisabled} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>
                             Submit
                           </Button>
                       :
                       <Box sx={{display:"flex",justifyContent:"center",mt:"20px"}}>
                          
                             <CircularProgress color="inherit"  size="1.5rem"/>
                          
                       </Box>
                   
                    }
                   
                </Box>
            </Box>
  
                </Paper>


            </Modal>
        </>
    )
}

export default EditProfile

