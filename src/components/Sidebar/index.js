import React, { useState, useEffect } from 'react';
import './style.css';
import Card from '../UI/Card';

import blogPost from '../../data/blog.json';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { getDefaultNormalizer } from '@testing-library/react';


const Sidebar = (props) => {


    const [posts, setPosts] = useState([]);
    const [user,setUser]=useState({});
    
   function get()
    {
        if(posts.length==0){
            axios.get('http://localhost:8000/showPost/')
            .then((response)=>{
                const posts= response.data;
                setPosts(posts);
            })
            .catch(error=>console.log(error));

            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: "Token "+localStorage.getItem('token')
              }
            axios.get('http://localhost:8000/details/')
            .then((response)=>{
                const user= response.data[0];
                console.log("show"+response.data);
                setUser(user);
            })
            .catch(error=>console.log(error));

        
    }
    }
    useEffect(() => {
        //const posts = blogPost.data;
        if(posts.length==0){
       get();
        }
        
    }, [posts]);



  return(
      <div className="sidebarContainer" style={{
          width: props.width
      }}>
            <Card style={{ marginBottom: '20px', padding: '20px', boxSizing: 'border-box' }}>
                <div className="cardHeader">
                    <span>About Me</span>
                </div>
                <div className="profileImageContainer">
                    <img src={'http://localhost:8000' + user.pic} alt="" />
                </div>
                <div className="cardBody">
                    <p className="personalBio">heyy</p>
                </div>
            </Card>

            <Card style={{ marginBottom: '20px', padding: '20px', boxSizing: 'border-box' }}>
                <div className="cardHeader">
                    <span>Social Network</span>
                </div>
            </Card>

            <Card style={{ marginBottom: '20px', padding: '20px', boxSizing: 'border-box' }}>
                <div className="cardHeader">
                    <span>Recent Posts</span>
                </div>

                <div className="recentPosts">
                   
                    {
                        posts.map(post => {
                            return (
                                <NavLink key={post.id} to={`/post/${post.slug}`}>
                                    <div className="recentPost">
                                        <h3>{post.blogTitle}</h3>
                                        <span>{post.postedOn}</span>
                                    </div>
                                </NavLink>
                                
                            );
                        })
                    }
                </div>

            </Card>

            <Card style={{ marginBottom: '20px', padding: '20px', boxSizing: 'border-box' }}>
                <div className="cardHeader">
                    <span> My Posts</span>
                </div>

                <div className="recentPosts">

                    {
                        posts.map(post => {
                            return (
                                <NavLink key={post.id} to={`/post/${post.slug}`}>
                                    <div className="recentPost">
                                        <h3>{post.blogTitle}</h3>
                                        <span>{post.postedOn}</span>
                                    </div>
                                </NavLink>
                                
                            );
                        })
                    }
                </div>

            </Card>
      </div>
    
   )

 }

export default Sidebar