'use client'
import React from 'react';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import logo from '../assests/logo1.png'
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { useRouter } from 'next/navigation';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Router } from 'next/router';


const MainHeader = () => {
  const route=useRouter()

  const signupHandler =()=>{
      route.push('/signup')
  }
  const loginHandler =()=>{
    route.push('/login')

  }

  const handleNavigateProfile = () => route.push('/profile');
  const handleNavigate = () => route.push('/admin/admindashboard');

  return (
    <Grid container sx={{ zIndex:999,height:{lg:"70px",md:"70px",sm:"65px",xs:"60px"}, bgcolor: "white", color: "#455a64",borderBottom:"1px solid #9e9e9e", position: "sticky", top: "0px",display:"flex",alignItems:"center",justifyContent:"center" }}>
      <Grid item xs={12} sx={{height:"100%"}}>
        <Grid container alignItems={'center'} justifyContent={'space-between'} sx={{height:"100%"}}>
        <Grid item xs={.5} sx={{display:{lg:"block",md:"block",sm:"none",xs:"none"},height:"100%"}}></Grid>
            <Grid item xs={3} sm={4} md={2} lg={2} sx={{display:"flex",height:"100%",alignItems:"center",justifyContent:{xs:"center",sm:"center",md:"left",lg:"left"}}} onClick={()=>{route.push('/')}}>
               <Box sx={{height:{lg:"60px",md:"60px",sm:"50px",xs:"40px"},width:{lg:"100px",md:"100px",sm:"80px",xs:"60px"},position:"relative"}}>
                  <Image src={logo} alt='logo'  style={{position:"",height:"100%",width:"100%"}}/>
               </Box>
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={4} sx={{display:{lg:"block",md:"block",sm:"none",xs:"none"}}}>
             <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <Typography sx={{fontSize:"14px",fontWeight:"600",cursor:"pointer",'&:hover':{color:"#ef5350"}}} onClick={()=>{route.push('/')}}>
                    Home
                </Typography>
                <Typography sx={{fontSize:"14px",fontWeight:"600",cursor:"pointer",'&:hover':{color:"#ef5350"}}}>
                    Products
                </Typography>
                <Typography sx={{fontSize:"14px",fontWeight:"600",cursor:"pointer",'&:hover':{color:"#ef5350"}}}>
                    NearBy
                </Typography>
                <Typography sx={{fontSize:"14px",fontWeight:"600",cursor:"pointer",'&:hover':{color:"#ef5350"}}}>
                    Support
                </Typography>
                <Typography sx={{fontSize:"14px",fontWeight:"600",cursor:"pointer",'&:hover':{color:"#ef5350"}}}>
                    About Us
                </Typography>
             </Box>
            </Grid>
            <Grid item xs={8} sm={8} md={3} lg={3} sx={{display:"flex",justifyContent:"right",alignItems:"center"}}>
                 <Button variant='contained' sx={{display:"flex",mr:"15px",bgcolor:"#ef5350",'&:hover':{bgcolor:"#ef5350"},fontSize:"12px",alignItems:"center",justifyContent:"center",p:"5px 5px 5px 5px"}} onClick={loginHandler}>
                    <Person2OutlinedIcon sx={{fontSize:"18px"}}/>Login
                 </Button>
                 <Button variant='contained' sx={{display:"flex",bgcolor:"#4caf50",'&:hover':{bgcolor:"#4caf50"},mr:"10px",fontSize:"12px",alignItems:"center",justifyContent:"center",p:"5px 5px 5px 5px"}} onClick={signupHandler}>
                    <Person2OutlinedIcon sx={{fontSize:"18px"}}/>SignUp
                 </Button>
            </Grid>
                    <Grid item xs={1.5} sx={{ display:{lg:"flex",md:"flex",sm:"none",xs:"none"}, justifyContent: "flex-end", alignItems: "center", height: "100%" }}>
                        <Typography sx={{  cursor: "pointer", userSelect: "none", mr: "15px" }} onClick={handleNavigate}>Services</Typography>
                        <IconButton sx={{ mr: "15px", p: "0px" }} onClick={handleNavigateProfile}>
                            <AccountCircleIcon sx={{fontSize: "40px" }} />
                        </IconButton>
                    </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainHeader;