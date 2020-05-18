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
            skillName: '', sucessMessage: '', errors: {}
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
        submitSkillList = (e) => {
            e.preventDefault();
            if (this.validateform()) {
            var date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
            const details ={
                skill_name: this.state.skillName,
                created_by: 1, 
                created_date: date
            }
              this.props.setAddSkillList(details);   
              setTimeout(
                function() {
                    this.setState({               
                        sucessMessage: "Data saved sucessfully!",
                        skillName: '',
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
            <div className="SkillList_container">           
            <section className="blue_theme">
                <Container>
                <Row>
                    <Col xs ={12} md = {12} lg="12" >
                    <h2 className="text-center">Skill List</h2>
                    {this.state.sucessMessage !== "" ? <p className="sucessMessage">{this.state.sucessMessage}</p> : null }
                    <form className="login-form">
                    <Textbox 
                    value = {this.state.skillName}
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