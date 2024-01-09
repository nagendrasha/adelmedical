'use client'
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, Grid, Icon, Modal, Paper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import profile from '../assests/profile.avif';
import { useEffect, useState } from 'react';
import axios from 'axios';





const EditUserDetails = ({ editUserOpen, setEditUserOpen, fetchData, setCustomSnack, customSnack }) => {

    const [inputData, setInputData] = useState({
        fullName: "",
        mobile: "",
        email: "",
        isActive: false
    })

    // console.log("user Details", userData)
    const [loader, setLoader] = useState({ loading: false, isDisabled: true })

    const handleClose = () => {
        setEditUserOpen({ ...editUserOpen, open: false });
    };

    const handleCollect = (e) => {
        const { name, value } = e.target;
        const isChecked = e.target.checked

        if (name == 'isActive') {
            setInputData({ ...inputData, [name]: e.target.checked });
        } else {
            setInputData({ ...inputData, [name]: value });
        }

        if (value != editUserOpen.details[name] && isChecked != editUserOpen.details[name]) {
            setLoader({ ...loader, isDisabled: false });
        } else {
            setLoader({ ...loader, isDisabled: true });
        }
    };



    useEffect(() => {
        // console.log("user Details", editUserOpen.details)
        setInputData({ ...inputData, fullName: editUserOpen.details.fullName, mobile: editUserOpen.details.mobile, email: editUserOpen.details.email, isActive: editUserOpen.details.isActive })
    }, [editUserOpen.details])


    const handleSubmit = async () => {
        setLoader({ ...loader, loading: true })
        try {
            if (inputData.fullName != '' && inputData.mobile != '' && inputData.email != '') {
                const respData = await axios.patch(`/api/edituserdetails/${editUserOpen.details._id}`, { fullName: inputData.fullName, mobile: inputData.mobile, email: inputData.email, isActive: inputData.isActive })

                if (respData.data.message == "Details Edited Successfully") {
                    setCustomSnack({ ...customSnack, open: true, message: respData.data.message })
                    fetchData();
                    setEditUserOpen({ ...editUserOpen, open: false })
                    setLoader({ ...loader, isDisabled: true, loading: false })
                }

                if (respData.data.message == "Failed To Edit Details") {
                    alert(respData.data.message)
                    setLoader({ ...loader, isDisabled: true, loading: false })
                }

            }
            else {
                alert('Please Fill The Data Properly')
            }
        }
        catch (err) {
            console.log(err);
            alert(err.message)
        }

    }

    // console.log("input Data", editUserOpen)


    return (
        <>
            <Modal open={editUserOpen.open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, bgcolor: 'white', p: 4, bgcolor: "white" }}>
                    <Box sx={{ marginTop: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                        <Typography component="h1" variant="h5" sx={{ mt: "20px" }}>
                            User Profile
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                            <Grid container spacing={2} >
                            all textfield giving error on build time
                                <Grid item xs={12} >
                                    <TextField name="fullName" required fullWidth value={inputData.fullName || ''} onChange={handleCollect} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField required fullWidth name="email" value={inputData.email || ''} onChange={handleCollect} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField required fullWidth name="mobile" value={inputData.mobile || ''} onChange={handleCollect} />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormGroup sx={{ p: "0px", all: "unset" }}>
                                        <FormControlLabel name='isActive'  control={<Checkbox checked={inputData.isActive || false} onChange={handleCollect} />} />
                                    </FormGroup>
                                </Grid>




                            </Grid>
                            {
                                !loader.loading ? <Button type="submit" disabled={loader.isDisabled} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>
                                    Submit
                                </Button>
                                    :
                                    <Box sx={{ display: "flex", justifyContent: "center", mt: "20px" }}>

                                        <CircularProgress color="inherit" size="1.5rem" />

                                    </Box>

                            }

                        </Box>
                    </Box>
                </Paper>
            </Modal>
        </>
    )
}

export default EditUserDetails

