
import { useState, useEffect, useCallback } from "react";
import { isAuth, getId } from '../jwtCheck';
import axios from 'axios';


import { useNavigate } from "react-router-dom";
import {
    Box,
    Container,
} from '@mui/material/';
import './User.css';

import Swal from 'sweetalert2';

const User = (props) => {

    const token = JSON.parse(localStorage.getItem('accessToken'));
    const userId = getId(token);
    const navigate = useNavigate();



    const [user, setUser] = useState([]);
    const [nic, setNick] = useState();;
    const [oldPas, setOldPas] = useState();
    const [newPas, setNewPas] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState('');

    //오류메시지 상태저장
    const [nameMessage, setNameMessage] = useState('');
    const [passwordOldMessage, setPasswordOldMessage] = useState('');
    const [passwordNewMessage, setPasswordNewMessage] = useState('');
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');

    // 유효성 검사
    const [isName, setIsName] = useState(true);
    const [isOldPassword, setIsOldPassword] = useState(false);
    const [isNewPassword, setIsNewPassword] = useState(false);
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);


    function getUser() {
        axios.get('/api/users/' + userId, { params: { id: userId } })
            .then(function (json) {
                setUser(json.data);
                setNick(json.data.nickname);
            });


    };
    useEffect(() => {
        getUser();
        if (!isAuth(token)) {
            Swal.fire({
                confirmButtonColor: '#ffa500',
                confirmButtonText: '확인',
                text: '로그인 후 이용하실 수 있어요😥', // Alert 제목

            });
            navigate('/login');
        }
    }, []);
    let nicBody = {
        id: userId,
        nickname: nic

    };


    const handleSubmitNic = (e) => {
        e.preventDefault();

        const nameRegex = /^[가-힣|a-zA-Z|0-9]+$/;

        if (!nameRegex.test(nic) || nic.length < 1) {
            setNameMessage('올바른 닉네임을 입력해주세요!');
            setIsName(false);
        } else {
            setIsName(true);
            axios

                .post('/api/user/' + userId + '/nickname', nicBody)

                .then(function (response) {
                    if (response.data === false) {
                        Swal.fire({
                            confirmButtonColor: '#ffa500',

                            confirmButtonText: '확인',
                            text: '중복된 닉네임입니다!😢', // Alert 제목

                        });

                    } else {
                        Swal.fire({
                            confirmButtonColor: '#ffa500',

                            confirmButtonText: '확인',
                            html: '닉네임이 수정되었습니다.<br>다시 로그인해주세요!😊', // Alert 제목

                        }).then((re) => {
                            if (re.isConfirmed) {
                                localStorage.clear();
                                props.setUserNickName('');
                                navigate('/');
                            }
                        });

                    }



                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    };

    let pasBody = {
        id: userId,
        oldPassword: oldPas,
        newPassword: newPas

    };
    const handleSubmitPas = useCallback((e) => {
        e.preventDefault();

        const passwordRegex = /^.{4,20}$/;
        if (!passwordRegex.test(oldPas)) {
            setPasswordOldMessage('4~20글자를 입력해주세요!');
            setIsOldPassword(false);

        } else if (!passwordRegex.test(newPas)) {
            setPasswordNewMessage('4~20글자를 입력해주세요!');
            setIsOldPassword(true);
            setIsNewPassword(false);
        } else if (passwordConfirm !== newPas) {
            setIsPasswordConfirm(false);
            setPasswordConfirmMessage('비밀번호가 다릅니다!');
            setIsOldPassword(true);
            setIsNewPassword(true);
        } else {
            setIsOldPassword(true);
            setIsNewPassword(true);
            setIsPasswordConfirm(true);
            axios
                .post('/api/user/' + userId + '/password', pasBody)
                .then(function (response) {
                    if (response.data === false) {
                        Swal.fire({
                            confirmButtonColor: '#ffa500',

                            confirmButtonText: '확인',
                            text: '비밀번호가 틀렸습니다!😢', // Alert 제목

                        });

                    } else {
                        Swal.fire({
                            confirmButtonColor: '#ffa500',

                            confirmButtonText: '확인',
                            html: '비밀번호가 수정되었습니다.<br>다시 로그인해주세요!😊', // Alert 제목

                        }).then((re) => {
                            if (re.isConfirmed) {
                                localStorage.clear();
                                props.setUserNickName('');
                                navigate('/');
                            }
                        });

                    }


                })
                .catch(function (err) {
                    console.log(err);
                });

        }



    }, [oldPas, newPas, passwordConfirm]
    );

    let delBody = {
        id: userId,


    };
    const handleSubmitDel = (e) => {
        e.preventDefault();

        Swal.fire({
            showCancelButton: true,
            confirmButtonColor: '#2fbe9f',
            cancelButtonColor: '#fd565f',
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            text: '정말 탈퇴하시겠습니까?', // Alert 내용
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post('/api/user/delete', delBody)
                    .then(function (response) {
                        console.log(response.status, '성공');
                        Swal.fire({

                            confirmButtonColor: '#ffa500',

                            confirmButtonText: '확인',

                            text: '탈퇴되었습니다!', // Alert 내용
                        }).then((re) => {
                            if (re.isConfirmed) {
                                localStorage.clear();
                                props.setUserNickName('');

                                navigate('/');
                            }
                        });
                    })
                    .catch(function (err) {
                        console.log(delBody);
                        console.log(err);

                    });
            }

        });
    };
    // 닉네임
    const onChangeName = useCallback((e) => {
        const nameRegex = /^[가-힣|a-zA-Z|0-9]+$/;
        const nameCurrent = e.target.value;
        setNick(nameCurrent);

        if (!nameRegex.test(nameCurrent) || nameCurrent.length < 1) {
            setNameMessage('올바른 닉네임을 입력해주세요!');
            setIsName(false);
        } else {

            setIsName(true);
        }
    }, []);

    // 현재 비밀번호
    const onChangeOldPassword = useCallback((e) => {
        const passwordRegex = /^.{4,20}$/;
        const passwordOldCurrent = e.target.value;
        setOldPas(passwordOldCurrent);

        if (!passwordRegex.test(passwordOldCurrent)) {
            setPasswordOldMessage('4~20글자를 입력해주세요!');
            setIsOldPassword(false);
        } else {

            setIsOldPassword(true);
        }
    }, []);
    // 변경 비밀번호
    const onChangeNewPassword = useCallback((e) => {
        const passwordRegex = /^.{4,20}$/;
        const passwordNewCurrent = e.target.value;
        setNewPas(passwordNewCurrent);

        if (!passwordRegex.test(passwordNewCurrent)) {
            setPasswordNewMessage('4~20글자를 입력해주세요!');
            setIsNewPassword(false);
        } else {

            setIsNewPassword(true);
        }
    }, []);
    //비번 확인
    const onChangePasswordConfirm = useCallback(
        (e) => {
            const passwordConfirmCurrent = e.target.value;
            setPasswordConfirm(passwordConfirmCurrent);

            if (newPas === passwordConfirmCurrent) {

                setIsPasswordConfirm(true);
            } else {
                setPasswordConfirmMessage('비밀번호가 다릅니다!');
                setIsPasswordConfirm(false);
            }
        },
        [newPas]
    );
    return (<div style={{ paddingTop: '90px',paddingBottom: '90px'  }}>
        <h3 style={{
            textAlign: 'center', color: '#58CCFF', fontWeight: '600',
            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000'
        }} >회원정보 수정</h3>
        <br />
        <Container className="UserEditor"
            sx={{
                height: 530,
                width: 400,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '10px',
                padding: '10px 50px',
                backgroundColor: '#fff',
                boxShadow: ' 0 8px 20px 0 rgba(0, 0, 0, 0.15)'
            }}>


            <br></br>
            <Box component="form" sx={{ mt: 3}}>
                <div className="userFlex" >
                    <label>이메일</label>
                    <input

                        defaultValue={user.email}
                        name="nickName"
                        type="text"
                        readOnly

                    />

                </div>
                <div className="userFlex">
                    <label>닉네임</label>
                    <input
                        defaultValue={nic}
                        name="nickName"
                        onChange={onChangeName}
                        type="text"
                    />
                    {<span className={`message ${isName ? 'success' : 'error'}`}>{nameMessage}</span>}
                    <div className='modify'>
                        <button onClick={handleSubmitNic}>수정</button>
                    </div>

                </div>
                <br></br>
                <div className="userFlex">
                    <label>현재 비밀번호</label>
                    <input
                        defaultValue={oldPas}
                        name="old"
                        onChange={onChangeOldPassword}
                        type="password"
                    />
                    {(
                        <span className={`message ${isOldPassword ? 'success' : 'error'}`}>{passwordOldMessage}</span>
                    )}
                </div>

                <div className="userFlex">
                    <label>변경 비밀번호</label>
                    <input
                        defaultValue={newPas}
                        name="new"
                        onChange={onChangeNewPassword}
                        type="password"
                    />
                    {(
                        <span className={`message ${isNewPassword ? 'success' : 'error'}`}>{passwordNewMessage}</span>
                    )}
                </div>

                <div className="userFlex">
                    <label>변경 비밀번호 확인</label>
                    <input
                        defaultValue={passwordConfirm}
                        onChange={onChangePasswordConfirm}
                        name="confirm"
                        type="password"


                    />
                    {(
                        <span className={`message ${isPasswordConfirm ? 'success' : 'error'}`}>{passwordConfirmMessage}</span>
                    )}
                    <div className='modify2'>
                        <button onClick={handleSubmitPas}>수정</button>
                    </div>
                </div>

            </Box>



            <div className="userDelBtn">
                <button onClick={handleSubmitDel}>탈퇴</button>
            </div>

        </Container>
    </div>
    );

};
export default User;