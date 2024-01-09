'use client'
import { Box, Button, CircularProgress, Divider, Grid, Icon, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import order from '../../../assests/order.gif'
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';


const orderPlaced = () => {
    const router = useRouter();
    const params = useParams();
    const [ data, setData] = useState({})
    const [btnShow , setBtnShow]=useState({
        btn1:false,
        btn2:false
    })

    const fetchData = async () =>{
        const respData = await axios.get(`/api/orderplaced/${params.id}`)
        // console.log(respData)
        setData(...respData.data.resp)
    }

    useEffect(()=>{
        fetchData();
    },[])

    // console.log(data)
  return (
    <Grid container sx={{justifyContent:"center",alignItems:"center",height:"100dvh"}}>
        <Grid item xs={11.5} sm={10} md={7} lg={5}>
            <Paper elevation={3} sx={{p:"10px",bgcolor:"#fbfbfb"}}>
                  <Box sx={{display:"flex",justifyContent:"center"}}>
                    <Box sx={{position:"relative"}}>
                        <Image src={order} alt='order' style={{height:"200px",width:"250px"}}/>
                    </Box>
                    </Box>
                    <Box>
                        <Typography align='center' sx={{fontSize:"20px",color:"green"}}>Order Placed Successfully.</Typography>
                        <Typography align='center' sx={{fontSize:"16px",color:"#9e9e9e"}}>Order ID : <span style={{color:"black"}}> {data._id}</span></Typography>
                        <Typography align='center' sx={{fontSize:"16px",color:"#9e9e9e"}}>Order Amount : <span style={{color:"black"}}>{data.toPay} Rs</span></Typography>
                        <Typography align='center' sx={{fontSize:"16px",color:"#9e9e9e"}}>Payment Method : <span style={{color:"black"}}>{data.paymentMethod}</span></Typography>
                        <Divider sx={{mt:"15px"}}/>
                    </Box>
                    <Box>
                        <Typography align='center' sx={{overflowWrap:"break-word",fontSize:"17px",fontWeight:"600",mt:"10px"}}>
                            A comfirmation message has been sent to registered mobile no.
                        </Typography>
                    </Box>
                    <Box sx={{mb:"10px",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
                    {
                        btnShow.btn1 ?
                          <CircularProgress  size={25} sx={{m:"10px"}}/>
                          :
                          <Button variant='contained' sx={{fontSize:"17px",mt:"25px",bgcolor:"#546e7a",'&:hover':{bgcolor:"#546e7a"}}} fullWidth onClick={()=>{router.push('/myorders');setBtnShow({...btnShow,btn1:true})}}>Track order</Button>
                        
                    }
                    {
                        btnShow.btn2 ?
                          <CircularProgress  size={25} sx={{m:"10px"}}/>
                          :
                        <Button variant='contained' sx={{mt:"5px",fontSize:"17px",bgcolor:"#009688",'&:hover':{bgcolor:"#009688"}}} fullWidth onClick={()=>{router.push('/');setBtnShow({...btnShow,btn2:true})}}>back to home</Button>
                    }

                    </Box>
                
            </Paper>
        </Grid>
    </Grid>
  )
}

export default orderPlaced