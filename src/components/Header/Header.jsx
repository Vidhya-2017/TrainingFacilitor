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
      <div className="welcomeDiv">Signed in as : <b><i>{localStorage.getItem('user') }</i></b> </div>

: null }
  <Navbar className="header" expand="lg"  variant="dark">
  <Navbar.Brand href="/home"className="navLinks_logo" ><Link to="/home" className="navLinks_logo"> HCL</Link></Navbar.Brand>
  {localStorage.getItem('token') === "1"  && this.props !== undefined? 
  <>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
   {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
    </Nav>
    <Nav className="onCollapse">
    <div class="bottom"></div>
    <Nav><Link to="/sme"> SME List </Link></Nav>
    <Nav><Link to="/skill"> Skill List </Link></Nav>
   
    <Nav><Link to="/assesmentType"> assessment type</Link></Nav>
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