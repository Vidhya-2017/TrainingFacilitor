import React from 'react';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Buttons from '../../../components/UI_Component/Buttons/Buttons';
import Textbox from '../../../components/UI_Component/Textbox/Textbox';
import '../scss/TrainingType.scss'

class TrainingType extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            name: '', sapID: '',phone_no:'', errors: {}
        }}
    
        //Validation
        validateform() {
            let errors = {};
            let formIsValid = true;
            if (this.state.sapID.length === 0) {
                formIsValid = false;
                errors["sapID"] = "Enter Valid sap ID"
            }
            if (this.state.name.length === 0) {
                formIsValid = false;
                errors["name"] = "Enter Valid name"
            }
            if (this.state.phone_no.length !== 10 ) {
                formIsValid = false;
                errors["phone_no"] = "Enter Valid phone no"
            }
            
    
            this.setState({ errors: errors });
           
            return formIsValid;
        }
    
    
    
        submitForm = () => {
           {/* if (this.validateform()) {
                localStorage.setItem("token", 1)
                this.props.history.push('/home')
            }*/}
            console.log("-----------");
        }      
       
    

    render() {
        return (
            <div className="training_type_container">           
            <section className="blue_theme">
                <Container>
                <Row>
                    <Col xs ={12} md = {12} lg="12" >
                    <h2 className="text-center">Training Type</h2>
                    <form className="login-form">
                    <Textbox 
                    value = {this.state.value}
                    fieldLabel ="Type"
                    id="sapID"
                    type="text"
                    placeholder = "Type"                    
                    errorMessage = {this.state.errors.sapID === "" ? null : this.state.errors.sapID }
                    name ="sapID"
                    aria-label="SAP ID"
                    aria-describedby="SAP ID"
                    onChange={(val) => {        
                        this.setState({ sapID: val });
                      
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
  

export default TrainingType;