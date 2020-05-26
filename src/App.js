import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';


/*
var express = require('express');
var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/

class App extends Component {
  
  state = {
    selectedFile: null
  }

  fileSelectedHandler = event => {
    this.setState({
      selectedFile : event.target.files[0]
    })

  }

  fileUploadHandler = () => {
     const fd = new FormData();
     fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
     axios.post('/uploadFile', fd, {
       onUploadProgress: progressEvent => {
         console.log('Upload Progress: '+ Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
       }
     })
     .then(res => {
       console.log(res);
     });
  }

  render() {
    return (
      <div className="App">
        <input type="file" onChange={this.fileSelectedHandler}/>
        <button onClick={this.fileUploadHandler}>Upload</button>
      </div>
    );
  }
}

export default App;
