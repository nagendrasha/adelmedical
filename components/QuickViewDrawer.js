'use client'
import { Box, Button, Drawer, Grid, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import PinterestIcon from '@mui/icons-material/Pinterest';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import product1 from '../med/WhatsApp Image 2024-01-05 at 13.14.26.jpeg'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';




const iconList = [
    {
        icon:<TwitterIcon sx={{ color: '#9e9e9e', fontSize: '18px', mr: '10px', ml: '5px',cursor:'pointer', '&:hover':{color:'black'} }}/>,
    },
    {
        icon:<FacebookOutlinedIcon sx={{ cursor:'pointer',color: '#9e9e9e', fontSize: {lg:'18px', md:'18px', sm:'15px', xs:'15px'}, mr: '10px', ml: '5px', '&:hover':{color:'black'} }}/>,
    },
    {
        icon:<PinterestIcon sx={{  cursor:'pointer',color: '#9e9e9e', fontSize: {lg:'18px', md:'18px', sm:'15px', xs:'15px'}, mr: '10px', ml: '5px', '&:hover':{color:'black'} }}/>,
    },
    {
        icon:<MailOutlineIcon sx={{ cursor:'pointer', color: '#9e9e9e', fontSize: {lg:'18px', md:'18px', sm:'15px', xs:'15px'}, mr: '10px', ml: '5px', '&:hover':{color:'black'} }}/>,
    },
    {
        icon:<LinkedInIcon sx={{ cursor:'pointer', color: '#9e9e9e', fontSize: {lg:'18px', md:'18px', sm:'15px', xs:'15px'}, mr: '10px', ml: '5px', '&:hover':{color:'black'} }}/>,
    },
    {
        icon:<WhatsAppIcon sx={{ cursor:'pointer', color: '#9e9e9e', fontSize: {lg:'18px', md:'18px', sm:'15px', xs:'15px'}, mr: '10px', ml: '5px','&:hover':{color:'black'} }}/>,
    },
]

const QuickViewDrawer = ({sideDraw,setSideDraw }) => {
    const router = useRouter();
    const [count, setCount] = useState(0);
    const [show, setShow] = useState(true)
    const minusHandler = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const plusHandler = () => {
        setCount(count + 1);
    };
    const closeHandler = () => {
        setSideDraw({...sideDraw,open:false})
    }

    const onMouseOverHandler=()=>{
        setShow(false);
        console.log('in ')
    }

    const onMouseOutHandler=()=>{
        setShow(true);
        console.log('out')
    }
    const handleNavigate=async()=>{
        router.push('/buynow')
    }

    return (
        <Drawer anchor={'right'} open={sideDraw.open} onClose={() => {setSideDraw({...sideDraw,open:false}) }}
           sx={{background:"unset"}}
            PaperProps={{
                sx: { width: { lg: '29%', md: '35%', sm: '45%', xs: '75%' }, margin: 'auto' }
            }}>
            <Grid container sx={{ color: 'white', p: '4px 10px', justifyContent: 'center', alignItems: 'center' }} >
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', }} >
                    <CancelIcon sx={{ color: 'black', fontSize: '35px', cursor: 'pointer' }} onClick={closeHandler} />
                </Grid>

                

              
                   <Grid item xs={12} sx={{ display:"flex",justifyContent:"center",alignItems:"center", height: {lg:'350px', md:'350px', sm:'340px', xs:'320px'}}} >
                      <Image src={product1} style={{height:"100%",width:"70%"}}/>
                    </Grid>

                {/* } */}
                
               
                <Grid item xs={12} sx={{ p: '0px  18px' }}>
                    {/* <Typography sx={{ fontSize: {lg:'19px', md:'17px', sm:'17px', xs:'16px', textAlign:'center'}, fontWeight: '700', color: 'black', mt: '20px', cursor:'pointer' }}>{data.productName || "Name"} </Typography> */}
                    <Typography sx={{ fontSize: {lg:'19px', md:'17px', sm:'17px', xs:'16px'}, textAlign:'center', fontWeight: '900', color: '#00897b', mt: '20px', cursor:'pointer' }}>Amlodipine</Typography>

                    {/* <Typography sx={{ mt: '10px', fontSize:{ lg:'17px', md:'15px', sm:'14px', xs:'14px'} }}><del style={{ color: '#9e9e9e', }}>{data.orgPrice}</del> <span style={{ color: 'black', marginLeft: '5px' }}>{data.discPrice || "name"}</span> </Typography> */}
                    <Typography sx={{ mt: '10px', fontSize:{ lg:'17px', md:'15px', sm:'14px', xs:'14px'} }}><del style={{ color: '#9e9e9e', }}>400</del> <span style={{ color: 'black', marginLeft: '5px' }}>500</span> </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                        <RemoveRedEyeOutlinedIcon sx={{ fontSize: {lg:'18px', md:'18px', sm:'16px', xs:'15px'}, color: '#00897b' }} />
                        <Typography sx={{ fontSize:{ lg:'14px', md:'14px', sm:'13px', xs:'13px'}, color: '#00897b', ml: '5px' }}> 38 people are viewing this product right now</Typography>
                    </Box>

                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: '13px  18px 6px 18px' }}>

                    <Box sx={{ width: { lg: '30%', md: '35%', sm: '35%', xs: '35%' }, display: 'flex', justifyContent: 'left', alignItems: 'center', }}>
                        <Box onClick={minusHandler} sx={{ cursor: 'pointer', width: { lg: '30px', md: '30px', sm: '30px', xs: '100px' }, height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2px', border: '1px solid #bdbdbd' }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: '900', color: '#bdbdbd' }}>-</Typography>

                        </Box>
                        <Box sx={{ width: { lg: '33px', md: '35px', sm: '30px', xs: '100px' }, height: '30px', border: '1px solid #bdbdbd', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2px' }}>
                            <Typography sx={{ fontSize: '13px', color: '#212121' }}>{count}</Typography>
                        </Box>
                        <Box onClick={plusHandler} sx={{ cursor: 'pointer', width: { lg: '30px', md: '30px', sm: '30px', xs: '100px' }, height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2px', border: '1px solid #bdbdbd' }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: '900', color: '#bdbdbd' }}>+</Typography>
                        </Box>
                    </Box>
                    {/* <Box sx={{cursor:'pointer', width: {lg:'50%', md:'50%', sm:'66%', xs:'200px'}, bgcolor: '#00897b', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '38px', ml: '20px', }}>
                        <ShoppingBagOutlinedIcon sx={{ fontSize:{ lg:'14px', md:'13px', sm:'12px', xs:'11px'}, mb: '3px' }} />
                        <Typography sx={{ fontSize:{ lg:'12px', md:'12px', sm:'11px', xs:'10px'} }}>SELECT OPTIONS</Typography>
                    </Box> */}
                </Grid>
                {/* <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: '0px 18px' }}>
                    <Box sx={{ width: '45%', bgcolor: '#00897b', height: '1px' }}></Box>
                    <Box sx={{ width: '6%', }}><Typography sx={{ color: '#bdbdbd',fontSize: '15px' }}>OR</Typography></Box>
                    <Box sx={{ width: '45%', bgcolor: '#00897b', height: '1px' }}></Box>
                </Grid> */}
                <Grid item xs={12} sx={{ p: '0px 18px' }}>
                    <Button variant='contained' fullWidth sx={{ cursor:'pointer', bgcolor: '#00897b', color: 'white','&:hover':{bgcolor:'#00897b'}, display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={handleNavigate}>
                        <ShoppingBagOutlinedIcon sx={{ fontSize: '14px', mb: '3px' }} />
                        Buy Now
                    </Button>
                </Grid>

                <Grid container sx={{ p: '0px 18px', mt: '13px' }}>

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', }}>
                        <FavoriteBorderOutlinedIcon sx={{ fontSize: '15px', color: 'black', cursor:'pointer' }} />
                        <Typography sx={{ fontSize: '13px', color: 'black', textTransform: 'uppercase', ml: '5px' }}>add to wishlist</Typography>
                    </Grid>

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', mt: '8px' }}>
                        <Typography sx={{ fontSize: '14px', color: 'black', }}>Category: </Typography>
                        <Typography sx={{ fontSize: '14px', color: '#9e9e9e', ml: '5px', '&:hover':{color:'black'}, cursor:'pointer' }}>Couple Shirts</Typography>
                    </Grid>

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', mt: '8px' }}>
                        <Typography sx={{ fontSize: '14px', color: 'black', }}>Share: </Typography>
                        <Box>
                            {
                              iconList.map((ele)=>{
                                return ele.icon
                              })  
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Accordion elevation={0}>
                            <AccordionSummary
                                sx={{justifyContent:'left', p:'0px'}}
                                expandIcon={<ExpandMoreIcon />}>
                                <Typography sx={{textTransform:'uppercase', color:'black',fontSize:{lg:'15px', md:'15px', sm:'15px', xs:'14px'}}}>more details</Typography>
                            </AccordionSummary>

                            <AccordionDetails sx={{p:'0px'}}>
                                <Typography sx={{fontSize:{lg:'17px', md:'17px', sm:'15px', xs:'14px'}, fontWeight:'700'}}>MATERIAL</Typography>
                                <Typography sx={{mt:'10px', fontSize:'14px'}}>
                                   Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                                </Typography>
                            </AccordionDetails>

                            <AccordionDetails sx={{p:'0px', mt:'10px'}}>
                                <Typography sx={{fontSize:{lg:'17px', md:'17px', sm:'15px', xs:'14px'}, fontWeight:'700'}}>BENEFITS </Typography>
                                <Typography sx={{mt:'10px', fontSize:'14px'}}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                                </Typography>
                            </AccordionDetails>

                            <AccordionDetails sx={{p:'0px', mt:'10px'}}>
                                <Typography sx={{fontSize:{lg:'17px', md:'17px', sm:'15px', xs:'14px'}, fontWeight:'700'}}>MEDICINE DETAILS</Typography>
                                <Typography sx={{mt:'10px', fontSize:'14px'}}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                                </Typography>
                                <Typography sx={{mt:'10px'}}><a href='' style={{fontSize:'15px', color:'black', }} onClick={()=>{router.push('productinnerpage')}}>Show full details</a></Typography>
                            </AccordionDetails>

                        </Accordion>
                    </Grid>
                </Grid>
            </Grid>

        </Drawer>
    )
}

export default QuickViewDrawer