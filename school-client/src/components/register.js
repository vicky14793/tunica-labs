import React, { Component } from 'react';
import { Container, Image, Menu, Message } from 'semantic-ui-react';
import './../css/register.css';
import axios from 'axios';
import { connect } from 'react-redux';
//import {register1} from './../actions/actions_auth'
//import PropTypes from 'prop-types'

import {BrowserRouter as Router, Route } from 'react-router-dom';

class Register extends Component{
  constructor(props){
    super(props);
    this.state = {
        fullname: '',
        email: '',
        password: '',
        phone: '',
        res1: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e){
    this.setState({...this.state, [e.target.name]: e.target.value});
  }

  onSubmit(e){
    e.preventDefault();
    axios.post('http://localhost:4000/users', this.state)
       .then(
         res =>  {
           console.log(res.data)
          this.setState({res1: res.data})
         }
       ).catch(
         error => {
           console.log(error)
       },
       setTimeout(() => {
       this.setState({
         res1: ''
       });
     }, 5000)
       );
       e.preventDefault();
       this.setState({fullname: '',
       email: '',
       password: '',
       phone: ''})

  }
  render(){
    return(
<div className='Login-component1'>
      <div class="ui middle aligned center aligned grid">
         <div class="column">
            <font size="200" color="red">
               <div class="content">
                 <br />  Tunica Labs
               </div>
            </font>
          <br />
            <form onSubmit = {this.onSubmit} class="ui large form">
                <div class="ui stacked secondary  segment">
                  <div class="field">
                  Create a new account
                  </div>
                  <div class="field">
                     <div class="ui left icon input">
                       <i class="user icon"></i>
                          <input value= {this.state.fullname} onChange = {this.onChange} type="text" name="fullname" placeholder="Name" />
                      </div>
                  </div>
                  <div class="field">
                    <div class="ui left icon input">
                      <i class="envelope icon"></i>
                        <input value= {this.state.email} onChange = {this.onChange} type="text" name="email" placeholder="E-mail address" />
                    </div>
                  </div>
                 <div class="field">
                   <div class="ui left icon input">
                       <i class="lock icon"></i>
                         <input value= {this.state.password} onChange = {this.onChange} type="password" name="password" placeholder="Password" />
                  </div>
                </div>
                <div class="field">
                  <div class="ui left icon input">
                      <i class="phone icon"></i>
                        <input value= {this.state.phone} onChange = {this.onChange} type="text" pattern="[0-9]{10}" name="phone" placeholder="Phone Number" />
                 </div>
               </div>
                       <button type="submit" className = "btn btn-primary btn-lg" >
                       Submit
                      </button>
                      <br />
                      {this.state.res1 &&

                        <Message positive>
               <Message.Header>Success:</Message.Header>
               <p>{this.state.res1}</p>
             </Message>
                      }
            </div>
        </form>
      </div>
    </div>
</div>
    )
  }
}

export default Register;
