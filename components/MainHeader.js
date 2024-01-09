'use client'
import React from 'react';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import logo from '../assests/blacklogo.png'
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { useRouter } from 'next/navigation';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


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
    <Grid container sx={{ zIndex:999,height: "70px", bgcolor: "white", color: "#455a64",borderBottom:"1px solid #9e9e9e", position: "sticky", top: "0px",display:"flex",alignItems:"center",justifyContent:"center" }}>
      <Grid item xs={12} sx={{}}>
        <Grid container alignItems={'center'} justifyContent={'space-between'}>
        <Grid item xs={.5}></Grid>
            <Grid item xs={2} >
               <Box sx={{height:"70px",width:"120px",position:"relative"}}>
                  <Image src={logo} alt='logo'  style={{position:"absolute",height:"100%",width:"100%"}}/>
               </Box>
            </Grid>
            <Grid item xs={4}>
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
            <Grid item xs={3} sx={{display:"flex",justifyContent:"right",alignItems:"center"}}>
                 <Button variant='contained' sx={{display:"flex",mr:"15px",bgcolor:"#ef5350",'&:hover':{bgcolor:"#ef5350"},fontSize:"12px",alignItems:"center",justifyContent:"center",p:"5px 5px 5px 5px"}} onClick={loginHandler}>
                    <Person2OutlinedIcon sx={{fontSize:"18px"}}/>Login
                 </Button>
                 <Button variant='contained' sx={{display:"flex",bgcolor:"#4caf50",'&:hover':{bgcolor:"#4caf50"},fontSize:"12px",alignItems:"center",justifyContent:"center",p:"5px 5px 5px 5px"}} onClick={signupHandler}>
                    <Person2OutlinedIcon sx={{fontSize:"18px"}}/>SignUp
                 </Button>
            </Grid>

            
                  
                    <Grid item xs={1.5} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", height: "100%" }}>
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