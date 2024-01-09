

'use client'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, Grid, IconButton, Paper, Skeleton, Typography } from '@mui/material'
import { useRouter } from 'next/navigation';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { FamilyRestroomRounded } from '@mui/icons-material';
import Image from 'next/image';
import nodata from '../../assests/nodata2.gif'



const page = () => {
    const router = useRouter()
    const [orders, setOrders] = useState([])
    const [expanded, setExpanded] = useState('0');
    const [checker ,setChecker]=useState(false)




    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    const handleNavigate = () => {
        router.push('/myorders')
    }

    const fetchData = async () => {
        const uid = JSON.parse(localStorage.getItem('UID'));
        const respData = await axios.get(`/api/pastorders/${uid}`)
        console.log("reponse data", respData.data.resp); 
        if (respData.data.message == 'Fetched Successfully') {
            setOrders(respData.data.resp)
            setChecker(false)
        }
        if(respData.data.message == 'No Data Found'){
            setChecker(true)
        }
    }




    useEffect(() => {
        if (localStorage.getItem('UID')) {
           
            fetchData();
        }
    }, [])
    return (
        <>
            <Grid container>

<Grid item xs={12} sx={{ p: { lg: "15px 10px", md: "20px 10px", sm: "15px 8px", xs: "12px 5px" }, bgcolor: "#37474f" }}>
    <Typography align='center' sx={{ color: "white", fontSize: "30px", fontWeight: "800", cursor: "pointer", userSelect: "none" }} onClick={handleNavigate}>My Orders</Typography>
</Grid>

<Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", p: "15px 10px" }}>

    <Box>
        <Typography>{orders.length} Past Orders</Typography>
    </Box>

  

</Grid>
{
    checker ?
    <Grid container sx={{}}>
                <Grid item xs={12} sx={{ height: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <Box sx={{ position: "relative", height: "300px", width: "400px" }}>
                    <Image src={nodata} alt='no data' style={{ height: "100%", width: "100%", position: "absolute" }} />
                  </Box>
                  <Typography sx={{ color: "#bdbdbd", fontSize: "18px", fontWeight: "700" }}>No Data To Show </Typography>
                </Grid>
              </Grid>
    :
<Grid container justifyContent={"center"} alignItems={"center"}>
{
    orders.length == 0 ?
    <Grid item xs={6} sx={{mt:"30px"}}>
    {
        new Array(4).fill(1).map((ele,index)=>{
            return   <Box>
                       <Skeleton key={index} sx={{height:"80px",width:"100%"}}/>
                     </Box>
        })
    } 
       
     </Grid>
     :
    <Grid item xs={6} sx={{ mt: "50px" }}>
        {
            orders.map((ele, index) => {
                {/* console.log("accordian",ele) */ }
                return <Box key={index} sx={{ m: "5px" }}>
                    <Accordion expanded={expanded === index} onChange={handleChange(index)} sx={{}} elevation={3}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                <Typography sx={{ flexShrink: 0 }}>
                                    Order ID: <span style={{fontSize:"13px"}}>#{ele._id}</span>
                                </Typography>
                                <Typography sx={{ flexShrink: 0,color:"green" }}>
                                   <span style={{fontSize:"17px",fontWeight:"800",color:"black"}}>Status:</span>  {ele.orderStatus}
                                </Typography>
                                <Typography sx={{}}>{ele.toPay} Rs</Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Paper sx={{display:"flex",justifyContent:"space-around",mb:"15px",p:"10px"}}>
                                <Typography sx={{ flexShrink: 0,color:"green" }}>
                                   <span style={{fontSize:"17px",fontWeight:"800",color:"black"}}>Status:</span>  {ele.orderStatus}
                                </Typography>
                                <Typography sx={{ flexShrink: 0 }}>
                                <span style={{fontSize:"17px",fontWeight:"800"}}> Payment Method: </span>{ele.paymentMethod}
                                </Typography>
                        </Paper>
                            <Paper sx={{ borderRadius: '10px 10px 10px 10px', }} >
                                <Grid container>

                                    <Grid item xs={12}>
                                        <Grid container>
                                            <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px' }}>
                                                <Grid item xs={6}>
                                                    <Typography sx={{ fontSize: { lg: '20px', md: '20px', sm: '18px', xs: '15px' }, fontWeight: 'bold', }}>Item SubTotal</Typography>

                                                </Grid>
                                                <Grid item xs={2} >
                                                     <Typography sx={{ fontSize: { lg: '20px', md: '20px', sm: '18px', xs: '15px' }, fontWeight: 'bold', color: '#616161', textAlign: 'center' }}>{ele.subTotal} Rs</Typography>
                                                </Grid>
                                            </Grid>
                                            <Divider sx={{ width: '100%', bgcolor: 'lightgrey', mt: '4px' }} />

                                            <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px' }}>
                                                <Grid item xs={6}>
                                                    <Typography sx={{ fontSize: { lg: '15px', mr: '15px', sm: '13px', xs: '13px' }, fontWeight: 'bold', }}>Delivery Charges</Typography>

                                                </Grid>
                                                <Grid item xs={2} >
                                                      <Typography sx={{ fontSize: { lg: '15px', mr: '15px', sm: '13px', xs: '13px' }, fontWeight: 'bold', color: '#616161', textAlign: 'center' }}>{ele.delChrg} Rs</Typography>
                                                </Grid>
                                            </Grid>
                                            <Divider sx={{ width: '100%', bgcolor: 'lightgrey', mt: '4px' }} />

                                            <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px' }}>
                                                <Grid item xs={6}>
                                                    <Typography sx={{ fontSize: { lg: '15px', mr: '15px', sm: '13px', xs: '13px' }, fontWeight: 'bold', }}>Tax (9%)</Typography>

                                                </Grid>
                                                <Grid item xs={2} >
                                                    <Typography sx={{ fontSize: { lg: '15px', mr: '15px', sm: '13px', xs: '13px' }, fontWeight: 'bold', color: '#616161', textAlign: 'center' }}>{ele.tax} Rs</Typography>
                                                </Grid>
                                            </Grid>
                                            <Divider sx={{ width: '100%', bgcolor: 'lightgrey', mt: '4px' }} />

                                            <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px' }}>
                                                <Grid item xs={6}>
                                                    <Typography sx={{ fontSize: { lg: '15px', mr: '15px', sm: '13px', xs: '13px' }, fontWeight: 'bold', }}>Discount</Typography>

                                                </Grid>
                                                <Grid item xs={2} >
                                                    <Typography sx={{ fontSize: { lg: '15px', mr: '15px', sm: '13px', xs: '13px' }, fontWeight: 'bold', color: '#616161', textAlign: 'center' }}>{ele.dis} Rs</Typography>
                                                        
                                                       
                                                    
                                                </Grid>
                                            </Grid>
                                            <Divider sx={{ width: '100%', bgcolor: 'lightgrey', mt: '4px' }} />

                                            <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px', bgcolor: '#eeeeee', borderRadius: '0px 0px 11px 11px' }}>
                                                <Grid item xs={6}>
                                                    <Typography sx={{ color: "black", fontSize: { lg: '20px', md: '20px', sm: '18px', xs: '15px' }, fontWeight: 'bold' }}>To Pay</Typography>

                                                </Grid>
                                                <Grid item xs={2} >
                                                    <Typography sx={{ fontSize: { lg: '19px', md: '18px', sm: '16px', xs: '15px' }, fontWeight: 'bold', color: '#616161', textAlign: 'center' }}>{ele.toPay} Rs</Typography>
                                                        
                                                      
                                                    
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>

                            <Paper sx={{ borderRadius: '10px 10px 10px 10px', mt: '40px', mb: "5px" }} >

                                <Grid item xs={12} sx={{ p: '10px' }}>
                                    <Typography sx={{ fontSize: { lg: '21px', md: '19px', sm: '17px', xs: '16px' }, fontWeight: 'bold', color: 'black' }}>Ordered Items</Typography>
                                </Grid>

                                {
                                    ele.items.map((ele) => {
                                        {/* console.log("cart item",ele) */ }
                                        return (
                                            <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px' }}>
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
                            </Paper>
                                   <Grid container>
                                        <Grid item xs={12} sx={{p:"15px"}}>
                                            <Typography align='center' variant='h5'>Delivery Address</Typography>
                                        </Grid>
                                        </Grid>
                            <Paper sx={{ borderRadius: '10px 10px 10px 10px', }} >
                                <Grid container>

                                    <Grid item xs={12}>
                                        <Grid container>
                                        
                                            <Grid container sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', p: '10px' }}>
                                                <Grid item xs={6}>
                                                    <Typography sx={{ fontSize: { lg: '20px', md: '20px', sm: '18px', xs: '15px' }, fontWeight: 'bold', }}>Reciever Name </Typography>

                                                </Grid>
                                                <Grid item xs={2} >
                                                     <Typography sx={{ fontSize: { lg: '20px', md: '20px', sm: '18px', xs: '15px' }, fontWeight: 'bold',textTransform:"capitalize", color: '#616161', textAlign: 'center' }}>{ele.delAddress.receiverName}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Divider sx={{ width: '100%', bgcolor: 'lightgrey', mt: '4px' }} />

                                            <Grid container sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', p: '10px' }}>
                                                <Grid item xs={6}>
                                                    <Typography sx={{ fontSize: { lg: '15px', mr: '15px', sm: '13px', xs: '13px' }, fontWeight: 'bold', }}>Delivery Address - </Typography>

                                                </Grid>
                                                <Grid item xs={2} >
                                                      <Typography sx={{ fontSize: { lg: '15px', mr: '15px', sm: '13px', xs: '13px' }, fontWeight: 'bold',textTransform:"capitalize", color: '#616161', textAlign: 'center' }}>{ele.delAddress.address}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Divider sx={{ width: '100%', bgcolor: 'lightgrey', mt: '4px' }} />

                                            <Grid container sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', p: '10px' }}>
                                                <Grid item xs={6}>
                                                    <Typography sx={{ fontSize: { lg: '15px', mr: '15px', sm: '13px', xs: '13px' }, fontWeight: 'bold', }}>Land Mark - </Typography>

                                                </Grid>
                                                <Grid item xs={2} >
                                                    <Typography sx={{ fontSize: { lg: '15px', mr: '15px', sm: '13px', xs: '13px' }, fontWeight: 'bold',textTransform:"capitalize", color: '#616161', textAlign: 'center' }}>{ele.delAddress.landMark}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Divider sx={{ width: '100%', bgcolor: 'lightgrey', mt: '4px' }} />

                                            <Grid container sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', p: '10px' }}>
                                                <Grid item xs={6}>
                                                    <Typography sx={{ fontSize: { lg: '15px', mr: '15px', sm: '13px', xs: '13px' }, fontWeight: 'bold', }}>State - </Typography>

                                                </Grid>
                                                <Grid item xs={2} >
                                                    <Typography sx={{ fontSize: { lg: '15px', mr: '15px', sm: '13px', xs: '13px' }, fontWeight: 'bold',textTransform:"capitalize", color: '#616161', textAlign: 'center' }}>{ele.delAddress.state}</Typography>
                                                        
                                                       
                                                    
                                                </Grid>
                                            </Grid>
                                            <Divider sx={{ width: '100%', bgcolor: 'lightgrey', mt: '4px' }} />
                                            <Grid container sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', p: '10px' }}>
                                                <Grid item xs={6}>
                                                    <Typography sx={{ fontSize: { lg: '15px', mr: '15px', sm: '13px', xs: '13px' }, fontWeight: 'bold', }}>PinCode - </Typography>

                                                </Grid>
                                                <Grid item xs={2} >
                                                    <Typography sx={{ fontSize: { lg: '15px', mr: '15px', sm: '13px', xs: '13px' }, fontWeight: 'bold',textTransform:"capitalize", color: '#616161', textAlign: 'center' }}>{ele.delAddress.pinCode}</Typography>
                                                        
                                                       
                                                    
                                                </Grid>
                                            </Grid>

                                            <Divider sx={{ width: '100%', bgcolor: 'lightgrey', mt: '4px' }} />
                                            <Grid container sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', p: '10px' }}>
                                                <Grid item xs={6}>
                                                    <Typography sx={{ fontSize: { lg: '15px', mr: '15px', sm: '13px', xs: '13px' }, fontWeight: 'bold', }}>Country - </Typography>

                                                </Grid>
                                                <Grid item xs={2} >
                                                    <Typography sx={{ fontSize: { lg: '15px', mr: '15px', sm: '13px', xs: '13px' }, fontWeight: 'bold',textTransform:"capitalize" ,color: '#616161', textAlign: 'center' }}>{ele.delAddress.country}</Typography>
                                                        
                                                       
                                                    
                                                </Grid>
                                            </Grid>

                                            <Divider sx={{ width: '100%', bgcolor: 'lightgrey', mt: '4px' }} />

            
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>

                        </AccordionDetails>
                    </Accordion>
                </Box>
            })
        }

    </Grid>
}
</Grid>
}

</Grid>
        </>
    )
}

export default page