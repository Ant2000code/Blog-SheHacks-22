
import React from 'react'
import { Button, Card } from "react-bootstrap";

import SignUp from "./SignUp";
import Login from "./login";
//import Button from "@restart/ui/esm/Button";
import * as actions from '../auth';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';


class HomePage extends React.Component {
    state = {
        isAuthenticated:localStorage.getItem('token')==null?false:true
      };


    render() {
        // const location=GetDetails();
        return (
                
                <div className="background" id="google_translate_element">
                    <div className="leftdiv">
                     <img src={require('./bgg.PNG')} height="100%"/>
                    </div>

                    <div className="rightdiv">
                        <h2>Lekhika....unlock yourself!</h2>
                        
                        {
                            this.state.isAuthenticated ?
                            <>
                                 <NavLink to="./"><Button type="dark" >Go to blog</Button></NavLink>
                                 
                                <Button type="dark" onClick={this.props.logout}>Logout</Button>
                                </>
                                :
                                <div className="account">
                                    <SignUp >
                                    </SignUp>
                                    <Login>
                                    </Login>
                                   
                                </div>
                        }
                        

                    </div>
                    
                </div>

        );
    }
}
const mapStateToProps = state => {
    return {
        //loading: this.state.loading,
        //error: this.state.error
    }
}

const mapDispatchToProps = dispatch => {
    console.log("logout clicked");
    return {

        logout: () => dispatch(actions.logout())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)