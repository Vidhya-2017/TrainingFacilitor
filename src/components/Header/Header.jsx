import React from 'react';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './scss/Header.scss';
class Header extends React.Component {
 
  logout(){
   localStorage.clear();
  }

  render() {
    return (
      <>
      {localStorage.getItem('token') === "1"  && this.props !== undefined ? 
      <div className="welcomeDiv">Signed in as : <b><i>{localStorage.getItem('user') }</i></b> </div>

: null }
  <Navbar className="header" expand="lg"  variant="dark">
  <Navbar className="navbar-brand"><Link to="/home" className="navLinks_logo"> HCL</Link></Navbar>
  {localStorage.getItem('token') === "1"  && this.props !== undefined? 
  <>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
   {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
    </Nav>
    <Nav className="onCollapse">
    <div className="bottom"></div>
    <Nav><Link to="/sme"> SME List </Link></Nav>
    <Nav><Link to="/skill"> Skill List </Link></Nav>
   
    <Nav><Link to="/assesmentType"> assessment type</Link></Nav>
    <Nav><Link to="/trainingCreation"> Training Creation </Link></Nav>
    <NavDropdown title="Training" id="collasible-nav-dropdown" style={{right: "0", left: "none"}}>
    <Nav><Link className="clr_black" to="/externalTraining"> External Training </Link></Nav>
    <Nav><Link className="clr_black" to="/trainingType"> Training Type</Link></Nav>
       <NavDropdown.Divider />
        <Nav><Link className="clr_black" to="/batchMaster">Separated link</Link></Nav>
    </NavDropdown>
    <NavDropdown title="Master" id="collasible-nav-dropdown" style={{right: "0", left: "none"}}>
    <Nav><Link className="clr_black" to="/batchMaster"> Batch Master</Link></Nav>
    <Nav><Link className="clr_black" to="/durationMaster"> duration master </Link></Nav>
    </NavDropdown> 
      <Nav><Link  to="/login" onClick ={this.logout}>Logout </Link></Nav>
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