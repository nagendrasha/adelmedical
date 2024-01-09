'use client'
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, Grid, InputBase, InputLabel, MenuItem, OutlinedInput, Paper, Select } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { lg: 550, md: 550, sm: 450, xs: 400 },
    borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center'


};


const ChangeOrderStatus = ({ open, setOpen ,orderdetail,fetchData}) => {
    const [orderStatus, setOrderStatus] = useState([])
    const [selectedStatus, setSelectedStatus] = useState('');

console.log("hello gthisdc",orderdetail)
    const handleClose = () => setOpen(false);
    const crossHandler = () => {
        setOpen(false)
    }

    const fetchOrderStatus = async () => {
        const responseData = await axios.get('/api/orderstatus')
        setOrderStatus(responseData.data.resp)
        // console.log("orderstatus",responseData)
    }



    const handleChange = (event) => {
        setSelectedStatus(event.target.value);
      };

    const handleEdit = async() =>{
         try{
            const respData = await axios.patch(`/api/orderstatus/${orderdetail._id}`,{orderStatus:selectedStatus})
            if(respData.data.message == 'Order Status Successfully Updated'){
                setOpen(false);
                fetchData();
            }
         }
         catch(err){
            alert(err.message);
            console.log(err.message)
         }

    }
    

    useEffect(() => {
        setSelectedStatus(orderdetail.orderStatus)
        fetchOrderStatus()
    }, [orderdetail.orderStatus])

    // console.log(orderStatus)

    return (
        <>

            <Modal open={open} disableAutoFocus onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" sx={{ border: '2px solid white' }}>
                <Grid container sx={style}>
                    <Grid item lg={12} md={12} sm={10} xs={10}>
                        <Paper elevation={5} sx={{ borderRadius: '20px' }}>
                            <Grid container>
                                <Grid item xs={12} sx={{ p: '10px', textAlign: 'right' }}>
                                    <ClearIcon sx={{ color: '#635ac0', fontWeight: 'bold', fontSize: '29px', cursor: 'pointer' }} onClick={crossHandler} />
                                </Grid>


                            </Grid>
                            <Grid contaier sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '20px' }}>
                                <Grid item xs={12} sx={{ textAlign: 'center', mt: '40px' }}>
                                    <Typography sx={{ fontSize: '27px', color: '#635ac0', fontWeight: '800', fontFamily: 'poppins,sans-serif' }}>Change Order Status</Typography>
                                </Grid>
                            </Grid>

                            <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '20px', pb: '70px' }}>

                                <Grid item xs={6.1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '20px' }}>
                                    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                                        <InputLabel id="demo-select-small-label">Order Status</InputLabel>
                                        <Select labelId="demo-select-small-label" id="demo-select-small" value={selectedStatus} label="Order Status" onChange={handleChange}>
                                        {
                                            orderStatus.map((ele,index)=>{
                                                return <MenuItem key={index} value={ele}>
                                              {ele}
                                              </MenuItem>
                                            })
                                        }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6.1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '20px' }}>
                                    <Button variant='contained' disabled={selectedStatus==orderdetail.orderStatus} sx={{ bgcolor: '#635ac0', width: '100%', fontSize: '13px', pt: '10px', pb: '10px', borderRadius: '10px', textTransform: 'lowercase', '&:hover': { bgcolor: '#635ac0'} }} onClick={handleEdit}>Change</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>



                </Grid>


            </Modal>
        </>
    )
}

export default ChangeOrderStatus