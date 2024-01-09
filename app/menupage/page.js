'use client'
import Cards from '@/components/Cards';
import MainHeader from '@/components/MainHeader';
import NewCrousel from '@/components/NewCrousel';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { Box, Container, Grid, Skeleton, Typography } from '@mui/material';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import blink from '../styles/blink.module.css'


const MenuPage = () => {
    const arr = new Array(10).fill(1)
    const router = useRouter();
    const params = useParams();
    const [catData, setCatData] = useState([])
    const [productData, setProductData] = useState([])
    const [checker, setChecker] = useState(false)
    const [cartBtn, setCartBtn] = useState({open:false,data:[]});
   
  
    // console.log(params.mid)
  
    const fetchData = async () => {
      try {
        const responseData = await axios.get(`/api/products/${params.mid}`)
         console.log("reponse menu page",responseData)
        if (responseData.data.message == 'No Data Found') {
          setChecker(true)
        }
        if (responseData.data.message == 'Fetched Successfully') {
          setChecker(false)
          setCatData(responseData.data.catData);
          const newData = await responseData.data.itemData.map((ele) => { return { ...ele, qty: 0 } })
          // console.log("new data ..",newData)
          setProductData(newData)
        }
      } catch (err) {
        console.log(err)
      }
    };
  
    const fetchCartData = async () => {
      const uid = await JSON.parse(localStorage.getItem('UID'));
      try {
        const respData = await axios.get(`/api/cart/${uid}`);
        // console.log('checker data', respData)
        if (respData.data.message == 'No Data Found') {
          setCartBtn({...cartBtn,open:false})
        }
        if (respData.data.message == 'Data Fetched Successfully') {
          setCartBtn({...cartBtn,open:true,data:respData.data.resp})
        }
      }
      catch (err) {
        console.log(err);
        alert(err.message)
      }
    }
  
    useEffect(() => {
      fetchData();
      fetchCartData();
    }, []);
  
    const handleNavigateCart = () => {
      const id = JSON.parse(localStorage.getItem('UID'))
      router.push(`/checkout/${id}`)
    };
  
  return (
    <Container maxWidth={'xl'} disableGutters>
       <MainHeader/>
       <NewCrousel/>
       <Grid container justifyContent={'center'} sx={{mt:"20px",border:"1px solid red",}}>
          <Grid item xs={10} sx={{position:"sticky",top:"200px"}}>
                <Box sx={{display:"flex",justifyContent:"space-between",borderBottom:"1px solid #bdbdbd",pb:"20px"}}>
                    <Box>
                       <Typography sx={{fontSize:"20px",fontWeight:"600"}}>Category</Typography>                        
                    </Box>
                    <Box sx={{display:"flex"}}>
                        <Box sx={{border:"1px solid black",cursor:"pointer",mr:"10px",p:"3px 10px",borderRadius:"8px"}}>
                            <Typography sx={{color:"#757575",fontSize:{lg:"15px"}}}>VEG</Typography>
                        </Box>
                        <Box sx={{border:"1px solid black",p:"3px 3px 3px 10px",borderRadius:"8px"}}>
                            <Typography sx={{color:"#757575",cursor:"pointer",fontSize:{lg:"15px"},display:"flex",justifyContent:"center",alignItems:"center"}}>PRICE<KeyboardArrowDownOutlinedIcon sx={{color:"#424242",fontSize:"20px",ml:"3px"}}/></Typography>
                        </Box>
                        <Box sx={{borderRadius:"8px",ml:"10px"}}>
                            <Typography sx={{color:"black",cursor:"pointer",fontSize:{lg:"15px"},display:"flex",justifyContent:"center",alignItems:"center"}}><FilterAltOutlinedIcon sx={{color:"#424242",fontSize:"30px",mr:"1px"}}/>FILTERS</Typography>
                        </Box>
                    </Box>
                </Box>
                <Grid container sx={{mt:"10px"}}>
                    <Grid item xs={2.5} className="removescroll" sx={{ mt: "10px",height:"fit-content"}}>
                {
                catData.length == 0
                    ?
                       <Box>

                   
                        {
                            arr.map((ele, index) => {
                                return <Box key={index} sx={{ mb: "10px",  mr: "13px"}}>
                                    <Box sx={{ width: "100%", height: { lg: "70px", md: "60px", sm: "60px", xs: "60px" } }}>
                                        <Skeleton sx={{  height: "100%", width: "100%" }} />
                                    </Box>
                                </Box>
                            })
                        }
                        </Box>
                    :
                    <Box>
                  
                    {
                        catData.map((ele,index)=>{
                            return(
                                <Box key={index} sx={{p:"15px 0px",cursor:"pointer",width:"100%",pl:"15px",display:"flex"}}>
                                   <Typography  sx={{color:"#424242",fontSize:{lg:"15px"},fontWeight:"600",borderBottom:"2px solid white",pb:"2px",'&:hover':{borderBottom:"2px solid red",transform:'scale(1.1)'}}}>{ele.name}</Typography>
                                 </Box>
                            )
                        })
                    }
                    </Box>   
                }
                    </Grid>
                    <Grid item xs={9.5} sx={{border:"1px solid black",overflow:"auto",height:"80vh"}}>
                      <Cards  productData={productData} setProductData={setProductData}/>
                    </Grid>
                </Grid>
          </Grid>
       </Grid>
    </Container>
  )
}

export default MenuPage