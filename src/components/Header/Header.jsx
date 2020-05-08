import React from 'react';

class Header extends React.Component {

  render() {
    return (
      <nav class="navbar navbar-dark" style={{backgroundColor: '#e3f2fd'}}>
        <p class="navbar-brand" style={{color: '#000', margin: 0}}>Training Facilitor</p>
      </nav>
    )
  }
}

export default Header;