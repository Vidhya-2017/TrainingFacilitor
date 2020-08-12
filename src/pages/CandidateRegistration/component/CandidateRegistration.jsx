import React from 'react';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Buttons from '../../../components/UI_Component/Buttons/Buttons';
import Textbox from '../../../components/UI_Component/Textbox/Textbox';
import SelectOne from '../../../components/UI_Component/Select/SelectOne';
import DateTimePicker from '../../../components/UI_Component/DateTimePicker/DateTimePicker';

import '../scss/CandidateRegistration.scss'

const locationList = [
    {"id":"25","locationName":"Australia"},
    {"id":"26","locationName":"Chennai"},
    {"id":"28","locationName":"Spain"},
    {"id":"32","locationName":"Chennai"}]
class BatchMaster extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            expectedjoiningdate: new Date(),
            sapid: '', firstname:'' ,lastname:'' ,email:'' ,phoneno:'' ,location: '',lob:'' ,account:'' , endDate: new Date(), errors: {}
        }}
    
        //Validation
        validateform() {
            let errors = {};
            let formIsValid = true;
            if (this.state.sapid.length === 0) {
                formIsValid = false;
                errors["sapid"] = "Enter Valid SAP ID"
            }
            if (this.state.location.length === 0) {
                formIsValid = false;
                errors["location"] = "Enter Valid location"
            }
            if (this.state.batchNM.length !== 10 ) {
                formIsValid = false;
                errors["batchNM"] = "Enter Valid Batch NM"
            }    
            this.setState({ errors: errors });           
            return formIsValid;
        }
    
    
    
        submitForm = (e) => {
            e.preventDefault();
            if (this.validateform()) {
            var date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
            const details ={
                assesment_type_name: this.state.assType,
                created_by: 1, 
                updated_by: 1,
                created_date: date
            }
              this.props.setAddBatchMasterList(details);   
              setTimeout(
                function() {
                    this.setState({               
                        sucessMessage: "Data saved sucessfully!",
                        assType: '',
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
        return (
            <div className="batchMaster_container">           
            <section className="blue_theme">
                <Container>
                <Row>
                <Col xs ={12} md = {12} lg="12" >
                    <h2 className="text-center">Candidate Registration</h2>                   
                </Col>
                </Row>
                <Col xs ={12} md = {12} lg="12" >
                <form className="">
                <Row>
                <Col xs ={12} md = {12} lg="6" >
                <Textbox 
                    value = {this.state.sapid}
                    fieldLabel ="SAP ID"
                    id="sapid"
                    type="number"
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
                    value = {this.state.firstname}
                    fieldLabel ="First Name"
                    id="firstname"
                    type="text"
                    placeholder = "First Name"                    
                    errorMessage = {this.state.errors.firstname === "" ? null : this.state.errors.firstname }
                    name ="firstname"
                    aria-label="First Name"
                    aria-describedby="First Name"
                    onChange={(val) => {        
                        this.setState({ firstname: val });
                      
                   }}
                    />

                    <Textbox 
                    value = {this.state.lastname}
                    fieldLabel ="Last Name"
                    id="lastname"
                    type="text"
                    placeholder = "Last Name"                    
                    errorMessage = {this.state.errors.lastname === "" ? null : this.state.errors.lastname }
                    name ="lastname"
                    aria-label="Last Name"
                    aria-describedby="Last Name"
                    onChange={(val) => {        
                        this.setState({ lastname: val });
                      
                   }}
                    />

                    <Textbox 
                    value = {this.state.email}
                    fieldLabel ="Email ID"
                    id="email"
                    type="email"
                    placeholder = "Email ID"                    
                    errorMessage = {this.state.errors.email === "" ? null : this.state.errors.email }
                    name ="email"
                    aria-label="Email ID"
                    aria-describedby="Email ID"
                    onChange={(val) => {        
                        this.setState({ email: val });
                      
                   }}
                    />

                    <Textbox 
                    value = {this.state.phoneno}
                    fieldLabel ="Mobile No"
                    id="phoneno"
                    type="number"
                    placeholder = "Mobile No"                    
                    errorMessage = {this.state.errors.phoneno === "" ? null : this.state.errors.phoneno }
                    name ="phoneno"
                    aria-label="Mobile No"
                    aria-describedby="Mobile No"
                    onChange={(val) => {        
                        this.setState({ phoneno: val });
                      
                   }}
                    />

                   
                </Col>
                <Col xs ={12} md = {12} lg="6" >

                <SelectOne 
                     fieldLabel ="Location"
                    id="location"             
                    name="location"                
                    placeholder="Location"
                    aria-label="location"
                    aria-describedby="location"               
                    size = "1"
                    list = {locationList}
                    onChange={(val) => {        
                        this.setState({ location: val });
                      
                   }}
                   errorMessage = {this.state.errors.location === "" ? null : this.state.errors.location }
                   />

                    <SelectOne 
                     fieldLabel ="LOB"
                    id="lob"             
                    name="lob"                
                    placeholder="LOB"
                    aria-label="lob"
                    aria-describedby="lob"               
                    size = "1"
                    list = {locationList}
                    onChange={(val) => {        
                        this.setState({ lob: val });
                      
                   }}
                   errorMessage = {this.state.errors.lob === "" ? null : this.state.errors.lob }
                   />
                                      
                <SelectOne 
                     fieldLabel ="Account"
                    id="account"             
                    name="account"                
                    placeholder="Account"
                    aria-label="account"
                    aria-describedby="account"               
                    size = "1"
                    list = {locationList}
                    onChange={(val) => {        
                        this.setState({ account: val });
                      
                   }}
                   errorMessage = {this.state.errors.account === "" ? null : this.state.errors.account }
                   />

                
                <DateTimePicker 
                  fieldLabel="Expected Joining Date"
                  isdisabled ="false"
                  minDate ={new Date()}
                  maxDays ={8}
                  showDate= {this.state.expectedjoiningdate}
                  onChange = {(val) => {        
                    this.setState({ expectedjoiningdate: val });                      
                  }}
                  />                  
                  <DateTimePicker 
                  fieldLabel="Planned Start Date"
                  isdisabled ="true"
                  showDate= {this.state.startDate}
                  onChange = {(val) => {        
                    this.setState({ startDate: val });                      
                  }}
                  />
                   
                   
                </Col>
                </Row>
                <Row>
                <Col>
                <Col>
                <Buttons
                className = "float-right"                
                value="Submit" 
                onClick={this.submitForm}/>
                </Col>
                </Col>
                </Row>
                </form>
                </Col>  
                          
           
                  
           
            
            </Container>
            </section>
          </div>
        )
    }
}
  

export default BatchMaster;