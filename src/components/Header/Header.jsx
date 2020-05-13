import React from 'react';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './scss/Header.scss';
class Header extends React.Component {
  constructor(props) {
    super(props)
  }
  logout(){
   localStorage.clear();
  }
  render() {
    return (
      <>
      {localStorage.getItem('token') === "1"  && this.props !== undefined ? 
      <div className="welcomeDiv">Welcome <b><i>{localStorage.getItem('user') }</i></b> !</div>

: null }
  <Navbar collapseOnSelect className="header" expand="lg"  variant="dark">
  <Navbar.Brand href="/home"className="navLinks_logo" ><Link to="/home" className="navLinks_logo"> HCL</Link></Navbar.Brand>
  {localStorage.getItem('token') === "1"  && this.props !== undefined? 
  <>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
   {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
    </Nav>
    <Nav>
    <Nav.Link><Link to="/sme"> SME List </Link></Nav.Link>
    <Nav.Link><Link to="/skill"> Skill List </Link></Nav.Link>
    <Nav.Link><Link to="/externalTraining"> External Training </Link></Nav.Link>
    <Nav.Link><Link to="/trainingType"> Training Type</Link></Nav.Link>
    <Nav.Link><Link to="/batchMaster"> Batch Master</Link></Nav.Link>
     
   {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown" style={{right: "0", left: "none"}}>
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
    </NavDropdown> */}
      <Nav.Link  onClick ={this.logout}><Link to="/login"> Logout </Link></Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </>
  : null }
</Navbar>

</>
    )
  }
}

export default Header;