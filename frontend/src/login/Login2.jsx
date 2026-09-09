import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';
import {

    Button,
    TextField,
    FormHelperText,
    Grid,
    Box,
    Typography,
    Container,


} from '@mui/material/';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';



const Resigter = (props) => {


    const [emailError, setEmailError] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const navigate = useNavigate();

    // 동의 체크


    const onhandlePost = async (data) => {
        const { email, password } = data;
        const postData = { email, password };

        // post

        await axios
            .post('/api/auth/signin', postData)
            .then(function (response) {
                localStorage.setItem('accessToken', JSON.stringify(response.data));

                if (response.status === 200) {
                    Swal.fire({
                        confirmButtonColor: '#ffa500',
                        confirmButtonText: '확인',
                        text: '로그인 되었습니다!😊',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            props.setIsLogin(!props.isLogin);
                            navigate('/');
                        }
                    });

                }
            })
            .catch(function (err) {
                console.log(err);
                Swal.fire({
                    confirmButtonColor: '#ffa500',

                    confirmButtonText: '확인',
                    text: '이메일 혹은 비밀번호가 틀렸습니다!😥', // Alert 제목

                });

            });
    };

    // form 전송
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const joinData = {

            email: data.get('email'),
            password: data.get('password'),


        };
        const { email, password } = joinData;

        // 이메일 유효성 체크
        // 이메일 유효성 체크
        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (!emailRegex.test(email)) setEmailError('올바른 이메일 형식이 아닙니다!');
        else setEmailError('');

        // 비밀번호 유효성 체크
        const passwordRegex = /^.{4,20}$/;
        if (!passwordRegex.test(password)) {
            setPasswordState('4~20글자를 입력해주세요!');
        } else {
            setPasswordState('');
        }




        // 회원가입 동의 체크

        if (
            emailRegex.test(email) &&
            passwordRegex.test(password)

        ) {
            onhandlePost(joinData);
        }
    };



    return (

        <Container component="main" maxWidth="xs" style={{  textAlign: 'center' ,  paddingBottom: '100px',}}>

            <div style={{ textAlign: 'center', color: 'gray', marginTop:'40px' }}><span>꾸준한 영양제 복용을 위하여</span></div>
            <h1 style={{
                textAlign: 'center', color: '#58CCFF', fontWeight: '600',
                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000'
            }}>Pill Good</h1>
            <Box
                sx={{
                    marginTop: '100px',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '10px',
                    padding: '30px 50px',
                    backgroundColor: '#fff',
                    boxShadow: ' 0 8px 20px 0 rgba(0, 0, 0, 0.15)'
                }}
            >

                <Typography style={{fontSize: '2rem' }} component="h3" variant="h3" color="gray" margin="0 auto" fontWeight="600">
                    로그인
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="이메일"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={emailError !== '' || false}
                            sx={{ outline: "none" }}
                        />
                    </Grid>
                    <FormHelperText>{emailError}</FormHelperText>
                    <Grid item xs={16}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="비밀번호"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={passwordState !== '' || false}
                        />
                    </Grid>
                    <FormHelperText>{passwordState}</FormHelperText>
                    <Button
                        id="joinBtn"
                        type="submit"
                        fullWidth
                        variant="contained"
                        fontWeight="600"
                        sx={{ mt: 3, mb: 3, ml: 7.5, backgroundColor: "orange", fontSize: 20, width: 180, marginLeft: 0 }}
                    >
                        로그인
                    </Button>
                    <br />
                    <Link to={'/findPassword'}>비밀번호를 잊어버리셨나요?</Link>
                    <br />
                    <Link to={'/signup'}>계정이 없으신가요? 회원가입</Link>

                </Box>
            </Box>

        </Container>

    );
};

export default Resigter;