import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HR from './HR/App';
import Admin from './App';
import Login from '../src/Components/Authentication/App'

import {useState} from "react"

if(localStorage.getItem("user-info")){
  
  var userData = JSON.parse(localStorage.getItem('user-info'));

  if(userData.userRoles.userRole == "Admin"){
    ReactDOM.render(
      <Admin/>,
    document.getElementById('root'));

  }

  if(userData.userRoles.userRole == "HR"){
    ReactDOM.render(
      <HR/>,
    document.getElementById('root'));

  }


} else{
  ReactDOM.render(
    <Login/>,
  document.getElementById('root'));
}