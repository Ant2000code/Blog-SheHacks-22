import React, { useState, useEffect } from 'react';
import './style.css';
import Card from '../UI/Card';
import blogPost from '../../data/blog.json';
import axios from 'axios';
import { getDefaultNormalizer } from '@testing-library/react';
import Show from '../../comments/showsystem';

const BlogPost = (props) => {

    const [post, setPost] = useState({
        id: "" ,
        blogCategory: "" ,
        blogTitle : "" ,
        postedOn: "" ,
        author: "" ,
        blogImage: "" ,
        blogText: ""
    });
    const [slug, setSlug] = useState('');
   
    const [loading,setLoading]=useState('True');
    

    useEffect(() => {
        const slug = props.match.params.slug;
        let postdata=[];
        if(postdata.length==0){
        axios.get('http://localhost:8000/showPost/')
        .then((response)=>{
         postdata= response.data;
         const post = postdata.find(post => post.slug == slug);
         console.log("heyy"+post);
         setPost(post);
         setSlug(slug);
        })
        .catch(error=>console.log(error));
       }
        
    }, [props.match.params.slug]);

    
    if( post.blogImage == "") {
        
        return null;
      }


  return(
        <div className="blogPostContainer">
            <Card>
                <div className="blogHeader">
  <span className="blogCategory">{post.blogCategory}</span>
                    <h1 className="postTitle">{post.blogTitle}</h1>
  <span className="postedBy">posted {post.postedOn} by {post.author}</span>
                </div>

                <div className="postImageContainer">
                    <img src={'http://localhost:8000' + post.blogImage} alt="Post Image" />

                </div>

                <div className="postContent">
  <h3>{post.blogTitle}</h3>
  <p>{post.blogText}</p>
                </div>

            </Card>
            <Show/>
        </div>
   )

 
}
 

export default BlogPost