import React from 'react';

class Footer extends React.Component {

  render() {
    return (
      <footer className="py-4 bg-light mt-auto">
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between small">
          <div className="text-muted">Copyright &copy; HCL 2020</div>
          <div>
           D&A Capability
          </div>
        </div>
      </div>
    </footer>

    )
  }
}

export default Footer;