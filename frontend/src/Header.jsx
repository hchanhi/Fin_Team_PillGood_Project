import React from 'react';
import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from 'react-bootstrap';



function Header(props) {

    let nickName = props.userNickName;
    console.log(nickName);

    return (


        <Navbar style={{ marginBottom: '3rem', zIndex: '1' }} bg="dark" variant="dark" className="mainHeader">
            <Container>
                <Navbar.Brand as={Link} to={"/"} style={{ color: "orange", fontSize: "23px", fontWeight: "600", paddingLeft: '12px' }}>Pill Good</Navbar.Brand>
                <Nav style={{ float: 'right', marginRight: '10px' }}>
                    {
                        nickName ? (<div style={{ display: 'flex' }}>
                            <Nav.Link style={{ color: '#58CCFF' }} as={Link} to={"/user"} >{nickName}</Nav.Link>
                            <Nav.Link as={Link} to={"/"} onClick={() => {
                                localStorage.clear();
                                props.setUserNickName('');
                            }} >로그아웃</Nav.Link>
                        </div>) : (<div style={{ display: 'flex' }}><Nav.Link as={Link} to={"/login"} >로그인</Nav.Link>

                            <Nav.Link as={Link} to={"/Signup"} >회원가입</Nav.Link></div>)
                    }

                </Nav>

            </Container>
        </Navbar >

    );
}

export default Header;