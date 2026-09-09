import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container, Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward, faHouse, faCapsules, faUserGear } from "@fortawesome/free-solid-svg-icons";

let Wrapper = styled.div`
width:80px;
text-align:center;
display:flex;
justify-content:center;
align-items:center;
flex-direction: column;

a {
    padding-bottom:0
}
.nav-link {
    color : #58CCFF !important
}
`;

const Footer = () => {



    return (


        <Navbar bg="dark" variant="dark" className="mainFooter">
            <Container style={{ paddingTop: '5px' }}>
                <Nav className="me-auto" style={{ margin: 'auto' }}>
                    <Wrapper>
                        <Link to={'/'}><FontAwesomeIcon style={{ color: "white" }} icon={faHouse} size="xl" /></Link>
                        <div><Nav.Link as={Link} to={"/"}>메인</Nav.Link></div>
                    </Wrapper>
                    <Wrapper>
                        <Link to={'/reward'}><FontAwesomeIcon style={{ color: "white" }} className='icon' icon={faAward} size="xl" /></Link>
                        <Nav.Link as={Link} to={"/reward"}>리워드</Nav.Link>
                    </Wrapper>
                    <Wrapper>
                        <Link to={'/mypill'}><FontAwesomeIcon style={{ color: "white" }} icon={faCapsules} size="xl" /></Link>
                        <Nav.Link as={Link} to={"/mypill"}>영양제</Nav.Link>
                    </Wrapper>
                    <Wrapper>
                        <Link to={'/user'}><FontAwesomeIcon style={{ color: "white" }} icon={faUserGear} size="xl" /></Link>
                        <Nav.Link as={Link} to={"/user"}>회원정보</Nav.Link>
                    </Wrapper>
                </Nav>
            </Container>
        </Navbar>

    );

};
export default Footer;