import {Box, Grid, IconButton, InputBase, OutlinedInput, TextField, Typography} from '@mui/material'
import React from 'react'
import FoodBankOutlinedIcon from '@mui/icons-material/FoodBankOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import dummy from '../assests/av1.webp'
import Image from 'next/image';
import GridViewIcon from '@mui/icons-material/GridView';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import SearchIcon from '@mui/icons-material/Search';



const Header = () => {
  return (
    <Grid container>
       <Grid item xs={12} sx={{p:{lg:"13px 0px",md:"13px 0px",sm:"10px 0px",xs:"10px 0px"}}}>
         <Box sx={{display:"flex",justifyContent:'space-between',alignItems:"center"}}>
            <Box>
                <Typography sx={{fontSize:{lg:"30px",md:"30px",sm:"30px",xs:"20px"},fontWeight:900}}>Favorite Menu</Typography>
            </Box>
            <Box sx={{display:"flex",alignItems:"center"}}>
            <Box sx={{mr:{lg:"30px",md:"30px",sm:"20px",xs:"10px"}}}>
              <IconButton>
                  <FoodBankOutlinedIcon sx={{color:"black",fontSize:{xs:"20px",sm:"30px",md:"30px",lg:"30px"}}}/>
               </IconButton>

               <IconButton>
                  <NotificationsNoneOutlinedIcon sx={{color:"black",fontSize:{xs:"20px",sm:"30px",md:"30px",lg:"30px"}}}/>
               </IconButton>

               <IconButton>
                  <SettingsOutlinedIcon sx={{color:"black",fontSize:{xs:"20px",sm:"30px",md:"30px",lg:"30px"}}}/>
                </IconButton>
            </Box>
              
                <Box sx={{position:"relative",height:{lg:"50px",md:"50px",sm:"50px",xs:"40px"},width:{lg:"50px",md:"50px",sm:"50px",xs:"40px"}}}>
                  <Image alt="Remy Sharp" src={dummy} style={{height:"100%",width:"100%",borderRadius:"15px"}}/>
                </Box>
            </Box>
         </Box>
       </Grid>

       <Grid container  sx={{p:{lg:"5px 0px",md:"5px 0px",sm:"5px 0px",xs:"5px 0px"}}}>
            <Grid item lg={4.5} md={5} sm={6} xs={7.5}>
             <Box sx={{display:"flex",alignItems:"center"}}>
             <IconButton sx={{height:{lg:"50px",md:"50px",sm:"50px",xs:"40px"},width:"50px",borderRadius:"10px 0px 0px 10px",bgcolor:"white","&:hover":{bgcolor:"white"}}}>
                  <SearchIcon sx={{color:"#ffb300",fontSize:"30px"}}/>
               </IconButton>
                <InputBase placeholder='What do you want to eat...'  sx={{fontSize:{lg:"15px",md:"15px",sm:"15px",xs:"12px"},fontWeight:"500",color:"gray",bgcolor:"white",height:{lg:"50px",md:"50px",sm:"50px",xs:"40px"},borderRadius:"0px 10px 10px 0px",border:"none",outline:"none",width:"100%"}}/>
             </Box>
            </Grid>
            <Grid item lg={7.5} md={7} sm={6} xs={4.5} sx={{display:"flex",justifyContent:"right",alignItems:"center"}}>
            <Box>
              <IconButton sx={{height:{lg:"50px",md:"50px",sm:"50px",xs:"40px"},width:{lg:"50px",md:"50px",sm:"50px",xs:"40px"},borderRadius:"15px",bgcolor:"white",mr:{lg:"30px",md:"30px",sm:"20px",xs:"10px"},"&:hover":{bgcolor:"white"}}}>
                  <SplitscreenIcon sx={{color:"#bdbdbd"}}/>
               </IconButton>

               <IconButton sx={{height:{lg:"50px",md:"50px",sm:"50px",xs:"40px"},width:{lg:"50px",md:"50px",sm:"50px",xs:"40px"},borderRadius:"15px",bgcolor:"#fff8e1","&:hover":{bgcolor:"#fff8e1"}}}>
                  <GridViewIcon sx={{color:"#ffb300",fontSize:"30px"}}/>
               </IconButton>

             
            </Box>
              
              
            </Grid>
        
       </Grid>
       
    </Grid>
  )
}

export default Header