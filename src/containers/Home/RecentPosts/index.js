import React from 'react';
import './style.css';
import Card from '../../../components/UI/Card';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
const RecentPosts = (props) => {

    const [posts, setPosts] = useState([]);
    
    function getData(){
        axios.get('http://localhost:8000/showPost/')
        .then((response)=>{
            const posts= response.data;
            setPosts(posts);
        })
        .catch(error=>console.log(error));
    }
    useEffect(() => {
        //const posts = blogPost.data;
        if(posts.length==0){
     getData();   
    }
        
    }, [posts]);


  return(
    <div style={props.style}>
       
            {/* <div className="postImageWrapper">
                <img src={"https://2.bp.blogspot.com/-ZOY5OAvnKj0/V9_M3_TVTLI/AAAAAAAAD40/UQl4rIoqgi42zaeq0yR_y1gnnchZFxupQCLcB/s1600/3-3.jpg"} alt=""/>
            </div> */}

            <div style={{textAlign: 'center'}}>

            {
                        posts.map(post => {
                            return (
                                <Card style={{marginBottom: '20px'}}>
                                <span>{post.category}</span>
                <h2>{post.blogTitle}</h2>
                <span>{post.postedOn}</span>
                <p>{post.blogText}...</p>
                <NavLink key={post.id} to={`/post/${post.slug}`}>
                <button>Read More</button>
                </NavLink>
                </Card>
                                // <NavLink key={post.id} to={`/post/${post.slug}`}>
                                //     <div className="recentPost">
                                //         <h3>{post.blogTitle}</h3>
                                //         <span>{post.postedOn}</span>
                                //     </div>
                                // </NavLink>
                                
                            );
                        })
                    }
                     

            </div>

            


        
    </div>
   )

 }

export default RecentPosts