
'use client'
import { Alert, Box, Container, Grid, Icon, Paper, Skeleton, Snackbar, Typography } from '@mui/material';
import Image from 'next/image';
import shop2 from '../assests/shop2.jpg'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import StarIcon from '@mui/icons-material/Star';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/Add';
import AddToCartModal from './AddToCartModal';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SnackBarCustom from './SnackBarCustom';
import SnackBarCustomError from './SnackBarCustomError';





const Cards = ({ productData,fetchCartData,}) => {
  const router = useRouter();

  const [open, setOpen] = useState(false)
  const [modalData, setModalData] = useState({open: false,data: {}})
  const [customSnack,setCustomSnack]=useState({open:false,message:""})
  const [errorSnack, setErrorSnack] = useState({open:false,message:""})
  const arr = new Array(10).fill(1)


  // console.log("all the new data",productData)


  // console.log("local storage",localStorage.getItem('UID'))
  const handleAddToCartModal = async (ele) => {
    console.log("ele item", ele)
    if (localStorage.getItem('UID')) {
      setModalData({ ...modalData, open: true, data: ele });
    }
    else {
      router.push('/userlogin')
    }
  };


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  return (

    <>
      {
        productData.length == 0
          ?
          <Grid container sx={{ justifyContent: "space-around" }}>
            {
              arr.map((ele, index) => {
                return <Grid item key={index} lg={3.8} md={4} sm={6} xs={12} sx={{ mt: "20px", mb: "20px", overflow: "hidden", borderRadius: "20px 20px 8px 8px" }}>
                  <Box style={{ width: "100%" }}>
                    <Skeleton sx={{ marginTop: -10, marginBottom: -7, height: 380, width: "100%" }} />
                  </Box>
                  <Box sx={{ p: "0px 10px 3px 10px",width:"100%" }}>
                    <Skeleton variant='text' sx={{ fontSize: "17px",width:"30%" }} />

                    <Box sx={{  mt: "10px",width:"100%" }}>
                        <Skeleton variant='text' sx={{ fontSize: "17px", width: "70%" }} />
                    </Box>

                    <Box sx={{ borderBottom: "2px solid #e0e0e0", mt: "15px" }}></Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between",alignItems:"center", mt: "10px", width: "100%" }}>
                      <Box sx={{ width: "10%" }}>
                        <Skeleton variant='text' sx={{ fontSize: "17px", width: "100%" }} />
                        <Skeleton variant='text' sx={{ fontSize: "17px", width: "100%" }} />
                      </Box>
                      <Box sx={{ width: "40px",height:"40px",mr:"10px" }}>
                        <Skeleton variant='square' sx={{ width: "100%",height:"100%",borderRadius:"15px" }} />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              })
            }
          </Grid>
          :
          <Grid container sx={{ justifyContent: "space-evenly", mt: { lg: "20px", md: "20px", xs: "10px", sm: "15px" } }} spacing={2}>
            {
              productData.map((ele, index) => {
                return (
                  <Grid key={index} item lg={3.8} md={3} sm={6} xs={12} sx={{ display: "flex", justifyContent: "center", p: "10px", cursor: "pointer" }}>
                    <Paper sx={{ position: "relative", p: "15px 20px", width: { lg: "220px", md: "220px", sm: "220px", xs: "250px" }, borderRadius: "14px" }}>
                      <Box sx={{ position: "absolute", top: "20px", right: "20px", zIndex: 1 }}>
                        <Icon>
                          <FavoriteOutlinedIcon sx={{ color: "red" }} />
                        </Icon>
                      </Box>
                      <Box sx={{ height: { lg: "180px", md: "180px", sm: "180px", xs: "220px" }, position: "relative" }}>
                        <Image alt='img' src={shop2} style={{ height: "100%", width: "100%" }} />
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 700, mt: "10px" }}>
                          {ele.name}
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

                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box>
                          <Typography sx={{ fontWeight: 700, mt: "10px" }}>
                            {ele.name}
                          </Typography>
                          <Typography sx={{ display: "flex", alignItems: "center", fontSize: { lg: "15px" }, mr: "10px", color: "green", fontWeight: 800, ml: "-5px" }}><AttachMoneyIcon sx={{ color: "#ffb300", mt: "-2px", fontWeight: 900, fontSize: "25px" }} /><s style={{ color: "red", marginRight: "5px" }}>{ele.mrp}</s>{ele.srp}</Typography>

                        </Box>
                        <Box>
                          <Icon sx={{ height: "40px", width: "40px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "13px", bgcolor: "#ffb300", "&:hover": { bgcolor: "#ffb300" } }} onClick={() => { handleAddToCartModal(ele) }}>
                            <AddIcon sx={{ color: "white" }} />
                          </Icon>
                          <AddToCartModal modalData={modalData} setModalData={setModalData} open={open} setOpen={setOpen} fetchCartData={fetchCartData}  setCustomSnack={setCustomSnack}  setErrorSnack={setErrorSnack}/>
                        </Box>
                      </Box>

                    </Paper>
                  </Grid>
                )
              })
            }
          </Grid>
          }
            <SnackBarCustom customSnack={customSnack} setCustomSnack={setCustomSnack}/>
            <SnackBarCustomError errorSnack={errorSnack} setErrorSnack={setErrorSnack}/>
    </>


  )
}

export default Cards