import { Form, Input, Button, Checkbox, Modal } from 'antd';
import React from 'react';
import { connect } from "react-redux";

import 'reactjs-popup/dist/index.css';
//import '../App.css';
//Bootstrap and jQuery libraries
//import 'bootstrap/dist/css/bootstrap.min.css';
//import '~antd/dist/antd.css';
import { useState } from 'react';

import * as actions from '../auth'
import "antd/dist/antd.css";

import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';
//import "../styles/HomePage.css"

class Login extends React.Component{
    render(){
const CollectValues = ({visible, onDone, onCancel}) => {
    const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
    visible={visible}
    title="Login!"
    okText="Login!"
    cancelText="Cancel"
    onCancel={onCancel}
    onOk={() => {
        form
            .validateFields()
            .then((values) => {
                onDone(values);
                //return <Redirect to='/nav'/>
            })
            .catch((info) => {
                console.log('Login Failed:', info);
            });
    }}
>
    <Form
    form={form}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      {/* <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> */}
    </Form>
    </Modal>
  );
};
const CollectionsPage = () => {
    const [visible, setVisible] = useState(false);

    //With this, we will get all field values.
    const onDone = (values) => {
        console.log('Received values of form: ', values);
         this.props.onAuth(
           values.username,
             values.password



        );
        setVisible(false);
        

    };
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center' , margin: '10px' }} >
            
            <Button className="buton" variant="contained"  color="primary" 
                htmlType="submit"
                type="dark"
                onClick={() => {
                    setVisible(true);
                }}
            >
                Login
            </Button>
            <CollectValues
                visible={visible}
                onDone={onDone}
                onCancel={() => {
                    setVisible(false);
                }}
            /> 
        </div>

    );
};
return (
    <>
    
      <CollectionsPage />
       </>
  );

    }
}
const mapStateToProps= state =>{
	return{
		//loading: this.state.loading,
        //error: this.state.error
	}
}
const mapDispatchToProps = dispatch => {
	return {
		onAuth: (username,password) => dispatch(actions.authLogin(username,password))
	}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login))
