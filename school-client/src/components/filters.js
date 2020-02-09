import React, { Component } from 'react';
import { Container, Image, Menu, Message, Dropdown } from 'semantic-ui-react';
import './../css/filters.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import {SchoolOptions, Division, standards} from './data.js'
class Filters extends Component{
  constructor(props){
    super(props);
    this.state = {

        name: '',
        school: '',
        sclass: '',
        division: '',
        status: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleDropdown = this.handleDropdown.bind(this)
  }

  onChange(e){
    this.setState({...this.state, [e.target.name]: e.target.value});
  }

  onSubmit(e){
    e.preventDefault()
    this.props.handleFilter(this.state)
    e.preventDefault();
    this.setState({name: '',
    school: '',
    sclass: '',
    division: '',
    status: ''})

  }

  handleDropdown(e, {name, value}){
    this.setState(prevState =>  {
      return {...this.state, [name]: value}
    })
  }

  render(){
    return(
<div>
  <form onSubmit = {this.onSubmit} >
      <input className="sname" type="text" name="name" placeholder="Name" value= {this.state.name} onChange = {this.onChange}/>
      <Dropdown className="sschool" name="school" placeholder='Select School' options={SchoolOptions} value= {this.state.school} onChange={this.handleDropdown} />
      <Dropdown className="sclass" name="sclass" placeholder='Select Class' options={standards} value= {this.state.sclass} onChange={this.handleDropdown}/>
      <Dropdown className="sdiv" name="division" placeholder='Select Division' options={Division}  value= {this.state.division} onChange={this.handleDropdown}/>
      <button type="submit" className="searchb" > Search </button>
  </form>
</div>
    )
  }
}
export default Filters;
