'use client'
import { Box, Button, Grid, InputBase, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import MainHeader from '@/components/MainHeader';

const SignUpPage = () => {
    const router = useRouter();
    const [regisetrData, setRegisterData] = useState({
        userName:'',
        email:'',
        password:'',
       confirmPassword:'' 
    });
    const registerHandler=(e)=>{
        const{name,value} = e.target;
        setRegisterData({...regisetrData,[name]:value})
    }

    const loginHandler=()=>{
        router.push('/login')
    };
    console.log(regisetrData)
    return (
        <>
         <MainHeader/>
            <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: { lg: 'center', md: 'center', sm: 'center', xs: 'flex-start' }, height: '100vh', bgcolor: '#c4c4c4' }}>
                <Grid item lg={7} md={8} sm={9.5} xs={12} sx={{ height: { lg: '60%', md: '60%', sm: '60%', xs: '100%' }, borderRadius: { lg: '10px', md: '10px', sm: '10px', xs: '0px' } }}>
                    <Paper sx={{ height: '100%', borderRadius: { lg: '10px', md: '10px', sm: '10px', xs: '0px' }, }} elevation={2}>
                        <Grid container sx={{ height: { lg: '100%', md: '100%', sm: '100%', xs: '50%' }, borderRadius: { lg: '10px', md: '10px', sm: '10px', xs: '0px' }, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>

                            <Grid item lg={6} md={6} sm={6} xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }}>

                                <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: { lg: '10px', md: '10px', sm: '18px', xs: '18px' } }}>
                                    <Grid item xs={10} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Box sx={{ width: '100%', border: '1px solid lightgrey', p: '7px', borderRadius: '8px' }}>
                                            <InputBase placeholder='Username' sx={{ color: 'black', fontSize: '17px' }} size='small' onChange={registerHandler} name='userName' value={regisetrData.userName}/>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={10} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Box sx={{ width: '100%', border: '1px solid lightgrey', p: '7px', borderRadius: '8px', mt: '10px' }}>
                                            <InputBase placeholder='Email' type='email' sx={{ color: 'black', fontSize: '17px' }} size='small' onChange={registerHandler} name='email' value={regisetrData.email}/>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={10} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Box sx={{ width: '100%', border: '1px solid lightgrey', p: '7px', borderRadius: '8px', mt: '10px' }}>
                                            <InputBase placeholder='Password' type='password' sx={{ color: 'black', fontSize: '17px' }} size='small' onChange={registerHandler} name='password' value={regisetrData.password}/>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={10} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Box sx={{ width: '100%', border: '1px solid lightgrey', p: '7px', borderRadius: '8px', mt: '10px' }}>
                                            <InputBase placeholder='Confirm Password'type='password' sx={{ color: 'black', fontSize: '17px' }}size='small'  onChange={registerHandler} name='confirmPassword' value={regisetrData.confirmPassword}/>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={10} sx={{ mt:{lg:'50px', md:'50px', sm:'40px', xs:'40px'}, pb:{lg:'0px', md:'0px', sm:'20px', xs:'20px'}}}>
                                    <Box sx={{width:'100%',}}>
                                        <Button variant='contained' sx={{bgcolor:'#00897b', width:'100%',fontSize:'15px','&:hover':{bgcolor:'#00897b'} }} size='large'>Sign Up</Button>
                                    </Box>
                                    
                                    </Grid>
                                </Grid>

                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={12} sx={{ bgcolor: '#00897b', height: '100%', borderRadius: { lg: '10px', md: '10px', sm: '10px', xs: '0px' }, p: '50px 40px', }}>
                                <Typography sx={{ fontSize: '40px', fontWeight: '700', color: '#fff' }}>Sign Up</Typography>
                                <Typography sx={{ fontSize: '13px', color: '#fff', mt: '14px' }}>Get medicine information, order medicines, book lab tests and consult doctors online from the comfort of your home. </Typography>
                                <Typography sx={{ fontSize: '13px', color: '#fff', mt: '14px' }}>Already have an account ? <b onClick={loginHandler} style={{cursor:'pointer'}}>Login</b> </Typography>

                            </Grid>
                        </Grid>

                    </Paper>


                </Grid>
            </Grid>
        </>
    )
}

export default SignUpPage
