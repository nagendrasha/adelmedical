'use client'
import Footer from '@/components/Footer'
import MainHeader from '@/components/MainHeader'
import RestroCard from '@/components/RestroCard'
import RestroSkeletonCard from '@/components/RestroCardSkeleton'
import { Box, Container, Divider, Grid, Typography } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import medb1 from '../../assests/1.png'
import medb2 from '../../assests/2.png'
import banner from '../../assests/banner.png'
import med1 from '../../med/WhatsApp Image 2024-01-05 at 13.14.26.jpeg'
import med2 from '../../med/WhatsApp Image 2024-01-05 at 13.14.27 (1).jpeg'
import med3 from '../../med/WhatsApp Image 2024-01-05 at 13.14.27.jpeg'
import med4 from '../../med/WhatsApp Image 2024-01-05 at 13.14.30.jpeg'
import med5 from '../../med/WhatsApp Image 2024-01-05 at 13.14.31.jpeg'
import med6 from '../../med/WhatsApp Image 2024-01-05 at 13.14.33 (1).jpeg'
import med7 from '../../med/WhatsApp Image 2024-01-05 at 13.14.33.jpeg'
import med8 from '../../med/WhatsApp Image 2024-01-05 at 13.14.34 (1).jpeg'
import med9 from '../../med/WhatsApp Image 2024-01-05 at 13.14.34.jpeg'
import med10 from '../../med/WhatsApp Image 2024-01-05 at 13.14.36 (1).jpeg'
import med11 from '../../med/WhatsApp Image 2024-01-05 at 13.14.36 (2).jpeg'
import med12 from '../../med/WhatsApp Image 2024-01-05 at 13.14.36.jpeg'
import med13 from '../../med/WhatsApp Image 2024-01-05 at 13.14.37 (1).jpeg'
import med14 from '../../med/WhatsApp Image 2024-01-05 at 13.14.37.jpeg'
import med15 from '../../med/WhatsApp Image 2024-01-05 at 13.14.38 (1).jpeg'
import med16 from '../../med/WhatsApp Image 2024-01-05 at 13.14.39 (1).jpeg'


const NewHome = () => {
    const router = useRouter();
    const [shopData, setShopData] = useState([]);
    const [sideDraw,setSideDraw]=useState({
        open:false,
        data:{}
    })
    const arr = new Array(4).fill(1);
    const images = [{ silde: medb1, caption: "Slide 1" }, { silde: medb2, caption: "Slide 2" }];
    const properties = { duration: 2000, transitionDuration: 200, infinite: true, arrows: true, };
    const medData=[
        {image:med1,shopName: "Med Data"},
        {image:med2,shopName: "Ibuprofen"},
        {image:med3,shopName: "Aspirin"},
        {image:med4,shopName: "Amoxicillin"},
        {image:med5,shopName: "Omeprazole"},
        {image:med6,shopName: "Metformin"},
        {image:med7,shopName: "Atorvastatin"},
        {image:med8,shopName: "Ciprofloxacin"},
        {image:med9,shopName: "Prednisone"},
        {image:med10,shopName: "Amlodipine"},
        {image:med11,shopName: "Levothyroxine"},
        {image:med12,shopName: "Ranitidine"},
        {image:med13,shopName: "Diazepam"},
        {image:med14,shopName: "Loratadine"},
        {image:med15,shopName: "Losartan"},
        {image:med16,shopName: "Warfarin"}]


    console.log("shopData",shopData)


    return (
        <>
            <MainHeader />
            <Container maxWidth={'xl'} disableGutters>
                <Grid container sx={{ pb: "20px" }}>

                  

                    {/* banner area */}
                    {/* <Grid container justifyContent={"center"} sx={{ backgroundColor: "black" }}>
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
                    </Grid> */}
                    
                            <Grid container sx={{ justifyContent: "center",height:{lg:"750px",md:"550px",sm:"400px",xs:"250px"},width:"1728px",backgroundImage:`url(${banner.src})`,backgroundRepeat:"no-repeat",backgroundSize:"100% 100%", alignItems: "center" }} wrap='wrap-reverse'>
                                
                            </Grid>
                    {/* popular items */}
                    {
                        <Grid item xs={12} sx={{ mb: "20px"}}>
                            <Grid container sx={{ justifyContent: "center" }}>
                                <Grid item xs={12} sx={{ bgcolor: "#00897b", mb: "10px", p: { lg: "8px", md: "8px", sm: "8px", xs: "7px" } }}>
                                    <Typography align='center' sx={{ fontSize: { lg: "30px", md: "30px", sm: "22px", xs: "18px" }, color: "white", fontWeight: "800" }}>
                                    All Prodcuts
                                    </Typography>
                                </Grid>
                                {
                                    medData.length == 0
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
                                                medData.map((ele, index) => {
                                                    return <RestroCard ele={ele} key={index} sideDraw={sideDraw} setSideDraw={setSideDraw}/>

                                                })
                                            }
                                        </Grid>
                                }
                            </Grid>
                            <Divider sx={{ mt: "40px" }} />
                        </Grid>
                    }
            
                    <Grid container justifyContent={'center'} sx={{ bgcolor: "#002D43",p:"10px" }}>

                        <Grid container justifyContent={'center'}>
                            <Grid item xs={12} sm={12} md={6} lg={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Box sx={{ height: "fit-content" }}>
                                    <Typography align='center' variant='h4' sx={{ color: "white", fontWeight: "bold" }}>Online<span style={{ color: "#00c853" }}> Medicine Delivery </span>App</Typography>
                                    <Typography align='center' variant='h6' sx={{ color: "white", mt: "10px", fontSize: "14px" }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        <Grid item xs={11.5} sm={8} md={8} lg={8} sx={{mt:"20px"}}>
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
            </Container>

            <Footer/>
        </>
    )
}

export default NewHome
