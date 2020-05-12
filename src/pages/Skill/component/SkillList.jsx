import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Buttons from '../../../components/UI_Component/Buttons/Buttons';
import Textbox from '../../../components/UI_Component/Textbox/Textbox';
import '../scss/SkillList.scss'

class SkillList extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            skillName: '', errors: {}
        }}
    
        //Validation
        validateform() {
            let errors = {};
            let formIsValid = true;
            if (this.state.skillName.length === 0) {
                formIsValid = false;
                errors["skillName"] = "Enter Valid Skill Name"
            }
            
    
            this.setState({ errors: errors });
           
            return formIsValid;
        }
    
    
    
        submitSkillList = () => {
            if (this.validateform()) {
                localStorage.setItem("token", 1)
                this.props.history.push('/home')
            }
        }      
       
    

    render() {
        return (
            <div className="SkillList_container">           
            <section className="blue_theme">
                <Container>
                <Row>
                    <Col xs ={12} md = {12} lg="12" >
                    <h2 className="text-center">Skill List</h2>
                    <form className="login-form">
                    <Textbox 
                    value = {this.state.value}
                    fieldLabel ="Skill Name"
                    id="skillName"
                    type="text"
                    placeholder = "Skill Name"                    
                    errorMessage = {this.state.errors.skillName === "" ? null : this.state.errors.skillName }
                    name ="skillName"
                    aria-label="Skill Name"
                    aria-describedby="Skill Name"
                    onChange={(val) => {        
                        this.setState({ skillName: val });
                      
                   }}
                    />
                                  
                            
                <Col>
               
                <Buttons
                className = "float-right"                
                value="Submit" 
                onClick={this.submitSkillList}/>
               
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
  

export default SkillList;