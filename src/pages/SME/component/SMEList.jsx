import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Buttons from '../../../components/UI_Component/Buttons/Buttons';
import Textbox from '../../../components/UI_Component/Textbox/Textbox';
import '../scss/SMEList.scss';

class SMEList extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            name: '', sapid: '',phone_number:'', sucessMessage: '', SMEList:[],  errors: {}
        }}
    
        //Validation
        validateform() {
            let errors = {};
            let formIsValid = true;
            if (this.state.sapid.length === 0) {
                formIsValid = false;
                errors["sapid"] = "Enter Valid sap ID"
            }
            if (this.state.name.length === 0) {
                formIsValid = false;
                errors["name"] = "Enter Valid name"
            }
            if (this.state.phone_number.length === 0 ) {
                formIsValid = false;
                errors["phone_number"] = "Enter Valid phone no"
            }
            this.setState({ errors: errors });
            return formIsValid;
        }
    
        submitSMEList = (e) => {
         e.preventDefault();
            if (this.validateform()) {
            var date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
            const details ={
                sapid: this.state.sapid,
                name: this.state.name,
                phone_number: this.state.phone_number,
                created_by: 1,
                created_date : date
            }
              this.props.setAddSMEList(details);   
              setTimeout(
                function() {
                    this.setState({               
                        sucessMessage: "Data saved sucessfully!",
                        sapid: '',
                        name: "",
                        phone_number: "",
                        }) 
                }.bind(this),1500);              
                this.dissmissModel();
            }  
        }
        dissmissModel = () =>{
            setTimeout(
                function() {
                    this.setState({sucessMessage: ""});
                }.bind(this),
            4000);
        }  
   

    render() {
       const {sapid, name, phone_number } = this.state;      
        return (
            <div className="sme_container">           
            <section className="blue_theme">
                <Container>
                <Row>
                    <Col xs ={12} md = {12} lg="12" >
                    <h2 className="text-center">SME List</h2>
                    {this.state.sucessMessage !== "" ? <p className="sucessMessage">{this.state.sucessMessage}</p> : null }
                    <form className="login-form">
                    <Textbox 
                    value = {sapid}
                    fieldLabel ="SAP ID"
                    id="sapid"
                    type="text"
                    placeholder = "SAP ID"                    
                    errorMessage = {this.state.errors.sapid === "" ? null : this.state.errors.sapid }
                    name ="sapid"
                    aria-label="SAP ID"
                    aria-describedby="SAP ID"
                    onChange={(val) => {        
                        this.setState({ sapid: val });
                   }}
                    />
                    <Textbox 
                    fieldLabel ="Name"
                    value = {name}
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
                    value = {phone_number}
                    id="phone_number"
                    type="number"
                    placeholder = "Phone No"                    
                    errorMessage = {this.state.errors.phone_number === "" ? null : this.state.errors.phone_number }
                    name ="phone_number"
                    aria-label="phone number"
                    aria-describedby="phone number"
                    maxlength = {10}
                    onChange={(val) => {        
                        this.setState({ phone_number: val });                      
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
