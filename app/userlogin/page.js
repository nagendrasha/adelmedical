'use client'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function Copyright(props) {

    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                AdelSocialFood
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const SignIn = () => {
    const router = useRouter();
    const [loginData, setLoginData] = useState({mobile: "",password: ""});
    const [loader , setLoader]= useState(false)


    const handleCollect = (e) => {
        const { name, value } = e.target;
        if (name == 'mobile' && value.length > 10) {

        }
        else {
            setLoginData({ ...loginData, [name]: value });
        }
    };

     // console.log(loginData)
    const loginHandler = async () => {
        try {
              if (loginData.mobile.length == 10 && loginData.password) {
                 setLoader(true)
                const respData = await axios.post('/api/verifyuser', loginData);
                  // console.log("response",respData.data.resp.uid);
                if (respData.data.message == 'Login Successfull') {
                    const respJson = JSON.stringify(respData.data.resp.uid);
                      await localStorage.setItem("UID", respJson)
                    router.push('/')
                    setLoader(false)
                }
                else {
                    console.log("response data login", respData.data.message)
                    setLoader(false)
                    alert(respData.data.message)
                };
            }
            else {
                alert('Incomplete Form')
            }
        } catch (err) {
            console.log(err);
            alert(err.message);
        };
    };

    return (
        <>
            <Box sx={{ border: "1px solid black", p: "15px", bgcolor: "#37474f", position: "sticky", top: "0px" }}>
                <Typography align='center' sx={{ color: "white", fontSize: "26px", fontWeight: 600 }}>Sign In Form</Typography>
            </Box>
            <Container component="main" maxWidth="xs">
                {/* <CssBaseline /> */}
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                        p: "5px"
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="mobile"
                            label="Mobile No."
                            name="mobile"
                            autoComplete="Mobile"
                            type='number'
                            value={loginData.mobile}
                            onChange={handleCollect}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={loginData.password}
                            onChange={handleCollect}
                        />
                        <Box sx={{display:'flex',justifyContent:"center",alignItems:"center"}}>
                         {
                            loader ? 
                            <CircularProgress color='inherit' size={'2rem'} sx={{ mt: 3, mb: 2 }}/>
                            :
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={loginHandler}>
                               Sign In
                            </Button>
                         }
                        </Box>

                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/userregister" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </>


    );
}


export default SignIn;