import React, { Component } from 'react';
import { Container, Image, Menu } from 'semantic-ui-react';
import './../css/menu2.css';


class Menu2 extends Component {

  render () {

    return (
            <div className="border1">
              <ul className = "try">
                  <li className='try2'><a href="/home">Students</a></li>
                  <li><a href="/home">View Students</a></li>
                  <li><a href="/saddf">Add Students</a></li>
              </ul>
            </div>
)
 }
   }

   export default Menu2;
