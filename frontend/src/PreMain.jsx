
import React from 'react';
import { Link } from "react-router-dom";
import './PreMain.css';
function PreMain() {


    return (
        <div className="splash" style={{ height: '100vh' }}>

            <div className="top">
                <h4 className="stitle">꾸준한 영양제 복용을 위한</h4>
                <h2 className="btitle">PILL GOOD</h2>
            </div>

            <Link to="/login" style={{ textDecoration: 'none' }}><h2 className="tologin">로그인 하러가기</h2></Link>

        </div>
    );
}


export default PreMain;

