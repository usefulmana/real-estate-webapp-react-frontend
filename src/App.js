import React, { Fragment, Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/main/Home';
import SearchResults from './components/main/SearchResults';
import PropertyDetail from './components/main/PropertyDetail';
import ProjectDetail from './components/main/ProjectDetail';
import PropertyManager from './components/main/PropertyManager';
import ProjectManager from './components/main/ProjectManager';
import NewPropertyForm from './components/secondary/NewPropertyForm';
import NewProjectForm from './components/secondary/NewProjectForm';
import Default from './components/main/Default';
import Login from './components/main/Login';
import Registration from './components/main/Registration';
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './components/main/Dashboard';
import Test from './components/main/Test';
import { loadUser } from './actions/authActions';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/results" component={SearchResults} />
            <Route path="/propertyDetails/:id" component={PropertyDetail} />
            <Route path="/projectDetails/:id" component={ProjectDetail} />
            <Route exact path="/propertyManager" component={PropertyManager} />
            <Route exact path="/projectManager" component={ProjectManager} />
            <Route exact path="/newProperty" component={NewPropertyForm} />
            <Route exact path="/newProject" component={NewProjectForm} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Registration} />
            <Route exact path="/test" component={Test} />
            <Route component={Default} />
          </Switch>
        </Fragment>
      </Provider>
    );
  }
}

export default App;
