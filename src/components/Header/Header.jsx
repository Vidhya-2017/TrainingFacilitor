import React from 'react';
import './scss/Header.scss'
class Header extends React.Component {
  constructor(props) {
    super(props)
  }
  logout(){
   localStorage.clear();
    
  }
 
  render() {
    return (
      <nav className="header navbar navbar-dark">
        <div className="container">
        <h2 className="navbar-brand navLinks_logo">HCL</h2>
        {localStorage.getItem('token') === "1" ?
         <a className="navbar-brand navLinks" style={{color: '#fff', margin: 0}} onClick = {this.logout}>Logout</a> : null
      
      }
      </div>
      </nav>
    )
  }
}

export default Header;