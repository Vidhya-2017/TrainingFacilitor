import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Buttons from '../../../components/UI_Component/Buttons/Buttons';
import Textbox from '../../../components/UI_Component/Textbox/Textbox';

import '../scss/AssesmentType.scss';

class AssesmentType extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            Duration: '', errors: {}
        }}
    
        //Validation
        validateform() {
            let errors = {};
            let formIsValid = true;
           
            if (this.state.Duration.length !== 10 ) {
                formIsValid = false;
                errors["Duration"] = "Enter Valid Duration"
            }    
            this.setState({ errors: errors });           
            return formIsValid;
        }
    
    
    
        submitForm = () => {
            /* if (this.validateform()) {
                localStorage.setItem("token", 1)
                this.props.history.push('/home')
            } */
            console.log("------------");
        }      
       
       

    render() {
        return (
            <div className="AssesmentType_container">           
            <section className="blue_theme">
                <Container>
                <Row>
                    <Col xs ={12} md = {12} lg="12" >
                    <h2 className="text-center">Assesment Type</h2>
                    <form className="login-form">
                    <Textbox 
                    value = {this.state.value}
                    fieldLabel ="assessment type"
                    id="Duration"
                    type="text"
                    placeholder = "assessment type"                    
                    errorMessage = {this.state.errors.Duration === "" ? null : this.state.errors.Duration }
                    name ="Duration"
                    aria-label="Duration"
                    aria-describedby="Duration"
                    onChange={(val) => {        
                        this.setState({ Duration: val });                      
                   }}
                    />
                                  
                            
                <Col>
               
                <Buttons
                className = "float-right"                
                value="Submit" 
                onClick={this.submitForm}/>
               
             </Col>            
            </form>

            </Col>

           
            </Row>
            </Container>
            </section>
          </div>
        )
    }
}
  

export default AssesmentType;