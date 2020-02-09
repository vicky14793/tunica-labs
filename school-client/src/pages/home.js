import React, { Component } from 'react';
//import { Container, Image, Menu, Grid } from 'semantic-ui-react';
import Menu1 from './../components/menu';
import Menu2 from './../components/menu2';
import Filters from './../components/filters';
import Table1 from './../components/table';
import Pagination1 from './../components/pagination';
//import Grid1 from './../components/grid';
import './../css/home.css';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
        name: '',
        school: '',
        sclass: '',
        division: ''
      }

      this.handleFilter = this.handleFilter.bind(this)
  }

  handleFilter (data){
    console.log('filter data', data)
    this.setState(prevState => {
      return {
        ...this.state,
        name:data.name,
        school: data.school,
        sclass: data.sclass,
        division: data.division
      }
    })
  }

  render () {
    return (
             <div>
               <div> <Menu1 routes={this.props}/> </div>
               <div className="abc">
                  <Menu2 /> <Filters handleFilter={this.handleFilter}/>
                    <div className="table1">
                    <Table1  data={this.state}/>
                    </div>
               </div>
                    
             </div>

           )
        }
     }

export default Home;
