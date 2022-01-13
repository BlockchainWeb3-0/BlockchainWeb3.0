import React from "react";
import {Nav, Navbar, Container, NavDropdown} from "react-bootstrap"
import { Link } from "react-router-dom";



function TopNav() {  
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<Container>
					<Navbar.Brand href="#home">Spider Coin 🕷</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link>Blocks</Nav.Link>
							<Nav.Link>Mining</Nav.Link>
							<NavDropdown title="Transaction" id="collasible-nav-dropdown">
								<NavDropdown.Item>Mempool</NavDropdown.Item>
								<NavDropdown.Item>UTXO</NavDropdown.Item>
								{/* <NavDropdown.Divider /> */}
							</NavDropdown>
						</Nav>
						<Nav>
							<Nav.Link>MyPage</Nav.Link>
							<Nav.Link>Sign-in</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
      {/* <Link to="/sign">test</Link> */}

    </>
  )
}

export default TopNav
