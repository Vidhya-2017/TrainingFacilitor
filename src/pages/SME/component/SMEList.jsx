import React from 'react';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Buttons from '../../../components/UI_Component/Buttons/Buttons';
import Textbox from '../../../components/UI_Component/Textbox/Textbox';
import '../scss/SMEList.scss'

class SMEList extends React.Component{
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
    
    
    
        submitSMEList = () => {
            if (this.validateform()) {
                localStorage.setItem("token", 1)
                this.props.history.push('/home')
            }
        }      
       
    

    render() {
        return (
            <div className="sme_container">           
            <section className="blue_theme">
                <Container>
                <Row>
                    <Col xs ={12} md = {12} lg="12" >
                    <h2 className="text-center">SME List</h2>
                    <form className="login-form">
                    <Textbox 
                    value = {this.state.value}
                    fieldLabel ="SAP ID"
                    id="sapID"
                    type="text"
                    placeholder = "SAP ID"                    
                    errorMessage = {this.state.errors.sapID === "" ? null : this.state.errors.sapID }
                    name ="sapID"
                    aria-label="SAP ID"
                    aria-describedby="SAP ID"
                    onChange={(val) => {        
                        this.setState({ sapID: val });
                      
                   }}
                    />
                    <Textbox 
                    fieldLabel ="Name"
                    value = {this.state.name}
                    id="name"
                    type="text"
                    placeholder = "Name"                    
                    errorMessage = {this.state.errors.name === "" ? null : this.state.errors.name }
                    name ="name"
                    aria-label="name"
                    aria-describedby="name"
                    onChange={(val) => {        
                        this.setState({ name: val });
                      
                   }}
                    />  
                    <Textbox 
                    fieldLabel ="Phone No"
                    value = {this.state.phone_no}
                    id="phone_no"
                    type="number"
                    placeholder = "Phone No"                    
                    errorMessage = {this.state.errors.phone_no === "" ? null : this.state.errors.phone_no }
                    name ="phone_no"
                    aria-label="phone_no"
                    aria-describedby="phone_no"
                    maxlength = {10}
                    onChange={(val) => {        
                        this.setState({ phone_no: val });                      
                   }}
                    />                   
                            
                <Col>
               
                <Buttons
                className = "float-right"                
                value="Submit" 
                onClick={this.submitSMEList}/>
               
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
  

export default SMEList;