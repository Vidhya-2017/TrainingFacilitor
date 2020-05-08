import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../scss/Registration.scss'

class Registration extends React.Component{

    render() {
        return (
            <div className="signup_container">
           
            <section className="signup-block">
                <Container>
                    
                <Row xs ={12} md = {12} className ="card">
                    <Col className="login-sec">
                    <h2 className="text-center">Sign Up Now</h2>
                    <form className="login-form">
                    <Col>
                        <label className="text-uppercase">First Name</label>
                        <InputGroup className="mb-3">                           
                        <FormControl
                        placeholder="First Name"
                        aria-label="fName"
                        aria-describedby="basic-addon1"
                        type = "text"
                        />
                        </InputGroup>                        
                    </Col>
                  
                    <Col>
                        <label className="text-uppercase">Last Name</label>
                        <InputGroup className="mb-3">                           
                        <FormControl
                        placeholder="Last Name"
                        aria-label="lName"
                        aria-describedby="basic-addon1"
                        type = "text"
                        />
                        </InputGroup>
                        
                    </Col>
                    
                    <Col>
                        <label className="text-uppercase">Email ID</label>
                        <InputGroup className="mb-3">                           
                        <FormControl
                        placeholder="Last Name"
                        aria-label="lName"
                        aria-describedby="basic-addon1"
                        type = "text"
                        />
                        </InputGroup>
                        
                    </Col>
                    <Col>
                        <label className="text-uppercase">Password</label>
                        <InputGroup className="mb-3">               
                        <FormControl
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        type = "password"
                        />
                        </InputGroup>
                    </Col> 
                    <Col>
                        <label className="text-uppercase">Confirm Password</label>
                        <InputGroup className="mb-3">               
                        <FormControl
                        placeholder="Confirm Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        type = "password"
                        />
                        </InputGroup>
                    </Col>            
                <Col>
               
                <Button type="submit" className="btn-login float-right">Submit</Button>
             </Col>            
            </form>

            <Col className="copy-text">Already Have an account <i className="fa fa-heart"></i>  <a href="#">Login Here</a></Col>
            </Col>    
                  
            </Row>
            </Container>
            </section>
          </div>
        )
    }
}


export default Registration;