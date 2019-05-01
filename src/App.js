import React, {Fragment} from 'react';
import {Switch, Route} from 'react-router-dom'
import './App.css';
import Home from './components/main/Home';
import SearchResults from './components/main/SearchResults';
import PropertyDetail from './components/main/PropertyDetail';
import ProjectDetail from './components/main/ProjectDetail';
import PropertyManager from './components/main/PropertyManager';
import ProjectManager from './components/main/ProjectManager';
import Default from './components/main/Default';
import Login from './components/main/Login';
import Registration from './components/main/Registration';

function App() {
  return (
    <Fragment>
      <Switch>
        <Route exact path ='/' component={Home}/>
        <Route exact path ='/results' component={SearchResults}/>
        <Route  path ='/propertyDetails/:id' component={PropertyDetail}/>
        <Route  path ='/projectDetails/:id' component={ProjectDetail}/>
        <Route exact path ='/propertyManager' component={PropertyManager}/>
        <Route exact path ='/projectManager' component={ProjectManager}/>
        <Route exact path ='/login' component={Login}/>
        <Route exact path ='/register' component={Registration}/>
        <Route component={Default}/>
      </Switch>
    </Fragment>
  );
}

export default App;
