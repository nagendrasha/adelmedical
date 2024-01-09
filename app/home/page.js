'use client'

import StarIcon from '@mui/icons-material/Star'
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined'
import { Badge, Box, Button, Container, Divider, Grid, Icon, IconButton, Paper, Skeleton, Typography } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import hero1 from '../../assests/hero3.jpg'
import hero2 from '../../assests/b2.jpg'
import hero3 from '../../assests/b3.jpg'
import hero4 from '../../assests/b5.jpg'
import blink from '../styles/blink.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MainHeader from '@/components/MainHeader'
import dotBack from '../../assests/dot.png'
import rightback from '../../assests/rightback.webp'
import RestroCard from '@/components/RestroCard'
import RestroSkeletonCard from '@/components/RestroCardSkeleton'
import Footer from '@/components/Footer'
const HomePage = () => {
    const router = useRouter();
    const [shopData, setShopData] = useState([]);
    const [popularShop, setPopularShop] = useState([]);
    const [nonPopularShop, setNonPopularShop] = useState([]);
    const [activeOrder, setActiveOrder] = useState([]);
    const [shopControl, setShopControl] = useState({ noData: false, noInternet: false, loader: true });
    const arr = new Array(4).fill(1);
    const images = [{ silde: hero2, caption: "Slide 1" }, { silde: hero3, caption: "Slide 2" }, { silde: hero1, caption: "Slide 3" }, { silde: hero2, caption: "Slide 1" }, { silde: hero4, caption: "Slide 4" }];
    const properties = { duration: 2000, transitionDuration: 200, infinite: true, arrows: true, };



    const fetchApi = async () => {
        try {
            const fetchedData = await axios.get('/api/shop');
            if (fetchedData.data.message == 'All Data Fetched'){
                setShopData(fetchedData.data.resp);
                const popular = fetchedData.data.resp.filter((ele) => { return ele.isPopular == true });
                const nonPopular = fetchedData.data.resp.filter((ele) => { return ele.isPopular == false });
                setNonPopularShop(popular);
                setPopularShop(nonPopular);
                setCardsControl({ noData: false, noInternet: false, loader: false });
            }
            if(fetchedData.data.message == 'No Data Found'){
                setCardsControl({ noData: true, noInternet: false, loader: false });
            }
        }catch(err){console.log(err)}
    };

    const fetchActiveOrder = async () => {
        try {
            const uid = JSON.parse(localStorage.getItem('UID')); const respData = await axios.get(`/api/billing/${uid}`)
            if (respData.data.message == 'Successfull') { setActiveOrder(respData.data.resp) }
        }
        catch (err) {
            console.log(err.message)
        }
    }


    const handleNavigateMenuPage = id => router.push(`/menu/${id}`);


    useEffect(() => {
        if (localStorage.getItem('UID')) { fetchActiveOrder() };
        fetchApi();
    }, [])

    return (
        <>
            <MainHeader />
            <Container maxWidth={'xl'} disableGutters>
                <Grid container sx={{ pb: "20px" }}>

                  

                    {/* banner area */}
                    <Grid container justifyContent={"center"} sx={{ backgroundColor: "black" }}>
                        <Grid item xs={12} sm={12} md={10} lg={10} sx={{ p: "20px" }}>
                            <Grid container sx={{ justifyContent: "center", alignItems: "center" }} wrap='wrap-reverse'>
                                <Grid item xs={12} sm={12} md={6} lg={6} sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Box sx={{ height: "fit-content" }}>
                                        <Typography align='left' sx={{ color: "white" }}>Find Your Favourite Restaurant</Typography>
                                        <Typography align='left' sx={{ color: "white", display: { xs: "none", sm: "none", md: "block", lg: "block" }, fontSize: { lg: "60px", md: "50px", sm: "40px", xs: "30px" }, fontWeight: "bold" }}>Multi Restaurant <br /><span style={{ color: "#00c853" }}>Online Food <br />Delivery </span>App</Typography>
                                        <Typography align='left' sx={{ color: "white", display: { xs: "block", sm: "block", md: "none", lg: "none" }, fontSize: { lg: "60px", md: "50px", sm: "40px", xs: "30px" }, fontWeight: "bold" }}>Multi Restaurant<span style={{ color: "#00c853" }}>Online FoodDelivery </span>App</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={8} md={6} lg={6} sx={{ height: { lg: "500px", md: "400px", sm: "400px", xs: "300px" } }} >
                                    <Box sx={{ height: "100%", width: { xs: "100%", sm: "100%", md: "100%", xs: "100%" }, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Image src={rightback} alt='right' style={{ height: "100%", width: "80%", position: "absolute" }} />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* popular items */}
                    {
                        <Grid item xs={12} sx={{ mb: "20px"}}>
                            <Grid container sx={{ justifyContent: "center" }}>
                                <Grid item xs={12} sx={{ backgroundcolor: "#388e3c", mb: "10px", p: { lg: "8px", md: "8px", sm: "8px", xs: "7px" } }}>
                                    <Typography align='center' sx={{ fontSize: { lg: "30px", md: "30px", sm: "22px", xs: "18px" }, color: "white", fontWeight: "800" }}>
                                        Popular Shops
                                    </Typography>
                                </Grid>
                                {
                                    shopData.length == 0
                                        ?
                                        <Grid container sx={{ justifyContent: "space-around" }}>
                                            {
                                                arr.map((ele, index) => {
                                                    return <RestroSkeletonCard key={index} />
                                                })
                                            }
                                        </Grid>
                                        :
                                        <Grid container sx={{ justifyContent: "center" }}>
                                            {
                                                nonPopularShop.map((ele, index) => {
                                                    return <RestroCard ele={ele} key={index} handleNavigateMenuPage={handleNavigateMenuPage} />

                                                })
                                            }
                                        </Grid>
                                }
                            </Grid>
                            <Divider sx={{ mt: "40px" }} />
                        </Grid>
                    }
                    {/*All shops */}
                    <Grid item xs={12} sx={{ mb: "20px" }}>
                        <Grid container sx={{ justifyContent: "center" }}>
                            <Grid item xs={12} sx={{ bgcolor: "#388e3c", mb: "10px", p: { lg: "8px", md: "8px", sm: "8px", xs: "7px" } }}>
                                <Typography align='center' sx={{ fontSize: { lg: "30px", md: "30px", sm: "25px", xs: "20px" }, color: "white", fontWeight: "800" }}>
                                    All Shops
                                </Typography>
                            </Grid>
                            {
                                shopData.length == 0
                                    ?
                                    <Grid container sx={{ justifyContent: "space-around" }}>
                                        {
                                            arr.map((ele, index) => {
                                                return <RestroSkeletonCard key={index} />
                                            })
                                        }
                                    </Grid>
                                    :
                                    <Grid container sx={{ justifyContent: "center" }}>
                                        {
                                            shopData.map((ele, index) => {
                                                return <RestroCard ele={ele} key={index} handleNavigateMenuPage={handleNavigateMenuPage} />
                                            })
                                        }
                                    </Grid>
                            }
                        </Grid>
                    </Grid>

                    {/*  non popular shops */}

                    {
                        <Grid item xs={12} sx={{ mb: "20px"}}>
                            <Grid container sx={{ justifyContent: "center" }}>
                                <Grid item xs={12} sx={{ bgcolor: "#388e3c", mb: "10px", p: { lg: "8px", md: "8px", sm: "8px", xs: "7px" } }}>
                                    <Typography align='center' sx={{ fontSize: { lg: "30px", md: "30px", sm: "22px", xs: "18px" }, color: "white", fontWeight: "800" }}>
                                        Non Popular Shops
                                    </Typography>
                                </Grid>
                                {
                                    shopData.length == 0
                                        ?
                                        <Grid container sx={{ justifyContent: "space-around" }}>
                                            {
                                                arr.map((ele, index) => {
                                                    return <RestroSkeletonCard key={index} />
                                                })
                                            }
                                        </Grid>
                                        :
                                        <Grid container sx={{ justifyContent: "center" }}>
                                            {
                                                popularShop.map((ele, index) => {
                                                    return <RestroCard key={index} ele={ele} handleNavigateMenuPage={handleNavigateMenuPage} />
                                                })
                                            }
                                        </Grid>
                                }
                            </Grid>
                        </Grid>
                    }
                    <Grid container justifyContent={'center'} sx={{ height: "650px", bgcolor: "#002D43" }}>

                        <Grid container justifyContent={'center'}>
                            <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Box sx={{ height: "fit-content" }}>
                                    <Typography align='center' variant='h4' sx={{ color: "white", fontWeight: "bold" }}>Multi Restaurant <span style={{ color: "#00c853" }}> Online Food Delivery </span>App</Typography>
                                    <Typography align='center' variant='h6' sx={{ color: "white", mt: "10px", fontSize: "14px" }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        <Grid item xs={8} sx={{}}>
                            <Box sx={{ mb: "40px", width: "100%", borderRadius: "20px", overflow: "hidden" }}>
                                <Slide {...properties} >
                                    {
                                        images.map((ele, index) => (
                                            <Box key={index}>
                                                <Box sx={{ backgroundImage: `url(${ele.silde.src})`, display: "flex", alignItems: "center", justifyContent: "center", height: { lg: "400px", md: "400px", sm: "400px", xs: "200px" }, backgroundSize: "100% 100%" }}>

                                                </Box>
                                            </Box>
                                        ))
                                    }
                                </Slide>
                            </Box>
                        </Grid>
                    </Grid>


                </Grid>
                {
                    activeOrder.length > 0 && <Paper elevation={20} sx={{ position: "fixed", bottom: "30%", left: "0px", zIndex: 99, cursor: "pointer", height: "60px", width: "70px", bgcolor: "#ef5350", borderRadius: "0px 20px 20px 0px", }} onClick={() => { router.push('/myorders') }}>
                        <Badge anchorOrigin={{ vertical: 'top', horizontal: 'right', }} color="success" overlap="circular" sx={{ height: "100%", width: "100%", mt: "-5px" }} badgeContent={activeOrder.length}>
                            <Box sx={{ userSelect: "none", alignItems: "center", display: "flex", justifyContent: "center", height: "100%", width: "100%" }}>
                                <Typography align='center' sx={{ color: "white", fontWeight: 'bold', fontSize: "17px", lineHeight: "20px" }}>Active Orders</Typography>
                            </Box>
                        </Badge>
                    </Paper>
                }
            </Container>

            <Footer />
        </>
    )
}

export default HomePage
