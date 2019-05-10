import React, { Fragment, Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import './App.css';
import Home from './components/main/Home';
import SearchResults from './components/main/SearchResults';
import PropertyDetail from './components/main/PropertyDetail';
import ProjectDetail from './components/main/ProjectDetail';
import PropertyManager from './components/main/PropertyManager';
import ProjectManager from './components/main/ProjectManager';
import PropertyForm from './components/secondary/PropertyForm';
import ProjectForm from './components/secondary/ProjectForm';
import Default from './components/main/Default';
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './components/main/Dashboard';
import { loadUser } from './actions/authActions';
import Test from './components/main/Test';


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
            <Route path="/propertyDetails/:id" component={PropertyDetail} />
            <Route path="/projectDetails/:id" component={ProjectDetail} />
            <Route path="/results/:query" component={(props) => (
              <SearchResults timestamp={new Date().toString()} {...props} />
            )}/>
            <Route exact path="/propertyManager" component={PropertyManager} />
            <Route exact path="/projectManager" component={ProjectManager} />
            <Route exact path="/newProperty" component={PropertyForm} />
            <Route exact path="/newProject" component={ProjectForm} />
            <Route exact path="/dashboard" component={Dashboard} /> 
            <Route exact path = "/test" component ={Test}/> 
            <Route component={Default} />
          </Switch>
        </Fragment>
      </Provider>
    );
  }
}

export default withRouter(App);
