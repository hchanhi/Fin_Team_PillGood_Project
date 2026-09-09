import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import {
    Button,
    TextField,
    FormControl,
    FormHelperText,
    Grid,
    Box,
    Typography,
    Container,
} from '@mui/material/';
import './Signup.css';

const Register = (props) => {

    const [passwordState, setPasswordState] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    let { key } = useParams();

    useEffect(() => {
        axios.get('/api/user/passwordChange/' + key)
            .then(res => {
                if (res.data.success) {
                    setEmail(res.data.message);
                    console.log(res.data.message);
                    Swal.fire({
                        confirmButtonColor: '#ffa500',
                        confirmButtonText: '확인',
                        html: '인증되었습니다.<br>비밀번호를 변경해주세요!😊', // Alert 제목

                    });

                } else {
                    Swal.fire({
                        confirmButtonColor: '#ffa500',
                        confirmButtonText: '확인',
                        html: '비정상적인 접근입니다.😥', // Alert 제목

                    }).then((re) => {
                        if (re.isConfirmed) {
                            navigate('/');
                        }
                    });

                }
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const onhandlePost = async (password) => {

        if (!email) {
            Swal.fire({
                confirmButtonColor: '#ffa500',
                confirmButtonText: '확인',
                text: '비정상적인 접근입니다.😥'
            });
            navigate('/');
        }

        await axios
            .put('/api/user/password', {
                key: key,
                password: password,
            })
            .then(() => {
                Swal.fire({
                    confirmButtonColor: '#ffa500',
                    confirmButtonText: '확인',
                    html: '비밀번호가 성공적으로 변경되었습니다.<br>변경된 비밀번호로 로그인해주세요!😊'
                })
                    .then((re) => {
                        if (re.isConfirmed) {
                            localStorage.clear();
                            props.setUserNickName('');
                            navigate('/login');
                        }
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        let password = data.get('password');
        let rePassword = data.get('rePassword');

        // 비밀번호 유효성 체크
        const passwordRegex = /^.{4,20}$/;
        if (!passwordRegex.test(password)) {
            setPasswordState('4~20글자를 입력해주세요!');
        } else
            setPasswordState('');

        // 비밀번호 같은지 체크
        if (password !== rePassword) {
            setPasswordError('비밀번호가 일치하지 않습니다!');
        } else
            setPasswordError('');

        if (passwordRegex.test(password) &&
            password === rePassword
        )
            onhandlePost(password);
    };

    return (
        <Container component="main" maxWidth="xs" style={{ height: '100vh' }}>
            <br />
            <br />
            <div style={{ textAlign: 'center', color: 'gray' }}><span>꾸준한 영양제 복용을 위하여</span></div>
            <h1 style={{
                textAlign: 'center', color: '#58CCFF', fontWeight: '600',
                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000'
            }}>Pill Good</h1>
            <Box
                sx={{
                    marginTop: '150px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: '10px',
                    padding: '32px',
                    backgroundColor: '#fff',
                    boxShadow: ' 0 8px 20px 0 rgba(0, 0, 0, 0.15)'
                }}
            >
                <Typography component="h1" variant="h5">
                    비밀번호 변경
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <FormControl component="fieldset" variant="standard">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    type="password"
                                    id="password"
                                    name="password"
                                    label="비밀번호 (4~20글자를 입력해주세요)"
                                    error={passwordState !== '' || false}
                                />
                            </Grid>
                            <FormHelperText>{passwordState}</FormHelperText>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    type="password"
                                    id="rePassword"
                                    name="rePassword"
                                    label="비밀번호 재입력"
                                    error={passwordError !== '' || false}
                                />
                            </Grid>
                            <FormHelperText>{passwordError}</FormHelperText>
                        </Grid>

                        <Button
                            id='joinBtn'
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2 }}
                            size="large"
                        >
                            비밀번호 변경
                        </Button>
                    </FormControl>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;