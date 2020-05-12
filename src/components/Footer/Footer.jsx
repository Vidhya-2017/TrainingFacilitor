import React from 'react';

class Footer extends React.Component {

  render() {
    return (
      <nav class="navbar fixed-bottom navbar-dark" style={{backgroundColor: 'rgba(253, 178, 137, 0.19)'}}>
        <p class="navbar-brand" style={{color: '#000', fontSize:"10px", margin: 0}}>Copyrights @ HCL</p>
      </nav>
    )
  }
}

export default Footer;