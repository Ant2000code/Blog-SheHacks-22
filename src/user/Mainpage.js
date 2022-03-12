
import React from 'react'
import { Button, Card } from "react-bootstrap";

import SignUp from "./SignUp";
import Login from "./login";
//import Button from "@restart/ui/esm/Button";
import * as actions from '../auth';
import { connect } from "react-redux";


class HomePage extends React.Component {
    state = {
        isAuthenticated:localStorage.getItem('token')==null?false:true
      };


    render() {
        // const location=GetDetails();
        return (
                
                <div className="background" id="google_translate_element">
                    <div className="leftdiv">
                    {/* <img src={home} height="100%"/> */}
                    </div>
                    <div className="rightdiv">
                        <h2>Start Something Epic!</h2>
                        
                        {
                            this.state.isAuthenticated ?
                                <Button type="primary" onClick={this.props.logout}>Logout!</Button>
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