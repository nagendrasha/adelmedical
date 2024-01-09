'use client'
import { Alert, Box, CircularProgress, Container, Grid, IconButton, Paper, Skeleton, Snackbar, Typography } from '@mui/material';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import add1 from '../../../assests/location.png'
import Image from 'next/image';
import nodata from '../../../assests/nodatanew.gif'



const CheckOutPage = () => {
    const params = useParams();
    const router = useRouter();
    const [cartData, setCartData] = useState([])
    const [listCheck , setListCheck]=useState(false)
    const [loader , setLoader]=useState('')
    const arr = new Array(10).fill(1)


    const fetchApi = async () => {
        try {
            const respData = await axios.get(`/api/cart/${params.UID}`);
            console.log("response data new", respData.data.resp)
            if (respData.data.message == 'Data Fetched Successfully') {
                setCartData(respData.data.resp)
                setListCheck(false)
               
            }
            if (respData.data.message == 'No Data Found') {
                setListCheck(true)
            }
        } catch (err) {
            console.log(err);
            alert(err)
        }
    };

    // console.log(cartData)

  



    const totalAmount = cartData.reduce((acc, curr) => {
        return acc + curr.srp * curr.qty
    }, 0)

    const handleRemoveItem = async (id) => {
        setLoader(id)
        try {
            console.log(id);
            const respData = await axios.post(`/api/deletecartitem/${id}`);
            //   console.log(respData)
            if (respData.data.message == "Item Removed Successfully") {
                setLoader(false)
                fetchApi();
            }
            else {
                alert(respData.data.message)
                setLoader(false)
            }
        }
        catch (err) {
            console.log(err)
            alert(err.message)
        }
    }


    const handleNavigateAddress = () => {
        const id = JSON.parse(localStorage.getItem('UID'))
        router.push(`/useraddress/${id}`)
    };

    useEffect(() => {
        fetchApi();

    }, [])


    return (
        <>
            <Container disableGutters maxWidth='xl'>
            <Grid container justifyContent={"space-between"} alignItems={"center"} sx={{ height: "70px", bgcolor: "#37474f" }}>
                    <Grid item xs={12}>
                        <Typography align='center' sx={{ color: "white", fontSize: "20px", fontWeight: "600", cursor: "pointer", userSelect: "none" }}>My Cart</Typography>
                    </Grid>

                </Grid>
                <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '0px', overflow: 'hidden' }}>
                    <Grid item lg={4} md={6} sm={8} xs={11} >
                        <Paper sx={{ borderRadius: '10px 10px 10px 10px', mt: '40px',mb:"10px" }} elevation={2}>
                        {
                            listCheck
                             ?
                            
                            <Grid container sx={{}}>
                                 <Grid item xs={12} sx={{height:"70vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                                      <Box sx={{position:"relative",height:"300px",width:"400px"}}>
                                         <Image src={nodata} alt='no data' style={{height:"100%",width:"100%",position:"absolute"}}/>
                                      </Box>
                                     <Typography sx={{color:"#bdbdbd",fontSize:"18px",fontWeight:"700"}}>No Item Added</Typography>
                                 </Grid>
                            </Grid>
                             :
                            <Grid container>
                                <Grid item xs={12} sx={{ bgcolor: 'black', padding: '8px', textAlign: 'center', borderRadius: '11px 11px 0px 0px' }}>
                                    <Typography sx={{ color: 'White', fontSize: { lg: '25px', md: '23px', sm: '20px', xs: '18px' }, fontWeight: 'bold' }}>My Cart</Typography>

                                </Grid>
                                  
                                   <Grid container>
                                    {
                                    cartData.length == 0
                                        ?
                                        <Grid item xs={12} sx={{ p: "0px 10px 3px 10px"}}>
                                            <Skeleton variant='rectangle' sx={{ fontSize: "17px", width: "30%",mt:"20px" }} />
                                            <Box sx={{ display: "flex", justifyContent: "space-between",  mt: "10px", width: "100%",mt:"40px" }}>
                                                <Skeleton variant='square' sx={{ fontSize: "17px", width: "20%" }} />
                                                <Skeleton variant='square' sx={{ fontSize: "17px",height:"30px",width: "5%" }} />
                                                <Skeleton variant='text' sx={{ width: "10%"}} />
                                            </Box>

                                            
                                            <Box sx={{ display: "flex", justifyContent: "space-between",  mt: "10px", width: "100%",mt:"20px" }}>
                                                <Skeleton variant='square' sx={{ fontSize: "17px", width: "20%" }} />
                                                <Skeleton variant='square' sx={{ fontSize: "17px",height:"30px",width: "5%" }} />
                                                <Skeleton variant='text' sx={{ width: "10%"}} />
                                            </Box>

                                           
                                            <Box sx={{ display: "flex", justifyContent: "space-between",  mt: "10px", width: "100%",mt:"20px" }}>
                                                <Skeleton variant='square' sx={{ fontSize: "17px", width: "20%" }} />
                                                <Skeleton variant='square' sx={{ fontSize: "17px",height:"30px",width: "5%" }} />
                                                <Skeleton variant='text' sx={{ width: "10%"}} />
                                            </Box>
                                        </Grid>


                                        :
                                        <>
                                            <Grid item xs={12} sx={{ p: '10px' }}>
                                                <Typography sx={{ fontSize: { lg: '21px', md: '19px', sm: '17px', xs: '16px' }, fontWeight: 'bold', color: '#616161' }}>{cartData.length} Items</Typography>
                                            </Grid>

                                            {
                                                cartData.map((ele) => {
                                                    {/* console.log("cart item",ele) */ }
                                                    return (
                                                        <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px' }}>
                                                            <Grid item xs={6} >
                                                                <Typography sx={{ fontSize: { lg: '16px', mr: '16px', sm: '14px', xs: '14px' }, fontWeight: 'bold' }}>{ele.name} x {ele.qty}</Typography>
                                                                <Typography sx={{ fontSize: { lg: '14px', md: '13px', sm: '12px', xs: '9px' }, fontWeight: 'bold', color: '#bdbdbd' }}>{ele.srp} x {ele.qty}</Typography>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                            {
                                                                loader == ele._id ?
                                                                <Box>
                                                                    <CircularProgress size={20} color='inherit'/>
                                                                </Box>
                                                                 :
                                                                <Box>
                                                                    <IconButton onClick={() => { handleRemoveItem(ele._id) }}>
                                                                        <DeleteForeverIcon sx={{ color: "red", fontSize: "30px" }} />
                                                                    </IconButton>
                                                                </Box>
                                                            }
                                                            </Grid>
                                                            <Grid item xs={4} sx={{ textAlign: 'right' }}>
                                                                <Typography sx={{ fontSize: { lg: '16px', mr: '16px', sm: '14px', xs: '14px' }, fontWeight: 'bold', color: '#616161' }}>Rs {(ele.srp) * (ele.qty)}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    )
                                                })
                                            }
                                        </>

                                }
                                </Grid>  
                                <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px', bgcolor: 'black', borderRadius: '0px 0px 11px 11px' }}>
                                    <Grid item xs={4} >
                                        <Typography sx={{ fontSize: { lg: '19px', md: '18px', sm: '16px', xs: '15px' }, fontWeight: 'bold', color: 'white' }}>To Pay</Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{ textAlign: 'right' }}>
                                        <Typography sx={{ fontSize: { lg: '19px', md: '18px', sm: '16px', xs: '15px' }, fontWeight: 'bold', color: 'white' }}>Rs {totalAmount}</Typography>

                                    </Grid>
                                </Grid>

                            </Grid>

                        }
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            {
                !listCheck &&   <Paper elevation={4} sx={{ position: "fixed", display: cartData.length > 0 ? "block" : "none", zIndex: 999, borderRadius: "50px", overflow: "hidden", bottom: "30px", right: "50px", cursor: "pointer" }} onClick={handleNavigateAddress}>
                <Box sx={{ position: "relative", height: "60px", width: "60px" }}>
                    <Image src={add1} objectFit='cover' style={{ height: "100%", width: "100%" }} />
                </Box>
            </Paper>
            }
          

        </>
    )
}

export default CheckOutPage