
'use client'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';

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





const SignUp = () => {
  const router = useRouter();
  const [checker, setChecker] = useState(true);
  const [loader , setLoader]= useState(false)
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: ""
  });

  const handleCollect = (e) => {
    const { name, value } = e.target;

    if (name == 'mobile' && value.length > 10) {
      // alert("Mobile Number Not More Then 10 digits")
    }
    else {
      setRegisterData({ ...registerData, [name]: value });
    };
  };

  useEffect(() => {
    if (registerData.fullName && registerData.email && (registerData.mobile.length < 11 && registerData.mobile.length > 9) && registerData.password.length > 7) {
      setChecker(false)
    } else {
      setChecker(true)
    }
  }, [registerData]);

  const handleSubmit = async () => {
    // console.log(registerData);`
    setLoader(true)
    try {
      const respData = await axios.post('/api/user', registerData);
      // console.log(respData);
      if (respData.data.message == "This Mobile No. is Already Registered") {
        setLoader(false)
        alert(respData.data.message);
      };
      if (respData.data.message == 'User Registered Successfully') {
        setLoader(false)
        router.push('/userlogin');
      };
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  return (
    <>
      <Box sx={{ p: "15px", backgroundColor: "#37474f", position: 'sticky', top: '0px' }}>
        <Typography align='center' sx={{ color: "white", fontSize: "25px", fontWeight: 700 }}>
          Registration Form
        </Typography>
      </Box>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: "5px",
            p: "5px"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField autoComplete="given-name" name="fullName" required fullWidth id="fullname" label="Full Name" autoFocus value={registerData.fullName} onChange={handleCollect}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField required fullWidth id="mobile" label="Mobile" name="mobile" type='number' autoComplete="mobile" value={registerData.mobile} onChange={handleCollect}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={registerData.email} onChange={handleCollect}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" value={registerData.password} onChange={handleCollect}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography align='center' sx={{ fontSize: "15px" }}>Image</Typography>
                <Box sx={{ height: "30px", width: "100%" }}>
                  <Typography align='center' sx={{ position: "relative", top: "0px", mt: "4px", border: "1px solid gray" }}>
                    <input type='file' style={{ zIndex: 99, opacity: 0, position: "absolute", left: "0px", top: "0px", height: "30px", width: "100%" }} />
                    Choose Image
                  </Typography>
                </Box>
              </Grid>
            </Grid>
                <Box sx={{display:'flex',justifyContent:"center",alignItems:"center"}}>
                         {
                            loader ? 
                            <CircularProgress color='inherit' size={'2rem'} sx={{ mt: 3, mb: 2 }}/>
                            :                 
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={checker} onClick={handleSubmit}>
                              Sign Up
                            </Button>
                         }
                        </Box>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="userlogin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </>

  );
};

export default SignUp;