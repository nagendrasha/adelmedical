'use client'
import AddNewAddress from '@/components/AddNewAddress';
import Header from '@/components/Header';
import SnackBarCustom from '@/components/SnackBarCustom';
import SnackBarCustomError from '@/components/SnackBarCustomError';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, Button, CircularProgress, FormControl, FormControlLabel, Grid, IconButton, Paper, Radio, RadioGroup, Skeleton, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const UserAddress = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [showData, setShowdata] = useState([]);
    const [checker, setChecker] = useState(false)
    const [addressState, setAddressState] = useState('')
    const [customSnack, setCustomSnack] = useState({ open: false, message: "", deleteLoader: '', nextBtn: false });
    const [errorSnack, setErrorSnack] = useState({open:false,message:""})

    const arr = new Array(2).fill(1)


    const fetchData = async () => {

        const uid = JSON.parse(localStorage.getItem('UID'));
        try {
            console.log(uid)
            const respData = await axios.get(`/api/useraddress/${uid}`);
            // console.log("response check",respData.data.message)
            if (respData.data.message == "Fetched Successfully") {
                setShowdata(respData.data.resp);
                setChecker(false)
                console.log("response data", respData);
            }
            if (respData.data.message == 'No Data found') {
                setChecker(true)
                console.log("response", respData.data.resp)
            }

        }
        catch (err) {
            alert(err)
        }
    }


    useEffect(() => {
        fetchData();
    }, [])


    const navigateHandler = () => {
        setCustomSnack({ ...customSnack, nextBtn: true })
        const uid = JSON.parse(localStorage.getItem('UID'))
        // router.push(`/billing/${uid}`)
        if (addressState != "") {
            router.push(`/billing/${addressState}/${uid}`);
        }
        else {
            alert("Please Select Any Address")
        }
    }

    const addressDeleteHandler = async (id) => {
        setCustomSnack({ ...customSnack, deleteLoader: id })
        // console.log(customSnack)
        try {
            const respData = await axios.delete(`/api/removeuseraddress/${id}`)
            if (respData.data.message == "Address Removed Successfully") {
                setCustomSnack({ ...customSnack, open: true, message: respData.data.message, deleteLoader: '' })
                fetchData();
            }
            else {
                setCustomSnack({ ...customSnack, open: true, message: respData.data.message, deleteLoader: '' })
            }
        }
        catch (err) {
            // console.log(err);
            alert(err)
        }
    }

    console.log(customSnack)

    return (
        <>
            <Grid container >
                <Grid container justifyContent={"space-between"} alignItems={"center"} sx={{ height: "70px", bgcolor: "#37474f" }}>
                    <Grid item xs={12}>
                        <Typography align='center' sx={{ color: "white", fontSize: "20px", fontWeight: "600", cursor: "pointer", userSelect: "none" }}>User Address</Typography>
                    </Grid>

                </Grid>
                <Grid container sx={{ display: 'flex', pb: "10px", justifyContent: 'center', alignItems: 'center', mt: '0px', overflow: 'hidden' }}>
                    <Grid item lg={5} md={6} sm={8} xs={11} >
                        <Paper sx={{ borderRadius: '10px 10px 10px 10px', mt: '40px' }}>
                            <Grid container sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Grid item xs={12} sx={{ bgcolor: '#212121', padding: '8px', textAlign: 'center', borderRadius: '11px 11px 0px 0px' }}>
                                    <Typography sx={{ color: 'White', fontSize: { lg: '25px', md: '23px', sm: '20px', xs: '18px' }, fontWeight: 'bold' }}>Address</Typography>
                                </Grid>


                                <Grid item xs={12} sx={{ height: "100px", display: checker ? "flex" : "none", alignItems: "center", justifyContent: "center" }}>
                                    <Typography sx={{ color: "#bdbdbd" }}>No Address Added</Typography>
                                </Grid>

                                <Grid container sx={{ display: !checker ? "block" : "none" }}>
                                    {
                                        showData.length == 0
                                            ?
                                            <Grid container sx={{ justifyContent: "space-around" }}>
                                                {
                                                    arr.map((ele, index) => {
                                                        return <Grid item key={index} lg={12} sx={{ mt: "20px", overflow: "hidden", bgcolor: "#eeeeee" }}>

                                                            <Box sx={{ width: "100%", p: "10px" }}>
                                                                <Box sx={{ mt: "10px", width: "100%", mb: "10px" }}>
                                                                    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                                                        <Skeleton variant='text' sx={{ fontSize: "17px", width: "60%", height: "20px" }} />
                                                                        <Skeleton variant='text' sx={{ fontSize: "17px", height: "50px", width: "20px", mr: "50px" }} />
                                                                    </Box>
                                                                    <Skeleton variant='text' sx={{ fontSize: "17px", width: "60%", mt: "-30px" }} />
                                                                    <Skeleton variant='text' sx={{ fontSize: "17px", width: "60%" }} />
                                                                    <Skeleton variant='text' sx={{ fontSize: "17px", width: "60%" }} />
                                                                    <Skeleton variant='text' sx={{ fontSize: "17px", width: "60%" }} />
                                                                </Box>
                                                            </Box>
                                                        </Grid>
                                                    })
                                                }
                                            </Grid>
                                            :
                                            <Grid container>
                                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                                    <FormControl sx={{ width: "100%", p: "10px" }}>
                                                        <RadioGroup aria-labelledby="demo-radio-buttons-group-label" value={addressState} onChange={(e) => { setAddressState(e.target.value) }} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            {showData.map((ele) => (
                                                                <Paper key={ele.address} elevation={1} sx={{ width: "95%", mt: "20px", p: "10px" }}>
                                                                    <Grid container>
                                                                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', p: "10px" }}>
                                                                            <FormControlLabel
                                                                                value={ele._id}
                                                                                control={<Radio color='success' sx={{ p: "0px", mr: "20px" }} />}
                                                                                label={
                                                                                    <Box>
                                                                                        <Typography sx={{ fontSize: "18px", fontWeight: 600, textTransform: "uppercase" }}>{ele.receiverName}</Typography>
                                                                                        <Typography sx={{ textTransform: "capitalize" }}>{ele.address}</Typography>
                                                                                        <Typography sx={{ textTransform: "capitalize" }}>{ele.landMark}</Typography>
                                                                                        <Typography sx={{ textTransform: "uppercase" }}>{ele.state}-{ele.pinCode}</Typography>
                                                                                        <Typography sx={{ textTransform: "capitalize" }}>{ele.country}</Typography>
                                                                                        <Typography sx={{ textTransform: "capitalize" }}>{ele.mobile}</Typography>
                                                                                    </Box>
                                                                                }
                                                                            />
                                                                            <Box>
                                                                                {
                                                                                    customSnack.deleteLoader == ele._id ?
                                                                                        <CircularProgress size={20} sx={{ mr: "10px", mt: "8px" }} />
                                                                                        :
                                                                                        <IconButton sx={{ height: "fit-content", width: "fit-content" }} onClick={() => { addressDeleteHandler(ele._id) }}>
                                                                                            <DeleteForeverIcon sx={{ color: 'red', fontSize: "30px" }} />
                                                                                        </IconButton>
                                                                                }
                                                                            </Box>

                                                                        </Grid>
                                                                    </Grid>
                                                                </Paper>
                                                            ))}
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid>

                                            </Grid>
                                    }
                                </Grid>

                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: "10px" }}>
                                    {
                                        showData.length == 0 && !checker
                                            ?
                                            <Skeleton variant='rectangular' sx={{height:"40px",width:"30%"}}/>
                                            :
                                      <Button variant='contained' onClick={() => { setOpen(true) }}>Add New Address</Button>
                                  }
                                    <AddNewAddress open={open} setOpen={setOpen} fetchData={fetchData} customSnack={customSnack} setCustomSnack={setCustomSnack} />
                                </Grid>



                            </Grid>
                        </Paper>

                    </Grid>

                </Grid>


            </Grid>
            {
                addressState != '' &&
                <Button variant='contained' sx={{ position: 'fixed', right: 40, bottom: 20, fontSize: '16px', color: 'white', bgcolor: 'green', fontWeight: "600", '&:hover': { bgcolor: "green" } }} disabled={customSnack.nextBtn} onClick={navigateHandler}>{customSnack.nextBtn ? 'Wait...' : 'Proceed'}</Button>
            }

            <SnackBarCustom customSnack={customSnack} setCustomSnack={setCustomSnack} />
            <SnackBarCustomError errorSnack={errorSnack} setErrorSnack={setErrorSnack}/>
        </>
    )
}

export default UserAddress