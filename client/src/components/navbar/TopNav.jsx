import React, { useState } from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import OffcanvasComp from "../offcanvas/OffcanvasComp";
import Wallet from "../wallet/Wallet";

function TopNav() {
	const [show, setShow] = useState(false);
  const [signined, setSignined] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = (e) => setShow(true);

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
								<Link to="/utxo">UTXO</Link>
							</Nav>
						</Nav>
						<Nav>
              <Nav.Link onClick={handleShow}>MyPage</Nav.Link>
							{signined ? (
								<Nav.Link onClick={handleShow}>MyPage</Nav.Link>
							) : (
                <>
                <Nav>
                  <Link to="/signin">Sign-in</Link>
                </Nav>
                <Nav>
                  <Link to="/signup">Sign-up</Link>
                </Nav>
                </>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<OffcanvasComp
				show={show}
				onHide={handleClose}
				title={"Wallet"}
				placement={"end"}
				scroll={true}
				backdrop={true}
			>
				<Wallet />
			</OffcanvasComp>
		</>
	);
}

export default TopNav;
