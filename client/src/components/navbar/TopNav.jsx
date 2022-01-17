import React, { useState } from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import OffcanvasComp from "../offcanvas/OffcanvasComp";
import Wallet from "../wallet/Wallet";

import jwtDecode from "jwt-decode";
import _ from "lodash";

function TopNav() {
    const [show, setShow] = useState(false);
    const [signined, setSignined] = useState(false);
    const [tokenUser, setTokenUser, removeCookie] = useCookies(["x_auth"]);

    // console.log("토큰 유저", tokenUser);
    // if (tokenUser === null) {
    //     return <div>asdfasdf</div>;
    // }

    const handleClose = () => setShow(false);
    const handleShow = (e) => setShow(true);

    if (_.isEmpty(tokenUser)) {
        return (
            <>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">Spider Coin 🕷</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav>
                                    <Link to="/blocks">Blocks</Link>
                                </Nav>

                                <Nav>
                                    <Link to="/mempool">Mempool</Link>
                                </Nav>
                                <Nav>
                                    <Link to="/transaction">Transaction</Link>
                                </Nav>
                            </Nav>
                            <Nav>
                                <>
                                    <Nav>
                                        <Link to="/signin">Sign-in</Link>
                                    </Nav>
                                    <Nav>
                                        <Link to="/signup">Sign-up</Link>
                                    </Nav>
                                </>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        );
    } else if (!_.isEmpty(tokenUser)) {
        const user = jwtDecode(tokenUser.x_auth);
        return (
            <>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">Spider Coin 🕷</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav>
                                    <Link to="/blocks">Blocks</Link>
                                </Nav>

                                <Nav>
                                    <Link to="/mempool">Mempool</Link>
                                </Nav>
                                <Nav>
                                    <Link to="/transaction">Transaction</Link>
                                </Nav>
                                <Nav>
                                    <Link to="/peer">Peer</Link>
                                </Nav>
                            </Nav>
                            <Nav>
                                <Nav.Link onClick={handleShow}>MyPage</Nav.Link>
                                <Nav>
                                    <Nav.Link href="/api/user/logout">
                                        Logout
                                    </Nav.Link>
                                </Nav>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <OffcanvasComp
                    show={show}
                    onHide={handleClose}
                    title={user.email}
                    placement={"end"}
                    scroll={true}
                    backdrop={true}
                >
                    <Wallet address={user.address} />
                </OffcanvasComp>
            </>
        );
    }
}

export default TopNav;
