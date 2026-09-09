import './App.css';
import { useEffect, useState } from "react";

import { Routes, Route } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Main from "./Main";
import PreMain from "./PreMain";
import Reward from "./reward/Reward";
import User from "./user/User";
import AddPill from "./alarm/AddPill";
import MyPill from "./alarm/MyPill";
import Signup from "./login/Signup";
import Login2 from "./login/Login2";
import { isAuth, getNickName } from './jwtCheck';
import FindPassword from "./login/FindPassword";
import EditPassword from "./login/EditPassword";


function App() {


    const token = JSON.parse(localStorage.getItem('accessToken'));
    let [userNickName, setUserNickName] = useState('');
    let [isLogin, setIsLogin] = useState(false);

    useEffect(() => {


        if (isAuth(token)) {
            setUserNickName(getNickName(token));
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [isLogin]);
    if (isAuth(token) === false) {
        return (
            <div className="AppDiv">
                <Header userNickName={userNickName} setUserNickName={setUserNickName} />
                <br />
                <br />
                <Routes>
                    <Route path='/' element={<PreMain />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login2 isLogin={isLogin} setIsLogin={setIsLogin} />} />
                    <Route path="/findPassword" element={<FindPassword />} />
                    <Route path="/user/passwordChange/:key" element={<EditPassword setUserNickName={setUserNickName} />} />
                </Routes>
            </div>
        );
    };
    return (
        <div className="AppDiv">
            {/*헤더*/}

            <Header userNickName={userNickName} setUserNickName={setUserNickName} />

            {/*페이지*/}
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/user" element={<User setUserNickName={setUserNickName} />} />
                <Route path="/reward" element={<Reward />} />
                <Route path="/mypill" element={<MyPill />} />
                <Route path="/addpill" element={<AddPill />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login2 isLogin={isLogin} setIsLogin={setIsLogin} />} />
                <Route path="/findPassword" element={<FindPassword />} />
                <Route path="/user/passwordChange/:key" element={<EditPassword setUserNickName={setUserNickName} />} />

                <Route path="*" element={<div>404 Error Not found</div>} />
            </Routes>

            {/*푸터*/}
            <Footer />

        </div>
    );
}

export default App;