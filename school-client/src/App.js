import React from 'react';
import Login from './components/login';
import Register from './components/register';
import Home from './pages/home';
import Astudents from './pages/sadd';
import Menu1 from './components/menu';
//import logo from './logo.svg';
//import './App.css';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, Image, } from 'semantic-ui-react';

function App() {
  return (
    <div className="App">
    <Router>
  <Route exact path = "/"  component = {Login} />
  <Route path = "/register" component = {Register} />
  <Route path = "/home" component = {Home} />
  <Route path = "/saddf" component = {Astudents} />
  <Route path = "/sadd/edit/:id" component = {Astudents} />
    </Router>
    </div>
  );
}

export default App;
