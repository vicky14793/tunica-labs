import React, { Component } from 'react';
import { Container, Image, Menu, Message, Dropdown, Table, Pagination } from 'semantic-ui-react';
import './../css/table.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  useParams
} from "react-router-dom";


class Table1 extends Component{

  state = {
    users: [],
    temp_arr: []
  }

  componentDidMount () {
    axios.get('http://localhost:4000/students')
      .then(
        response => {
          console.log(response.dob)
          this.setState(prevState => {
            return {...this.state, users: response.data.data, temp_arr: response.data.data}
          })
        }
      )
  }

  componentWillReceiveProps (nextValue, oldValue) {
    if (nextValue.data.name === '' && nextValue.data.school === ''  && nextValue.data.sclass === '' && nextValue.data.division === '' ) {
      this.setState({...this.state, temp_arr: this.state.users})
    } else {
        let temp_arr = this.state.users.filter(user => {
          return user.name === nextValue.data.name ||
                 user.school === nextValue.data.school ||
                 user.sclass === nextValue.data.sclass ||
                 user.division === nextValue.data.division
        });

        this.setState(prevState => {
          return {...this.state, temp_arr: temp_arr}
        })
    }

  }

  edit(id) {
    window.location.assign('/sadd/edit/'+id)
  }

  delete (id) {
    if (window.confirm('Aure you sure')) {
      axios.delete('http://localhost:4000/students/' + id)
        .then(
          response => {
            console.log(response)
            window.location.reload()
          }
        ).catch(
          error => {
            console.log(error.response)
          }
        )
    }
  }

  render(){

    return(
      <div className="dtable">
            <Table basic>
                 <Table.Header>
                    <Table.Row>
                       <Table.HeaderCell>Id</Table.HeaderCell>
                       <Table.HeaderCell>Name</Table.HeaderCell>
                       <Table.HeaderCell>DOB</Table.HeaderCell>
                       <Table.HeaderCell>School</Table.HeaderCell>
                       <Table.HeaderCell>Class</Table.HeaderCell>
                       <Table.HeaderCell>Division</Table.HeaderCell>
                       <Table.HeaderCell>Status</Table.HeaderCell>
                       <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                     {
                       this.state.temp_arr.map((user, index) => {
                         return (
                           <Table.Row key={index}>
                              <Table.Cell>{index + 1}</Table.Cell>
                              <Table.Cell>{user.name}</Table.Cell>
                              <Table.Cell>{user.dob.split("T")[0]}</Table.Cell>
                              <Table.Cell>{user.school}</Table.Cell>
                              <Table.Cell>{user.sclass}</Table.Cell>
                              <Table.Cell>{user.division}</Table.Cell>
                              <Table.Cell>{user.status === true ? 'Active' : 'In active'}</Table.Cell>
                              <Table.Cell>
                                <button className='col' onClick={() => this.edit(user.id)}>Edit</button>
                                <br/>
                                <button className='col1' onClick={() => this.delete(user.id)}>Delete</button>
                              </Table.Cell>
                           </Table.Row>

                         )
                       })
                     }
                  </Table.Body>
            </Table>
            <div className='page'>
          <center><Pagination
              boundaryRange={0}
              defaultActivePage={1}
              ellipsisItem={null}
              firstItem={null}
              lastItem={null}
              siblingRange={1}
              totalPages={10}
            /> </center>
            </div>
            <br /> <br /> <br />
      </div>
    )
  }
}
export default Table1;
