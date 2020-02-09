import React, { Component } from 'react';
//import { Container, Image, Menu, Grid } from 'semantic-ui-react';
import Menu1 from './../components/menu';
import Menu2 from './../components/menu2';
import Addstudent from './../components/addstudent';
//import Grid1 from './../components/grid';
import './../css/sadd.css';

class Astudents extends Component {


  render () {
    return (
             <div>
                <div> <Menu1 routes={this.props}/> </div>
                <div className="abcd">
                    <Menu2 />
                  <div className="w1"><Addstudent student_id={this.props.match.params.id} push={this.props}/></div>
                </div>
             </div>

           )
       }
   }

export default Astudents;
