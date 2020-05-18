import axios from 'axios';

const AddSMEList = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/training-facilitator/AddSmeList.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    }
});
const AddSkillList = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/training-facilitator/AddSkillsList.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    }
});
const AddAssesmentTypeList = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/training-facilitator/AssessmentTypesAdd.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    }
});
const AddBatchMaster = axios.create({
    baseURL: 'http://proctor.eastus.cloudapp.azure.com/training-facilitator/AddBatchMaster.php',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    }
});
const clients = {
    AddSMEList: AddSMEList,
    AddSkillList:AddSkillList,
    AddAssesmentTypeList: AddAssesmentTypeList,
    AddBatchMaster: AddBatchMaster
    
}

export default clients;