import React from 'react';
import './scss/Header.scss'
class Header extends React.Component {
  constructor(props) {
    super(props)
    console.log(props);
  }
  logout(){
    console.log('sdfs');
    localStorage.clear();
    
  }
  render() {
    return (
      <nav class="navbar navbar-dark" style={{backgroundColor: 'rgb(27, 145, 229)'}}>
        <p class="navbar-brand navLinks" style={{color: '#fff', margin: 0}}>Training Facilitor</p>
        {localStorage.getItem('token') === "1" ?
         <a class="navbar-brand navLinks" style={{color: '#fff', margin: 0}} onClick = {this.logout}>Logout</a> : null
      
      }
      </nav>
    )
  }
}

export default Header;