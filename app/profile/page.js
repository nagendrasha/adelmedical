'use client'
import Header from '@/components/Header'
// import { Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import user from '../../assests/profile.avif'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';
import { CircularProgress, IconButton, Paper, Skeleton } from '@mui/material';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import ChangePassword from '@/components/ChangePassword';
import EditProfile from '@/components/EditProfile';
import SnackBarCustom from '@/components/SnackBarCustom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';




const Profile = () => {
    const router = useRouter()
    const [userData, setUserData] = useState([]);
    const [passOpen, setPassOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [customSnack , setCustomSnack] = useState({
        open:false,
        message:""
    })
    const [loader , setLoader] = useState(true)


    const fetchUserDetails = async () => {
        
        const uid = await JSON.parse(localStorage.getItem('UID'))
        try {
            const res = await axios.get(`/api/profile/${uid}`)
            // console.log(res);
            setUserData(...res.data.resp)
            setLoader(false)


        } catch (err) {
            console.log(err)
            alert(err.message)
        }
    };
    useEffect(() => {
        fetchUserDetails();
    }, []);
    // console.log(userData);

    const passwordHandler = () => {
        setPassOpen(true)
    };
    const editProfile = () => {
        setOpenEdit(true)
    }

    const handleNavigateProfile = () => router.push('/profile');

    const handleNavigate = () => router.push('/admin/admindashboard');



    return (
        <>
            <Container disableGutters maxWidth='xl'>
                {/* <Header /> */}
                <Grid container justifyContent={"space-between"} alignItems={"center"} sx={{ height: "70px", bgcolor: "#37474f" }}>
                    <Grid item xs={4}>
                        <Typography sx={{ color: "white", fontSize: "20px", fontWeight: "600", cursor: "pointer", userSelect: "none" }}>AdelSocialFood</Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", height: "100%" }}>
                        <Typography sx={{ color: "white", cursor: "pointer", userSelect: "none", mr: "15px" }} onClick={handleNavigate}>Services</Typography>
                        <IconButton sx={{ mr: "15px", p: "0px" }} onClick={handleNavigateProfile}>
                            <AccountCircleIcon sx={{ color: "white", fontSize: "40px" }} />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid container component={'box'} sx={{ justifyContent: 'center', alignItems: 'center', mt: '70px' }}>
                    <Grid component={'box'} item lg={4.5} md={6} sm={10} xs={11} sx={{ mt: '30px' }}>
                             {
                                loader ? 
                                <Grid container >
                                            <Grid item xs={12} sx={{ m: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <Skeleton variant="circular" width={100} height={100} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Skeleton variant="rectangular" sx={{ width: '20%', height: '25px' }} />
                                                <Skeleton variant="rectangular" sx={{ width: '100%', height: '35px', mt: '10px', borderRadius: '7px' }} />
                                            </Grid>

                                            <Grid item xs={12} sx={{ mt: '19px' }}>
                                                <Skeleton variant="rectangular" sx={{ width: '20%', height: '25px' }} />
                                                <Skeleton variant="rectangular" sx={{ width: '100%', height: '35px', mt: '10px', borderRadius: '7px' }} />
                                            </Grid>

                                            <Grid item xs={12} sx={{ mt: '19px' }}>
                                                <Skeleton variant="rectangular" sx={{ width: '20%', height: '25px' }} />
                                                <Skeleton variant="rectangular" sx={{ width: '100%', height: '35px', mt: '10px', borderRadius: '7px' }} />
                                            </Grid>

                                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', mt: '10px' }}>
                                                <Skeleton variant="rectangular" sx={{ width: '20%', height: '35px', borderRadius: '7px' }} />
                                                <Skeleton variant="rectangular" sx={{ width: '20%', height: '35px', mt: '10px', borderRadius: '7px' }} />
                                            </Grid>
                                        </Grid>
                               :
                             <Paper elevation={3} sx={{ p: '10px' }}>
                            <Grid container >

                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: '100px', height: '100px' }}>
                                        <Box sx={{ width: '100px', height: '100px' }}>

                                            <Image src={user} alt='img' style={{ width: '100px', height: '100px' }} />
                                        </Box>
                                    </Avatar>
                                </Grid>
                                <Typography sx={{fontSize:'15px', fontWeight:'bold', ml:'5px'}}>Name</Typography>
                                <Grid item xs={12} sx={{ border: '1px solid grey', borderRadius: '10px', p: '10px' }} >
                                    <Typography sx={{ fontSize: "15px", color: 'grey' }}>{userData.fullName}</Typography>

                                </Grid>
                                <Typography sx={{fontSize:'15px', fontWeight:'bold',mt: '10px', ml:'5px'}}>Email</Typography>
                                <Grid item xs={12} sx={{ border: '1px solid grey', borderRadius: '10px', p: '10px',  }} >
                                    <Typography sx={{ fontSize: "15px", color: 'grey' }}>{userData.email}</Typography>

                                </Grid>
                                <Typography sx={{fontSize:'15px', fontWeight:'bold',mt: '10px', ml:'5px'}}>Mobile</Typography>
                                <Grid item xs={12} sx={{ border: '1px solid grey', borderRadius: '10px', p: '10px',  }} >
                                    <Typography sx={{ fontSize: "15px", color: 'grey' }}>{userData.mobile}</Typography>
                                </Grid>

                                

                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: {lg:'space-evenly', md:'space-evenly', sm:'space-evenly', xs:'space-between'}, alignItems: 'center', p: '15px 0px' }}>
                                    <Button variant='contained' sx={{ fontSize: {lg:'13px', md:'12px', sm:'11px', xs:'11px'}, bgcolor: 'black', color: 'white', '&:hover': { bgcolor: 'black', color: 'white' } }} onClick={passwordHandler}>Change password</Button>
                                    <Button variant='contained' sx={{ fontSize:  {lg:'13px', md:'12px', sm:'11px', xs:'11px'}, bgcolor: 'black', color: 'white', '&:hover': { bgcolor: 'black', color: 'white' } }} onClick={editProfile}>edit profile</Button>
                                </Grid>

                            </Grid>
                              </Paper>
                             }

                    </Grid>
                </Grid>


            </Container>
            <SnackBarCustom customSnack={customSnack}  setCustomSnack={setCustomSnack}/>
            <ChangePassword passOpen={passOpen} setPassOpen={setPassOpen}/>
            <EditProfile openEdit={openEdit} setOpenEdit={setOpenEdit} userData={userData} fetchUserDetails={fetchUserDetails} customSnack={customSnack}  setCustomSnack={setCustomSnack}/>

        </>
    )
}

export default Profile