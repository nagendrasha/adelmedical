import React from 'react';
import { Grid, Paper, Box, Typography, Icon, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import shop1 from '../assests/maincard.webp'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
// import StarIcon from '@mui/icons-material/Star';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/Add';
import Image from 'next/image';
import QuickViewDrawer from './QuickViewDrawer';



const RestroCard = ({ ele,sideDraw,setSideDraw }) => {
    console.log(ele)
   const handleAddCat =()=>{
    setSideDraw({...sideDraw,open:true})
   }
    return (
              <Grid item lg={3} md={4} sm={6} xs={12} sx={{ mt: "20px", display: "flex", justifyContent: "center" }}>
                <Paper elevation={3} sx={{ width: "280px", overflow: "hidden", borderRadius: "20px 20px 8px 8px", cursor: "pointer" }}>
                  <Box sx={{ position: "absolute", top: "20px", right: "20px", zIndex: 1 }}>
                    <Icon>
                      <FavoriteOutlinedIcon sx={{ color: "red" }} />
                    </Icon>
                  </Box>
                  <Box sx={{ height: "250px", width: "280px" }}>
                    <Image alt='img' src={ele.image}   style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                  </Box>
                  <Box sx={{p:"10px 15px"}}>
                  <Box sx={{}}>
                    <Typography sx={{ fontWeight: 700, mt: "10px",color:"#00897b" }}>
                      {ele.shopName}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mt: "10px" }}>
                    <Typography sx={{ display: "flex", alignItems: "center", fontSize: "11px", mr: "5px", color: "#bdbdbd", fontWeight: 600 }}><StarIcon sx={{ color: "#ffb300", mt: "-2px", fontSize: "15px", mr: "4px" }} />{ele.ratings}</Typography>
                    <span style={{ display: "flex", alignItems: "center" }}><FiberManualRecordIcon sx={{ color: "#bdbdbd", fontSize: "5px", mr: "5px" }} /></span>
                    <Typography sx={{ fontSize: "11px", mr: "5px", color: "#bdbdbd", fontWeight: 600 }}> 1k+Reviews</Typography>
                    <span style={{ display: "flex", alignItems: "center" }}><FiberManualRecordIcon sx={{ color: "#bdbdbd", fontSize: "5px", mr: "5px" }} /></span>
                    <Typography sx={{ display: "flex", alignItems: "center", fontSize: "11px", mr: "10px", color: "#bdbdbd", fontWeight: 600 }}>2.97km</Typography>
                  </Box>
                  <Box sx={{ borderBottom: "2px solid #e0e0e0", mt: "15px" }}></Box>

                  <Box sx={{ display: "flex",mt:"10px", justifyContent: "space-between", alignItems: "center" }}>
                    <Box>
                      <Typography sx={{ fontWeight: 700, mt: "10px" }}>
                        {ele.name}fdsdfds
                      </Typography>
                      <Typography sx={{ display: "flex", alignItems: "center", fontSize: { lg: "15px" }, mr: "10px", color: "green", fontWeight: 800, ml: "-5px" }}><AttachMoneyIcon sx={{ color: "#00897b", mt: "-2px", fontWeight: 900, fontSize: "25px" }} /><s style={{ color: "red", marginRight: "5px" }}>600</s>700</Typography>

                    </Box>
                    <Box >
                      <Button variant='contained' sx={{ height: "40px", width: "40px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "13px", bgcolor:"#00897b",'&:hover':{bgcolor:"#00897b"},color:"white"}} onClick={handleAddCat}>
                        Add
                      </Button>
                     <QuickViewDrawer sideDraw={sideDraw} setSideDraw={setSideDraw}/>
                    </Box>
                  </Box>
                </Box>
                </Paper>
              </Grid>
         
      
    );
};

export default RestroCard;