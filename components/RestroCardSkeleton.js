// SkeletonCard.js
import React from 'react';
import { Grid, Box, Skeleton } from '@mui/material';

const RestroSkeletonCard = () => {
    return (
        <Grid item lg={2.3} md={4} sm={6} xs={12} sx={{ mt: "20px", overflow: "hidden", borderRadius: "20px 20px 8px 8px" }}>
            <Box style={{ width: "100%" }}>
                <Skeleton sx={{ marginTop: -10, marginBottom: -7, height: 380, width: "100%" }} />
            </Box>
            <Box sx={{ p: "10px 10px 3px 10px" }}>
                <Skeleton variant='text' sx={{ fontSize: "17px" }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: "10px" }}>
                    <Box>
                        <Skeleton variant='text' sx={{ fontSize: "17px", width: "30px" }} />
                    </Box>
                    <Box>
                        <Skeleton variant='text' sx={{ fontSize: "17px", width: "30px" }} />
                    </Box>
                </Box>
                <Box sx={{ mt: "10px" }}>
                    <Skeleton variant='text' sx={{ fontSize: "17px", width: "50%" }} />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: "10px", width: "100%" }}>
                    <Box sx={{ width: "30%" }}>
                        <Skeleton variant='text' sx={{ fontSize: "17px", width: "100%" }} />
                    </Box>
                    <Box sx={{ width: "30%" }}>
                        <Skeleton variant='text' sx={{ fontSize: "17px", width: "100%" }} />
                    </Box>
                </Box>
            </Box>
        </Grid>
    );
};

export default RestroSkeletonCard;
