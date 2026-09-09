import { React, useEffect, useState } from "react";

import styled from "styled-components";
import { Card } from "react-bootstrap";
import './Main.css';
import CheckPill from './CheckPill';
import { getNickName, isAuth } from './jwtCheck';
import axios from "axios";

let Wrapper = styled.div`
margin: auto;
marginTop: 50px;
width: 90%;
`;


function Main() {
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const nickname = getNickName(token);
    let [selectpill, setSelectpill] = useState([]);
    let [pillstate, setPillstate] = useState(0);
    let params = { nickname: nickname };
    let [record, setRecord] = useState([]);
    let [ranking, setRanking] = useState([]);

    function mypill() {
        if (isAuth(token) !== false) {
            axios.get("/api/supplements/list", { params })
                .then(function (res) {
                    setSelectpill(res.data);
                })
                .catch(function (res) {
                    console.log('실패');
                });
        }
    }
    let addBadge = async () => {
        await axios.get("/api/supplements/addbadge", { params })
            .then(function (res) {
                console.log('성공애드뱃지');
                console.log(res.data);
            })
            .catch(function (err) {
                console.log('실패');
                console.log(err);
                console.log(err.headers);
            });
    };
    useEffect(() => {
        mypill();
        addBadge();
        getRecord();
        getRanking();

    }, []);

    function clickHandler(e) {
        setPillstate(e);
    }
    if (!(token)) {
        window.location.reload();
    }

    function getRecord() {
        axios.get("/api/supplements/record", { params })
            .then(function (res) {
                setRecord(res.data);
            })
            .catch(function (res) {
                console.log('실패');
            });
    }

    function getRanking() {
        axios.get("/api/supplements/maxranking")
            .then(function (res) {
                setRanking(res.data);
                console.log(res.data);
            })
            .catch(function (res) {
                console.log('실패');
            });
    }


    return (

        < Wrapper style={{ marginTop: "30px", paddingBottom:'70px' }}>

            <div style={{ textAlign: 'center', color: 'gray', paddingTop:'60px' }}><span>꾸준한 영양제 복용을 위한</span></div>
            <h1 style={{
                textAlign: 'center', color: '#58CCFF', fontWeight: '600',
                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000'
            }}>Pill Good</h1>

            <Card className="mainCard">

                <Card.Body>
                    <Card.Title>{isAuth(token) !== false ? <span>안녕하세요  <span style={{ color: 'orange', fontWeight: '600' }}>{nickname}</span> 님!</span> : '로그인 후 이용바랍니다.'}</Card.Title>
                    {selectpill.map(function (pill, index) {
                        return (
                            <div>
                                {pillstate === index ?
                                    <div >
                                        {pill.quantityLeft >= 100 ?

                                            <img src={require("./img/vitamin100.jpg").default} className="image" />
                                            : pill.quantityLeft >= 50 ? <img src={require("./img/vitamin50.jpg").default} className="image" /> :
                                                <img src={require("./img/vitamin30.jpg").default} className="image" />
                                        }
                                    </div>
                                    : null}
                            </div>
                        );
                    })}

                    <Card.Subtitle className="mb-2 text-muted">
                        {selectpill.map(function (pill, index) {
                            return (
                                <span style={{ marginRight: '5px' }} key={index} className={`pillname ${pillstate === index ? 'selected' : ''}`} onClick={() => { clickHandler(index); }}>{pill.supplementsName}  </span>
                            );
                        })}
                    </Card.Subtitle>

                    <br />
                    {selectpill.map(function (pill, index) {
                        return (
                            <div>
                                {pillstate === index ?
                                    <Card.Text key={index}>
                                        남은 수량 : {pill.quantityLeft}<br />
                                        알람 시간 : {pill.slot === 'MORNING' ? '아침' : pill.slot === 'LUNCH' ? '점심' : '저녁'}<br />
                                    </Card.Text> : null}
                            </div>
                        );
                    })}
                    <br />
                    <div>
                        <span>현재 연속 일수 : {record.continuity}</span><br />
                        <span>최고 연속 일수 : {record.maxContinuity}</span>
                    </div>



                </Card.Body>
            </Card>
            <br />
            <CheckPill />
            <br />
            <br />
            <div style={{ marginBottom:'50px' }}>
                <h4 style={{ color: 'orange' }}>🏆 랭킹</h4>
                <span style={{ fontSize: '15px', color: 'gray' }}>꾸준히 루틴을 완료한 필굿러들의 명예의 전당!  </span>
                <Card className="rankCard">
                    <Card.Body>
                        {ranking.map(function (rank, index) {
                            return (
                                <div style={{ fontSize: '20px' }}>
                                    <span key={index}>{(index + 1) === 1 ? '🥇 ' : (index + 1) === 2 ? '🥈 ' : (index + 1) === 3 ? '🥉 ' : (index + 1) + '위 '}</span>&nbsp;&nbsp;
                                    <span style={{ fontWeight: '600' }}>{rank.user.nickname}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span style={{ fontSize: '15px', color: 'gray' }}>(연속 일수 : {rank.continuity} 일)</span>
                                </div>
                            );
                        })}
                    </Card.Body>
                </Card>
            </div>

        </Wrapper >
    );
}

export default Main;