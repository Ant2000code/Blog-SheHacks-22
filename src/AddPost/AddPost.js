import "./share.css";
//import {PermMedia, Label,Room, EmojiEmotions} from "@material-ui/icons"
//import Button from '@material-ui/core/Button';
//import PhotoCamera from '@material-ui/icons/PhotoCamera';
//import IconButton from '@material-ui/core/IconButton';
import {Component} from "react";
import axios from "axios";
import { Upload,Form,Input } from 'antd';
import ImgCrop from 'antd-img-crop';
import React from "react";
import TextArea from "antd/lib/input/TextArea";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";
class Share extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true, UserData: undefined,
      previewVisible: false,
      previewImage: '',
      fileList: []
    };
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(){
    
    // Changing state
    this.setState({fileList : []})
    console.log("Nai aara yar");
  }
    
  componentDidMount(){
        
    let userData={};
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/details/user/",
      
      headers: { "Content-Type": "application/json" ,
      Authorization: "Token "+localStorage.getItem('token')},
    })   
    .then(res => {
       
         userData={
           Name:res.data[0].firstName+" "+res.data[0].lastName,
           Pic:"http://127.0.0.1:8000"+res.data[0].pic
         }
  
         console.log(userData.length);
       if(userData.Name!=null) { 
         console.log(userData.length);
         this.setState({ UserData: userData });
         this.setState({isLoading: false});
        //setUsers(users)
       }
      }
       )
  }


  render(){
    const { previewVisible, previewImage, fileList } = this.state
    const onChange = ({ fileList }) => this.setState({ fileList })
    const onPreview = async file => {
     let src = file.url;
     if (!src) {
       src = await new Promise(resolve => {
         const reader = new FileReader();
         reader.readAsDataURL(file.originFileObj);
         reader.onload = () => resolve(reader.result);
         
       });
     }
     const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow.document.write(image.outerHTML);
   console.log("heyy"+src);
   };
   
  const onFinish=(values)=>
  {
    //const shareimg=this.state.fileList[0].originFileObj;
    
    const formData = new FormData();
  
    formData.append("blogImage",this.state.fileList[0].originFileObj);
    formData.append("blogText",values.caption);
    formData.append("blogCategory",values.cat);

    formData.append("blogTitle",values.title);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/showPost/",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" ,
      Authorization: "Token "+localStorage.getItem('token')},
    })
      .then((response)=> {
        //handle success
        this.handleClick()
         
        
        
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
    
    
    //console.log(values.caption);
    //console.log(this.state.fileList[0].originFileObj);

  }

  if(!this.state.isLoading)
  return (
    <>
    <Logo/>
    <NavLink to="/">Back to Home</NavLink>
    <Form
            onFinish={onFinish}
            labelCol={{
              span: 1000,
            }}
            wrapperCol={{
              span: 1000,
            }}
            //onSubmitCapture={this.handleClick}
        //onValuesChange={onFormLayoutChange}
        //size={componentSize}
      >
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={this.state.UserData.Pic} alt="" />
          
         <Form.Item name="caption" >
          <TextArea
          
            placeholder="What did you think today;)?"
            className="shareInput"
            name="caption"
          />
          </Form.Item>
          
          <br></br>
          
          
        </div>
        <div className="shareTop">
          
         <Form.Item name="cat" >
          <TextArea
          
            placeholder="put in category"
            className="shareInput"
            name="cat"
          />
          </Form.Item>
          
          <br></br>
          
          
        </div>
        <div className="shareTop">
          
         <Form.Item name="title" >
          <TextArea
          
            placeholder="Put in title"
            className="shareInput"
            name="title"
          />
          </Form.Item>
          
          <br></br>
          
          
        </div>
        <hr className="shareHr"/>
        <div className="shareBottom">
            <div className="shareOptions">
                <div className="shareOption">
                  

                    {/* <PermMedia htmlColor="tomato" className="shareIcon"/> */}
                    <Form.Item>
                    <ImgCrop rotate>
                    
      <Upload 
        //action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture"
        //showUploadList={false}
         fileList={this.state.fileList}
        onChange={onChange}
        onPreview={onPreview}
        id="upload pic"
        //style={{display:"none"}}
      >
         {/* {fileList.length === 1 ? null : uploadButton } */}
      Add image
        {fileList.length === 1 ?null :'.'}
      
      </Upload>
     
    </ImgCrop>
    </Form.Item>
                     {/* <input accept="file" id="icon-button-file" name="postImg" type="file" style={{  }}  />      */}
                    
                </div>
                
            </div>
            <Form.Item >
            <button className="shareButton" type="submit" >Share</button></Form.Item>
       
        </div>
      
      </div>
    </div>
  </Form>
    </>
  );
  else
  return(
    <>
<h3>Loading....</h3>
</>

  );
  }
}
export default Share;