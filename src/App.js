import React from 'react';
import './App.css';
import Home from './containers/Home';
import Header from './components/Header';
import Hero from './components/Hero';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ContactUS from './containers/ContactUS';
import Post from './containers/Post';
import HomePage from './user/Mainpage'
import Share from './AddPost/AddPost';
function App() {
  return (

    <Router>
      <div className="App">
       
      <Route path="/Home" exact component={HomePage}/>
        <Route path="/" exact component={Home} />
        
        <Route path="/contact-us"  component={ContactUS}/>
        <Route path="/post/:slug" component={Post} />
       <Route exact path="/Add post" component={Share}/>

       
        
      </div>
    </Router>
    
  );
}

export default App;
