'use client'
import Header from '@/components/Header';
import { Alert, Box, Button, CircularProgress, Container, Divider, Fab, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Paper, Select, Skeleton, Snackbar, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import nodata from '../../../assests/nodatanew.gif'
import Image from 'next/image';





const Billing = () => {
  const param = useParams();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [checker, setChecker] = useState(false)
  const [paymentMode, setPaymentMode] = useState({ value: "", online: false, verified: false, upiId: "", textChange: false })
  const [btnShow, setBtnShow] = useState({ disabled: true, loader: false })
  const subTotal = items.reduce((acc, crr) =>{ return acc + (crr.srp * crr.qty)}, 0);
  const delChrg = 40;
  const tax = 20;
  const dis = 10;
  const toPay = (subTotal + delChrg + tax) - dis


  // console.log("params",subTotal)


  const fetchCartApi = async () => {
    try {

      const res = await axios.get(`/api/cart/${param.data[1]}`);
      // console.log('new data ',res);

      if (res.data.message == 'Data Fetched Successfully') {
        setItems(res.data.resp)
        setChecker(false)
      }
      if (res.data.message == 'No Data Found') {
        setChecker(true)
      }

    } catch (err) {
      // console.log(err);
      alert(err.message)
    }
  };
  // console.log("cartData",cartData)
  useEffect(() => {
    fetchCartApi();
  }, []);






  const clearCart = async () => {
    try {
      const res = await axios.delete(`/api/cart/${param.data[1]}`);
      // console.log('new data ',res);
    } catch (err) {
      // console.log(err);
      alert(err.message)
    }
  };


  // console.log('params', param.data[0])
  const handleOrderSubmit = async () => {

    setBtnShow({ ...btnShow, disabled: true, loader: true })
    const addressId = param.data[0]
    const uid = await JSON.parse(localStorage.getItem('UID'))
    const toSend = {items,subTotal,delChrg,tax,dis,toPay,uid,addressId,paymentMethod: paymentMode.value}
    try {
      // console.log(toSend);
      const respData = await axios.post('/api/billing', toSend)
      // console.log("billing data", respData.data.resp)
      if (respData.data.message == 'Order Placed Successfully') {
        clearCart();
        router.push(`/orderplaced/${respData.data.resp._id}`)
      }
      if (respData.data.message == 'Failed To Placed Successfully') {
        setBtnShow({ ...btnShow, disabled: false, loader: false })
      }
    }
    catch (err) {
      console.log(err);
      alert(err)
    }
  }

  const handleSelect = (e) => {
    const value = e.target.value
    if (value == 'online') {
      setPaymentMode({ ...paymentMode, value: value, online: true })
    }
    if (value == 'cod') {
      setPaymentMode({ ...paymentMode, value: value, online: false, verified: false,textChange:false })
      setBtnShow({ ...btnShow, disabled: false })
    }
    else{
      setBtnShow({ ...btnShow, disabled: true })

    }
  }

    const handleCollect = (e) => { 
      // console.log("value",e.target.value)
      setPaymentMode({ ...paymentMode, upiId: e.target.value,textChange:false })
      setBtnShow({ ...btnShow, disabled: true })
    }


  const handleVerify = () => { 
    // const count = paymentMode.upiId.split('@').length-1
    const count = (paymentMode.upiId.match(/@/g) || []).length 
    if ((count==1 && paymentMode.upiId.indexOf('@') != 0) && (paymentMode.upiId.indexOf('@')+1 !=paymentMode.upiId.length) ) {
      setPaymentMode({ ...paymentMode, verified: true, textChange: true })
      setBtnShow({ ...btnShow, disabled: false })
    } else {
      setPaymentMode({ ...paymentMode, verified: false, textChange: true });
      setBtnShow({ ...btnShow, disabled: true })
    }
  };

  console.log("values",paymentMode)

  return (
    <>
      <Container disableGutters maxWidth='xl'>
        <Grid container justifyContent={"space-between"} alignItems={"center"} sx={{ height: "70px", bgcolor: "#37474f" }}>
          <Grid item xs={4}>
            <Typography sx={{ color: "white", fontSize: "20px", fontWeight: "600", cursor: "pointer", userSelect: "none" }}>AdelSocialFood</Typography>
          </Grid>
          <Grid item xs={8} sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <Typography sx={{ color: "white", cursor: "pointer", userSelect: "none", mr: "15px" }} ></Typography>
          </Grid>
        </Grid>

        <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '0px', overflow: 'hidden' }}>
          {
            checker
              ?
              <Grid container sx={{}}>
                <Grid item xs={12} sx={{ height: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <Box sx={{ position: "relative", height: "300px", width: "400px" }}>
                    <Image src={nodata} alt='no data' style={{ height: "100%", width: "100%", position: "absolute" }} />
                  </Box>
                  <Typography sx={{ color: "#bdbdbd", fontSize: "18px", fontWeight: "700" }}>No Data To Show </Typography>
                </Grid>
              </Grid>
              :
              <Grid item lg={4} md={6} sm={8} xs={11} >

                <Grid container >
                  <Grid item xs={12}>
                    <Typography align='center' sx={{ fontSize: "20px", fontWeight: "800" }}>Payment Method </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

                 {/* this formcontrol giving error on build time */}
                    <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                      <Select  value={paymentMode.value} onChange={handleSelect}  displayEmpty inputProps={{ 'aria-label': 'Without label' }} input={<OutlinedInput sx={{ height: "40px" }} />}>
                      <MenuItem value="" disabled={true}> <em>Select Payment Method</em> </MenuItem>
                        <MenuItem value='cod'>COD</MenuItem>
                        <MenuItem value='online'>Onine</MenuItem>
                      </Select>
                    </FormControl>
                    {
                      paymentMode.online &&
                      <Box sx={{ mt: "15px" }}>
                        <Box sx={{ display: "flex" }}>
                          <OutlinedInput placeholder='Enter UPI ID' fullWidth sx={{ height: "40px" }} onChange={handleCollect} />
                          <Button variant='contained' size='small' disabled={paymentMode.upiId == ''} sx={{ p: "2px 4px 2px 4px", ml: "5px" }} onClick={handleVerify}>Verify</Button>
                        </Box>
                        {(paymentMode.textChange && paymentMode.upiId) && <Typography align='center' sx={{ mt: "5px", color: paymentMode.verified ? "green" : "red" }}>{paymentMode.verified ? 'Verified' : 'Not Verified'}</Typography>}
                      </Box>
                    }

                  </Grid>
                </Grid>
                <Paper sx={{ borderRadius: '10px 10px 10px 10px', mt: '30px' }} elevation={2}>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px' }}>
                        <Grid item xs={6}>
                        {items.length > 0 ? 
                          <Typography sx={{ fontSize: { lg: '17px', md: '17px', sm: '15px', xs: '15px' }, fontWeight: 'bold', }}>Item SubTotal</Typography>
                          :
                            <Skeleton variant='text' sx={{ width: "100%" }} />
                          }
                        </Grid>
                        <Grid item xs={2} >
                          {items.length > 0 ? <Typography sx={{ fontSize: { lg: '17px', md: '17px', sm: '15px', xs: '15px' }, fontWeight: 'bold', color: '#616161', textAlign: 'center' }}>{subTotal} Rs</Typography>
                            :
                            <Skeleton variant='text' sx={{ width: "40%" }} />
                          }
                        </Grid>
                      </Grid>
                      <Divider sx={{ width: '100%', bgcolor: 'lightgrey', mt: '4px' }} />

                      <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px' }}>
                      {items.length > 0 ? <>
                        <Grid item xs={6}>
                          <Typography sx={{ fontSize: { lg: '15px', mr: '15px', sm: '13px', xs: '13px' }, fontWeight: 'bold', }}>Delivery Charges</Typography>

                        </Grid>
                        <Grid item xs={2} >

                         <Typography sx={{ fontSize: { lg: '15px', mr: '15px', sm: '13px', xs: '13px' }, fontWeight: 'bold', color: '#616161', textAlign: 'center' }}>{delChrg} Rs</Typography>
                        </Grid>
                      </>
                            :
                            <Skeleton variant='text' sx={{ width: "100%" }} />
                          }
                      </Grid>
                      <Divider sx={{ width: '100%', bgcolor: 'lightgrey', mt: '4px' }} />

                      <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px' }}>
                      {items.length > 0 ? <>
                        <Grid item xs={6}>
                          <Typography sx={{ fontSize: { lg: '15px', mr: '15px', sm: '13px', xs: '13px' }, fontWeight: 'bold', }}>Tax (9%)</Typography>

                        </Grid>
                        <Grid item xs={2} >
                          <Typography sx={{ fontSize: { lg: '15px', mr: '15px', sm: '13px', xs: '13px' }, fontWeight: 'bold', color: '#616161', textAlign: 'center' }}>{tax} Rs</Typography>
                        </Grid>
                         </>
                            :
                            <Skeleton variant='text' sx={{ width: "100%" }} />
                          }
                      </Grid>
                      <Divider sx={{ width: '100%', bgcolor: 'lightgrey', mt: '4px' }} />

                      <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px' }}>
                      {items.length > 0 ? <>
                        <Grid item xs={6}>
                          <Typography sx={{ fontSize: { lg: '15px', mr: '15px', sm: '13px', xs: '13px' }, fontWeight: 'bold', }}>Discount</Typography>

                        </Grid>
                        <Grid item xs={2} >
                          <Typography sx={{ fontSize: { lg: '15px', mr: '15px', sm: '13px', xs: '13px' }, fontWeight: 'bold', color: '#616161', textAlign: 'center' }}>{dis} Rs</Typography>
                        </Grid>
                        </>
                            :
                            <Skeleton variant='text' sx={{ width: "100%" }} />
                          }
                      </Grid>
                      <Divider sx={{ width: '100%', bgcolor: 'lightgrey', mt: '4px' }} />

                      <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px', bgcolor: '#eeeeee', borderRadius: '0px 0px 11px 11px' }}>
                        <Grid item xs={6}>
                         {items.length > 0 ? <Typography sx={{ color: "black", fontSize: { lg: '20px', md: '20px', sm: '18px', xs: '15px' }, fontWeight: 'bold' }}>To Pay</Typography>
                            :
                            <Skeleton variant='text' sx={{ width: "40%" }} />
                          }
                        </Grid>
                        <Grid item xs={2} >
                          {items.length > 0 ? <Typography sx={{ fontSize: { lg: '19px', md: '18px', sm: '16px', xs: '15px' }, fontWeight: 'bold', color: '#616161', textAlign: 'center' }}>{toPay} Rs</Typography>
                            :
                            <Skeleton variant='text' sx={{ width: "40%" }} />
                          }
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>


                {/* Ordered Items */}
                <Paper sx={{ borderRadius: '10px 10px 10px 10px', mt: '40px', mb: "5px" }} elevation={2}>
                  {
                    items.length == 0
                      ?
                      <Grid container sx={{ mb: "10px" }}>


                        <Grid item xs={12} sx={{ p: "0px 10px 3px 10px" }}>
                          <Skeleton variant='rectangle' sx={{ fontSize: "17px", width: "30%", mt: "20px" }} />
                          <Box sx={{ display: "flex", justifyContent: "space-between", mt: "10px", width: "100%", mt: "40px" }}>
                            <Skeleton variant='square' sx={{ fontSize: "17px", width: "20%" }} />

                            <Skeleton variant='text' sx={{ width: "10%" }} />
                          </Box>


                          <Box sx={{ display: "flex", justifyContent: "space-between", mt: "10px", width: "100%", mt: "20px" }}>
                            <Skeleton variant='square' sx={{ fontSize: "17px", width: "20%" }} />

                            <Skeleton variant='text' sx={{ width: "10%" }} />
                          </Box>


                          <Box sx={{ display: "flex", justifyContent: "space-between", mt: "10px", width: "100%", mt: "20px" }}>
                            <Skeleton variant='square' sx={{ fontSize: "17px", width: "20%" }} />

                            <Skeleton variant='text' sx={{ width: "10%" }} />
                          </Box>
                        </Grid>
                      </Grid>
                      :


                      <Grid container>
                        <Grid item xs={12} sx={{ p: '10px' }}>
                          <Typography sx={{ fontSize: { lg: '21px', md: '19px', sm: '17px', xs: '16px' }, fontWeight: 'bold', color: 'black' }}>Ordered Items</Typography>
                        </Grid>
                        {
                          items.map((ele, index) => {
                            {/* console.log("cart item",ele) */ }
                            return (
                              <Grid container key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px' }}>
                                <Grid item xs={6} >
                                  <Typography sx={{ fontSize: { lg: '16px', mr: '16px', sm: '14px', xs: '14px' }, fontWeight: 'bold' }}>{ele.name} x {ele.qty}</Typography>
                                  <Typography sx={{ fontSize: { lg: '14px', md: '13px', sm: '12px', xs: '9px' }, fontWeight: 'bold', color: '#bdbdbd' }}>{ele.srp} x {ele.qty}</Typography>
                                </Grid>
                                <Grid item xs={4} sx={{ textAlign: 'right' }}>
                                  <Typography sx={{ fontSize: { lg: '16px', mr: '16px', sm: '14px', xs: '14px' }, fontWeight: 'bold', color: '#616161' }}>Rs {(ele.srp) * (ele.qty)}</Typography>
                                </Grid>
                              </Grid>
                            )
                          })
                        }
                      </Grid>
                  }

                  <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px', bgcolor: '#eeeeee', borderRadius: '0px 0px 11px 11px' }}>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                      {
                        btnShow.loader ?
                          <CircularProgress color="inherit" size={25} />
                          :
                          <Button variant='contained' color='success' disabled={btnShow.disabled} fullWidth onClick={handleOrderSubmit}>
                            Place Order
                          </Button>
                      }


                    </Grid>

                  </Grid>
                </Paper>
              </Grid>


          }


        </Grid>
      </Container>


    </>
  )
}

export default Billing