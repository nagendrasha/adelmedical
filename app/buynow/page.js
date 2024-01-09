'use client'
import Footer from '@/components/Footer';
import MainHeader from '@/components/MainHeader';
import { Button, FormControl, FormControlLabel, Grid, MenuItem, OutlinedInput, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useState } from 'react';



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {PaperProps:{style:{maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,width: 250,}}};
const names = ['Oliver Hansen','Van Henry','April Tucker','Ralph Hubbard','Omar Alexander','Carlos Abbott','Miriam Wagner','Bradley Wilkerson','Virginia Andrews','Kelly Snyder'];
const steps = ['SHOPPING CART','CHECKOUT','ORDER STATUS'];

const BuyNow = () => {
    const router =useRouter()
    const theme = useTheme();
    const [personName, setPersonName] = useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const getStyles = (name, personName, theme) => {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }
    return (
        <>
        <MainHeader/>
        <Grid container sx={{}}>
            <Grid item xs={12} sx={{ bgcolor: '#e0e0e0', display:{ lg:'flex', md:'flex', sm:'none', xs:'none'},p:"20px 10px", justifyContent: 'center', alignItems: 'center' }}>
                {/* <Box sx={{ width: '60%'}}>
                    <Stepper activeStep={2}  >
                        {steps.map((label) => (
                            <Step key={label} >
                                <StepLabel >{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box> */}
                <Typography sx={{textAlign:"center",fontSize:"25px",fontWeight:"800",color:"#00897b"}}>Place Order</Typography>
            </Grid>


            <Grid container sx={{  display: 'flex', justifyContent: 'center', alignItems: 'flex-start', mt: '20px' }}>
                <Grid item lg={9} md={10} sm={11} xs={11} >
                   
                        {/* <Grid item xs={12} sx={{ display: 'flex',bgcolor:'#1b5e20' }}>
                            <Box sx={{ width: '1%', height: '40px', p: '5px 0px' }} >

                            </Box>
                            <Box sx={{ width: '99%', p: '5px', bgcolor: '#2e7d32', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', height: '40px',width:'80%' }} >
                                    <CheckCircleOutlineIcon sx={{ fontSize: '17px', color: 'white' }} />
                                    <Typography sx={{ fontSize: {lg:'15px', md:'14px',sm:'12px', xs:'11px'}, color: 'white', ml: '10px' }}>Amlodipine</Typography>

                                </Box>
                                <Box sx={{ mr: {lg:'15px', md:'13px', sm:'10px', xs:'10px', width:'100px', textAlign:'right'} }}>
                                    <Typography ><a href='' style={{ color: 'white', fontSize: '14px' }}>View Cart</a></Typography>
                                </Box>

                            </Box>

                        </Grid> */}

                        {/* <Grid item xs={12} sx={{ mt: '40px', display: 'flex', alignItems: 'flex-end' }}>
                            <PermIdentityOutlinedIcon sx={{ fontSize: '23px', color: '#212121' }} />
                            <Typography sx={{ fontSize: '14px', color: '#212121', mt: '6px', ml: '8px', letterSpacing: '0.2px' }}> Returning customer? <a href='' style={{ color: '#212121' }}> Click here to login</a></Typography>

                        </Grid>
                        <Grid item xs={12} sx={{ mt: '15px', display: 'flex', alignItems: 'flex-end' }}>
                            <CardGiftcardIcon sx={{ fontSize: '23px', color: '#212121' }} />
                            <Typography sx={{ fontSize: '14px', color: '#212121', mt: '6px', ml: '8px', letterSpacing: '0.2px' }}> Have a coupon? <a href='' style={{ color: '#212121' }}>Click here to enter your code</a></Typography>

                        </Grid> */}

                        <Grid container sx={{  display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Grid item lg={6.5} md={6.5} sm={12} xs={12} sx={{}}>
                                <Grid container >
                                    <Grid item xs={12} sx={{ borderBottom: '2px solid lightgrey', p: '10px 0px', }}>
                                        <Typography sx={{ fontSize: '20px', fontWeight: '600',color:"#00897b" }}>BILLING DETAILS</Typography>

                                    </Grid>

                                    <Grid container sx={{ mt: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Grid item lg={5.8} md={5.8} sm={12} xs={12} >
                                            <Typography sx={{ color: '#757575', fontSize: '15px' }}>First name *</Typography>
                                            <TextField placeholder='First name...' sx={{ fontSize: '15px' }} fullWidth size='small' />

                                        </Grid>
                                        <Grid item lg={5.8} md={5.8} sm={12} xs={12} sx={{mt:{lg:'0px', md:'0px', sm:'12px', xs:'12px'}}}>
                                            <Typography sx={{ color: '#757575', fontSize: '15px' }}>Last name *</Typography>
                                            <TextField placeholder='Last name...' sx={{ fontSize: '15px' }} fullWidth size='small' />

                                        </Grid>

                                    </Grid>

                                    <Grid item xs={12} sx={{ mt: '12px' }}>
                                        <Typography sx={{ color: '#757575', fontSize: '15px' }}>Company name (optional)</Typography>
                                        <TextField placeholder='Type...' sx={{ fontSize: '15px' }} fullWidth size='small'/>
                                    </Grid>

                                    <Grid item xs={12} sx={{ mt: '12px' }}>
                                        <Typography sx={{ color: '#757575', fontSize: '15px' }}>Country / Region *</Typography>
                                        <FormControl sx={{}} fullWidth size='small'>
                                            <Select labelId="demo-multiple-name-label" id="demo-multiple-name" multiple value={personName} onChange={handleChange} input={<OutlinedInput />} MenuProps={MenuProps}>
                                                {names.map((name) => (
                                                    <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                    </Grid>
                                    <Grid item xs={12} sx={{ mt: '12px' }}>
                                        <Typography sx={{ color: '#757575', fontSize: '15px' }}>Street address *</Typography>
                                        <TextField placeholder='House number or street name...' sx={{ fontSize: '15px' }} fullWidth size='small' />
                                        <TextField placeholder='Apartmnet, suite, unit, etc. (Optinal)' sx={{ fontSize: '15px', mt: '12px' }} fullWidth size='small' />

                                    </Grid>

                                    <Grid item xs={12} sx={{ mt: '12px' }}>
                                        <Typography sx={{ color: '#757575', fontSize: '15px' }}>Town / City *</Typography>
                                        <TextField placeholder='Enter...' sx={{ fontSize: '15px' }} fullWidth size='small' />


                                    </Grid>

                                    <Grid item xs={12} sx={{ mt: '12px' }}>
                                        <Typography sx={{ color: '#757575', fontSize: '15px' }}>State *</Typography>
                                        <FormControl sx={{}} fullWidth size='small'>

                                            <Select
                                                labelId="demo-multiple-name-label"
                                                id="demo-multiple-name"
                                                multiple
                                                value={personName}
                                                onChange={handleChange}
                                                input={<OutlinedInput />}
                                                MenuProps={MenuProps}
                                            >
                                                {names.map((name) => (
                                                    <MenuItem
                                                        key={name}
                                                        value={name}
                                                        style={getStyles(name, personName, theme)}
                                                    >
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                    </Grid>

                                    <Grid item xs={12} sx={{ mt: '12px' }}>
                                        <Typography sx={{ color: '#757575', fontSize: '15px' }}>PIN Code *</Typography>
                                        <TextField placeholder='Pin code...' sx={{ fontSize: '15px' }} fullWidth size='small' />


                                    </Grid>

                                    <Grid item xs={12} sx={{ mt: '12px' }}>
                                        <Typography sx={{ color: '#757575', fontSize: '15px' }}>Phone *</Typography>
                                        <TextField placeholder='Phone no...' sx={{ fontSize: '15px' }} fullWidth size='small' />


                                    </Grid>

                                    <Grid item xs={12} sx={{ mt: '12px' }}>
                                        <Typography sx={{ color: '#757575', fontSize: '15px' }}>Email address *</Typography>
                                        <TextField placeholder='Email...' type='emial' sx={{ fontSize: '15px' }} fullWidth size='small' />


                                    </Grid>

                                    {/* <Grid item xs={12} sx={{ mt: '12px' }}>
                                        <FormGroup>

                                            <FormControlLabel required control={<Checkbox size='small' />} label="Create an account?" sx={{ color: '#757575',fontSize:'14px' }} />
                                            <FormControlLabel required control={<Checkbox size='small' />} label="Ship to a different address?" sx={{ color: '#757575', fontSize:'14px' }} />

                                        </FormGroup>


                                    </Grid> */}

                                    {/* <Grid item xs={12} sx={{ mt: '12px' }}>
                                        <Typography sx={{ color: '#757575', fontSize: '15px' }}>Order notes (optional)</Typography>
                                        <TextareaAutosize placeholder='Notes about your order, e.g. sepcial notes for delivery'type='text' style={{ fontSize: '15px', width:'98%' }} minRows={4}  />


                                    </Grid> */}
                                </Grid>

                            </Grid>
                            <Grid item lg={5} md={5} sm={12} xs={12} sx={{ border: '2px solid black',bgcolor:"#e0f2f1"}}>
                                <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                                    <Grid item xs={11} >
                                        <Grid container>
                                            <Grid item xs={12} sx={{ borderBottom: '2px solid lightgrey', p: '10px 0px', }}>
                                                <Typography sx={{ fontSize: '14px', fontWeight: '600',color:"#00897b" }}>YOUR ORDER</Typography>

                                            </Grid>
                                        </Grid>
                                        <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mt: '30px', borderBottom: '2px solid lightgrey', p: '10px 0px' }}>
                                            <Grid item xs={8.5}>
                                                <Typography sx={{ fontSize: '15px' }}>Amlodipine</Typography>


                                            </Grid>
                                            <Grid item xs={2.5} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'flex-start' }}>
                                                <Typography sx={{ color: '#757575', fontSize: '15px' }} >₹1,698.00</Typography>

                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography sx={{ fontSize: '13px', mt:'5px' }}>× 2</Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mt: '5px', p: '10px 0px' }}>
                                            <Grid item xs={8}>
                                                <Typography sx={{ fontSize: '15px', color: '#757575', }}>Subtotal  </Typography>


                                            </Grid>
                                            <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'flex-start' }}>
                                                <Typography sx={{ color: '#757575', fontSize: '15px' }} >₹1,698.00</Typography>

                                            </Grid>
                                            <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mt: '19px' }}>
                                                <Grid item xs={6}>
                                                    <Typography sx={{ fontSize: '15px', color: '#757575', }}>Shipping  </Typography>


                                                </Grid>
                                                <Grid item xs={5} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'flex-start' }}>
                                                    <Typography sx={{ color: '#757575', fontSize: '15px' }} >Free shipping</Typography>

                                                </Grid>

                                            </Grid>
                                            <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mt: '19px' }}>
                                                <Grid item xs={8}>
                                                    <Typography sx={{ fontSize: '15px', color: '#757575', }}>Additional Discount  </Typography>


                                                </Grid>
                                                <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'flex-start' }}>
                                                    <Typography sx={{ color: '#757575', fontSize: '15px' }} >-₹84.90</Typography>

                                                </Grid>

                                            </Grid>

                                            <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mt: '18px', pb: '15px', borderBottom: '2px solid lightgrey' }}>
                                                <Grid item xs={8}>
                                                    <Typography sx={{ fontSize: '19px',color:"#00897b" }}>TOTAL  </Typography>


                                                </Grid>
                                                <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'flex-start' }}>
                                                    <Typography sx={{ fontSize: '19px' }} >₹1,698.00</Typography>

                                                </Grid>

                                            </Grid>

                                            <Grid container sx={{mt:'18px'}}>
                                                <Grid item xs={12}>
                                                    <FormControl>
                                                        
                                                        <RadioGroup
                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                            defaultValue="Cash on delivery"
                                                            name="radio-buttons-group"
                                                        >
                                                            <FormControlLabel value='Cash on delivery'  control={<Radio  size='small'/>} label="Cash on delivery"   sx={{fontSize:'14px'}}/>
                                                            <Typography  sx={{fontSize:'14px', ml:'30px'}}>Pay with cash upon delivery.</Typography>
                                                            
                                                            <FormControlLabel value='Online'  control={<Radio size='small'/>} label="Online "  sx={{fontSize:'14px'}} />
                                                            <Typography sx={{fontSize:'14px', ml:'30px', display:'none'}} >Pay securely by Credit or Debit card or net banking through PayU.</Typography>
                                                        </RadioGroup>
                                                    </FormControl>

                                                </Grid>
                                                <Grid item xs={12} sx={{mt:'17px'}}>
                                                    <Typography sx={{fontSize:'15.5px', color:'#757575'}}>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</Typography>

                                                </Grid>
                                                <Grid item xs={12} sx={{mt:'15px'}}>
                                                    <Button sx={{width:'100%', color:'white', bgcolor:'#00897b', '&:hover':{width:'100%', color:'white', bgcolor:'#00897b',}}} onClick={()=>{router.push('orderplaced')}}>Place Order</Button>

                                                </Grid>

                                            </Grid>


                                        </Grid>

                                    </Grid>
                                </Grid>

                            </Grid>

                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        
        {/* <FollowUS/> */}
        <Footer/>
        </>
    )
}

export default BuyNow