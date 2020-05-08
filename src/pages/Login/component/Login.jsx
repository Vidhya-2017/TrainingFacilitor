import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../scss/Login.scss'

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            password: '', userName: '', errors: {}
        }
    }

    //Validation
    validateform() {
        let errors = {};
        let formIsValid = true;
        if (this.state.userName.length === 0) {
            formIsValid = false;
            errors["username"] = "Enter Valid User Name"
        }
        if (this.state.password.length === 0) {
            formIsValid = false;
            errors["password"] = "Enter Valid password"
        }

        this.setState({ errors: errors });
        return formIsValid;
    }



    login = () => {
        if (this.validateform()) {
            localStorage.setItem("token", 1)
            this.props.history.push('/home')
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value, errors: {} });
    };


    render() {
        return (
            <div className="login_container">

                <section className="login-block">
                    <Container>
                        <Row>
                            <Col xs={12} md={6} lg="4" className="login-sec">
                                <h2 className="text-center">Login Now</h2>
                                <form className="login-form">
                                    <Col className="form-group">
                                        <label className="text-uppercase">Username</label>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                onChange={this.handleChange}
                                                name="userName"
                                                placeholder="Username"
                                                aria-label="username"
                                                aria-describedby="basic-addon1"
                                                type="text"
                                            />
                                        </InputGroup>
                                        <div className="errorMsg">{this.state.errors.username}</div>
                                    </Col>
                                    <Col className="form-group">
                                        <label className="text-uppercase">Password</label>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                onChange={this.handleChange}
                                                placeholder="Password"
                                                aria-label="Password"
                                                aria-describedby="basic-addon1"
                                                type="password"
                                                name="password"
                                            />
                                        </InputGroup>
                                        <div className="errorMsg">{this.state.errors.password}</div>
                                    </Col>
                                    <Col className="form-check">
                                        <label className="form-check-label">
                                            <a href="#"><small>Forget Password ?</small></a>
                                        </label>
                                        <Button className="btn-login float-right" onClick={this.login}>Submit</Button>
                                    </Col>
                                </form>

                                <Col className="copy-text">Created with <i className="fa fa-heart"></i> by <a href="#">HCL.com</a></Col>
                            </Col>

                            <Col xs={12} md={6} lg="8" className=" banner-sec">
                                <Row>

                                    <img className="" src="https://static.pexels.com/photos/33972/pexels-photo.jpg" alt="" />
                                    <Col className="carousel-caption  d-md-block">
                                        <Col className="banner-text">
                                            <h2>Welcome</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                                        </Col>

                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        )
    }
}


export default Login;