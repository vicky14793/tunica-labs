import React, { Component } from 'react';
import { Container, Image, Menu, Message, Dropdown, Form } from 'semantic-ui-react';
import './../css/addstudent.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import {SchoolOptions, Division, standards} from './data.js'


class Addstudent extends Component{

  constructor(props){
    super(props);
    this.state = {

        name: '',
        school: '',
        sclass: '',
        division: '',
        status: '',
        dob: '',
        res1: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleDropdown = this.handleDropdown.bind(this)
  }

  onChange(e){
    this.setState({...this.state, [e.target.name]: e.target.value});
  }

  onSubmit(e){
      e.preventDefault();
      if (!this.props.student_id) {
        axios.post('http://localhost:4000/students', this.state)
           .then(
             response =>  {
               this.setState({res1: response.data})
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
           this.setState({name: '',
           school: '',
           sclass: '',
           division: '',
           status: '',
           dob: ''})

      } else {
        axios.put('http://localhost:4000/students/' + this.props.student_id, this.state)
           .then(
             response =>  {
               this.props.push.history.push('/home')
             }
           ).catch(
             error=> {
               console.log(error.response)
             }
           )
      }
  }

  handleDropdown(e, {name, value}){
    this.setState(prevState =>  {
      return {...this.state, [name]: value}
    })
  }

  componentDidMount () {
    if (this.props.student_id) {
      axios.get('http://localhost:4000/students/' + this.props.student_id)
        .then(
          response => {
            console.log(response)
            let finaly = response.data.data[0]
            this.setState(prevState => {
              return {
                ...prevState,
                name: finaly.name,
                school: finaly.school,
                sclass: Number(finaly.sclass),
                division: finaly.division,
                status: String(finaly.status),
                dob: finaly.dob.split('T')[0],
               }
            })
          }
        ).catch(
          error => {
            console.log(error)
          }
        )
    }
  }



render(){
    return(
      <div className='addcomponent'>
        <div className="ui middle aligned center aligned grid">
          <div className="column">
            <u>Add Student</u>
            <br /> <br />
            <form onSubmit = {this.onSubmit} className="ui large form">

              <div className="sage12">
                 <div className="fns">Full Name:</div>
                    <input className="sage1" type="text" name="name" placeholder="Full Name"  value= {this.state.name} onChange = {this.onChange}/>
              </div>
              <div className="sschool12">
                 <div className="fns1">School:</div>
                    <div className="dd1">
                       <Dropdown className="sschool1" name="school"  options={SchoolOptions} placeholder='Select School' value= {this.state.school} onChange={this.handleDropdown}  />
                    </div>
                </div>
              <div className="sclass12">
                  <div className="fns2">class:</div>
                      <div className="dd2">
                        <Dropdown className="sclass1" name="sclass" options={standards} placeholder='Select class' value= {this.state.sclass} onChange={this.handleDropdown}  />
                  </div>
              </div>
              <div className="sdiv12">
                  <div className="fns3">Division:</div>
                     <div className="dd3">
                        <Dropdown className="sdiv1" name="division"  options={Division} placeholder='Select Division' value= {this.state.division} onChange={this.handleDropdown} />
                     </div>
              </div>
              <div className="sdate12">
                  <div className="fns4">DOB:</div>
                     <div className="dd4">
                        <input className="dd4"  name="dob" type="date" placeholder='Select DOB' value= {this.state.dob} onChange = {this.onChange} />
                      </div>
              </div>
              <div className="sstatus12">
                Status:
                    <div className="dd5">
                       <Form.Group inline>
                            <Form.Radio
                             label='Active'
                             name='status'
                             value="true"
                             checked={this.state.status === 'true'}
                             onChange={this.handleDropdown}
                           />
                          <Form.Radio
                          label='Inactive'
                          name='status'
                          value="false"
                          checked={this.state.status === 'false'}
                          onChange={this.handleDropdown}
                           />
                       </Form.Group>
                  </div>
              </div>
          <div className="ssubmit12">
             <button type="submit" className = "btn btn-primary btn-lg" >
               Submit
            </button>
          </div>
          <br />
          {this.state.res1 &&

            <Message positive>
               <Message.Header>Success:</Message.Header>
                  <p>{this.state.res1}</p>
               </Message>
           }
        </form>
    </div>
  </div>
</div>
    )
  }
}








export default Addstudent;
