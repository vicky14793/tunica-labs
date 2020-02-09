import React, { Component } from 'react';
import { Container, Image, Menu } from 'semantic-ui-react';
import './../css/menu.css';
import { Link } from 'react-router-dom'
// const styles = {
//
//   color: 'brown',
// }
class Menu1 extends Component {

  render () {
    return (
          <div className="border">
             <ul>
                  <li ><a className="b1" href="/home">Tunica Labs</a></li>
                      <div className="bellicon">
                        <div className="ui left icon input">
                           <i className="bell icon"></i>
                        </div>
                      </div>
                      <div className="seperate">
                        <div className="icon1">
                           <div className="ui left icon input">
                              <i className="user icon"></i>
                            </div>
                        </div>
                        <div className="spot">
                           {window.localStorage.getItem("name")}
                        </div>
                      </div>
             </ul>
          </div>
            )
          }
       }

export default Menu1;
