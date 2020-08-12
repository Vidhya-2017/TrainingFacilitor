import React from 'react';
import { withRouter } from 'react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import combineReducers from "./reducers/index";
import { PersistGate } from 'redux-persist/integration/react';
import PrivateRoute from './PrivateRoute'
import RegisterContainer from './pages/Registration/container/RegisterContainer';
import LoginContainer from './pages/Login/container/LoginContainer';
// import ForgetPassword from './pages/ForgetPassword/ForgetPassword';
import SMEListContainer from './pages/SME/container/SMEListContainer';
import SkillListContainer from './pages/Skill/container/SkillListContainer';
import TrainingCreationContainer from './pages/TrainingCreation/container/TrainingCreationContainer';
import ForgetPasswordContainer from './pages/ForgetPassword/container/ForgetPasswordContainer';
import ExternalTrainingContainer from './pages/ExternalTraining/container/ExternalTrainingContainer';
import TrainingTypeContainer from './pages/TrainingType/container/TrainingTypeContainer';
import BatchMasterContainer from './pages/BatchMaster/container/BatchMasterContainer';
import DurationMasterContainer from './pages/DurationMaster/container/DurationMasterContainer';
import AssesmentTypeContainer from './pages/AssesmentType/container/AssesmentTypeContainer';
import CandidateRegistrationContainer from './pages/CandidateRegistration/container/CandidateRegistrationContainer';
import Home from './pages/Home/container/HomeContainer';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.scss';

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, combineReducers)
const composeEnhancers = compose;

// let store = createStore(persistedReducer, 
//   applyMiddleware(thunk)
// );

let store = createStore(persistedReducer, composeEnhancers(
  applyMiddleware(thunk)
));

let persistor = persistStore(store);


class App extends React.Component {

  render() {
    return (
      <div className='appContainer'>
        <div className='spinnerWrapper hide'>
          <Spinner className='spinner' animation="grow" variant="primary" />
        </div>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Header />
            <div className='routerContent'>
               <Switch>
              {/* <Route path="" exact component={LoginContainer} /> */}
              <Route path="/register" exact component={RegisterContainer} />
              <Route path="/login" component={LoginContainer} />
              <Route path="/trainingCreation" component={TrainingCreationContainer} />
              <Route path="/forgetPassword" component={ForgetPasswordContainer} />
              <Route path="/sme" component={SMEListContainer} /> 
              <Route path="/skill" component={SkillListContainer} />             
              <Route path="/externalTraining" component={ExternalTrainingContainer} />
              <Route path="/trainingType" component={TrainingTypeContainer} />
              <Route path="/batchMaster" component={BatchMasterContainer} />              
              <Route path="/durationMaster" component={DurationMasterContainer} />
              <Route path="/assesmentType" component={AssesmentTypeContainer} />   
              {/* <Route path="/home" component={Home} />    */}
              <PrivateRoute component={Home} path="/home"  />
              <Route path="/candidateRegistration" component={CandidateRegistrationContainer} />  
            </Switch>
            </div>
            <Footer />
          </PersistGate>
        </Provider>
      </div>
    );
  }
}

export default withRouter(App);
