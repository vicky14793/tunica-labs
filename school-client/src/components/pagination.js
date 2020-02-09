import React, { Component } from 'react';
import { Container, Image, Menu, Message, Dropdown, Pagination } from 'semantic-ui-react';
//import './../css/pagination.css';

class Pagination1 extends Component{
  render(){
    return(
<div className="page1">
<Pagination
  boundaryRange={0}
  defaultActivePage={1}
  ellipsisItem={null}
  firstItem={null}
  lastItem={null}
  siblingRange={1}
  totalPages={10}
/>
</div>
    )
  }
}
export default Pagination1;
