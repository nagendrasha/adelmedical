'use client'
import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import food1 from '../assests/food1.jpg'
import food2 from '../assests/food2.jpg'
import food3 from '../assests/food3.jpg'
import food4 from '../assests/food4.jpg'

import './master.css';


const imgArr = [
  {img: food1,id:1},
  {img: food2,id:2},
  {img: food3,id:3},
  {img: food4,id:4}
]

const NewCrousel = () => {
  
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1300);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // console.log('hellonjdnjn', activeSlideIndex)
  return (
    <>
      <Grid container>
        <Grid item xs={12} >
          <ReactSimplyCarousel activeSlideIndex={activeSlideIndex} onRequestChange={setActiveSlideIndex} itemsToShow={1} itemsToScroll={1} autoplay={true} autoplayDelay={2000}
            forwardBtnProps={{
              style: {alignSelf: 'center',background: 'black',border: 'none',borderRadius: '50%',color: 'white',cursor: 'pointer',fontSize: '20px',height: 30,lineHeight: 1,textAlign: 'center',width: 30,display: isSmallScreen ? 'none' : 'block'},
              children: <span>{`>`}</span>,
            }}
            backwardBtnProps={{
              style: {alignSelf: 'center',background: 'black',border: 'none',borderRadius: '50%',color: 'white',cursor: 'pointer',fontSize: '20px',height: 30,lineHeight: 1,textAlign: 'center',width: 30,display: isSmallScreen ? 'none' : 'block'},
              children: <span>{`<`}</span>,
            }}
            responsiveProps={[{itemsToShow: 1,itemsToScroll: 1,minWidth: 480},{itemsToShow: 3,itemsToScroll: 1,minWidth: 600,},{itemsToShow: 4,itemsToScroll: 1,minWidth: 1024}]}
            speed={300}
            easing="linear"
            centerMode>
           
            {
              imgArr.map((ele, index) => {
                return (
                  <Box key={index}  sx={{ width: { lg: 370, md: 350, sm: 250, xs: 280 }, height: { lg: 300, md: 300, sm: 250, xs: 255 },}}>
                    <Box sx={{height:"100%",m:"10px",alignSelf: 'center',p: "15px", backgroundImage: `url(${ele.img.src})`, backgroundSize: '100% 100%', backgroundColor: 'rgb(180,180,180)', backgroundBlendMode: 'multiply' }}>
                      {/* <img src={ele.img} style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '15px', backgroundColor:'rgb(170, 170, 170)', backgroundBlendMode:'multiply' }} /> */}
                    </Box>
                  </Box>
                )
              })
            }

          </ReactSimplyCarousel>
        </Grid>
      </Grid>

    </>
  )
}

export default NewCrousel
