'use client'
import { Box, Button, Grid, InputBase, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const router = useRouter();
    const [loginData, setLoginData] = useState({
        email:'',
        password:''
    });

    const loginDetails=(e)=>{
        const{name,value} = e.target;
        setLoginData({...loginData,[name]:value})
    }

    const registerHandler=()=>{
        router.push('/signup')
    };
    console.log(loginData)
    return (
        <>
            <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: {lg:'center', md:'center', sm:'center', xs:'flex-start'}, height: '100vh', bgcolor: '#c4c4c4' }}>
                <Grid item lg={6} md={8} sm={9.5} xs={12} sx={{ height:{ lg:'50%', md:'50%', sm:'50%', xs:'100%'}, borderRadius: { lg:'10px', md:'10px', sm:'10px', xs:'0px'} }}>
                    <Paper sx={{ height: '100%', borderRadius: '10px',}} elevation={2}>
                        <Grid container sx={{ height: {lg:'100%', md:'100%', sm:'100%', xs:'50%'}, borderRadius: { lg:'10px', md:'10px', sm:'10px', xs:'0px'}, display:'flex',justifyContent:'center', alignItems:'center',  }}>
                            <Grid item lg={6} md={6} sm={6} xs={12} sx={{ bgcolor: '#00897b', height: '100%', borderRadius:{ lg:'10px', md:'10px', sm:'10px', xs:'0px'}, p: '50px 40px',  }}>
                                <Typography sx={{ fontSize: '40px', fontWeight: '700', color: '#fff' }}>Login</Typography>
                                <Typography sx={{ fontSize: '13px', color: '#fff', mt: '14px' }}>Order any medicine or health product and we’ll  deliver it for free. Enjoy discounts on everything. <b onClick={registerHandler} style={{cursor:'pointer'}}>Sign up</b> </Typography>

                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={12} sx={{display:'flex', flexDirection:'column',alignItems:'flex-start', justifyContent:'space-between'}}>

                                <Grid container sx={{  display:'flex', justifyContent:'center', alignItems:'center', mt:{lg:'0px', md:'0px', sm:'20px', xs:'30px'}}}>
                                    <Grid item xs={10} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <Box sx={{ width: '100%', border: '1px solid lightgrey', p: '7px', borderRadius: '8px' }}>
                                        <InputBase placeholder='Email' type='email' sx={{ color: 'black', fontSize: '17px' }} size='small' onChange={loginDetails} name='email' value={loginData.email}/>
                                    </Box>
                                    </Grid>

                                    <Grid item xs={10} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <Box sx={{ width: '100%', border: '1px solid lightgrey', p: '7px', borderRadius: '8px', mt: '20px' }}>
                                        <InputBase placeholder='Password' type='password' sx={{ color: 'black', fontSize: '17px' }} size='small' onChange={loginDetails} name='password' value={loginData.password}/>
                                    </Box>
                                    </Grid>
                                </Grid>
                             

                                <Grid container sx={{  display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <Grid item xs={10} sx={{ mt:{lg:'50px', md:'45px', sm:'40px', xs:'30px'}}}>
                                    <Box sx={{width:'100%'}}>
                                        <Button variant='contained' sx={{bgcolor:'#00897b', width:'100%',fontSize:'15px','&:hover':{bgcolor:'#00897b'} }} size='large'>Login</Button>
                                    </Box>
                                    <Typography sx={{fontSize:'13px',color:'#8b8b8b', mt:'15px'}}>Forgot your password ? <b style={{color:'#00897b', fontSize:'13.5px'}}>Forgot Password</b></Typography>
                                    </Grid>
                                </Grid>


                            </Grid>
                        </Grid>

                    </Paper>


                </Grid>
            </Grid>
        </>
    )
}

export default LoginPage