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
            assType: '', sucessMessage: '', errorMessage:'', errors: {}
        }}
    
        //Validation
        validateform() {
            let errors = {};
            let formIsValid = true;
           
            if (this.state.assType.length === 0 ) {
                formIsValid = false;
                errors["assType"] = "Enter Valid assessment type"
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
           
              this.props.setAddAssesmentTypeList(details); 
              setTimeout(
                function() {
                    if(this.props.AssesmentTypeList.AssesmentTypeList.errCode === 200){
                        this.setState({               
                            sucessMessage: "Data saved sucessfully!",
                            assType: '',
                            }) 
                        }
                        else{
                            this.setState({               
                                errorMessage: "Error in saving Data!",
                                assType: '',
                                }) 
                            }
                }.bind(this),1500);              
                this.dissmissModel();
            }  
        }
        dissmissModel = () =>{
            setTimeout(
                function() {
                    this.setState({sucessMessage: "", errorMessage:''});
                }.bind(this),
            4000);
        }      
       
    
        

    render() {
        return (
            <div className="AssesmentType_container">           
            <section className="blue_theme">
                <Container>
                <Row>
                    <Col xs ={12} md = {12} lg="12" >
                    <h2 className="text-center">Assesment Type</h2>
                    {this.state.sucessMessage !== "" ? <p className="sucessMessage">{this.state.sucessMessage}</p> : null }
                    {this.state.errorMessage !== "" ? <p className="errorMessage">{this.state.errorMessage}</p> : null }
                    <form className="login-form">
                    <Textbox 
                    value = {this.state.assType}
                    fieldLabel ="assessment type"
                    id="assType"
                    type="text"
                    placeholder = "assessment type"                    
                    errorMessage = {this.state.errors.assType === "" ? null : this.state.errors.assType }
                    name ="assType"
                    aria-label="Duration"
                    aria-describedby="Duration"
                    onChange={(e) => {        
                        this.setState({ assType: e.target.value });                      
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