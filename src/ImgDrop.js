import React, { Component } from 'react';
import './App.css';

class ImgDrop extends Component {
  state =  {
    selectedFile: null,
    imagePreviewUrl: null
  };
 
  fileChangedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
 
    let reader = new FileReader();
     
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      });
    }
 
    reader.readAsDataURL(event.target.files[0])
 
  }
 
  render() {
    let $imagePreview = (<div className="previewText image-container">Please select an Image for Preview</div>);
    if (this.state.imagePreviewUrl) {
      $imagePreview = (<div className="image-container" ><img src={this.state.imagePreviewUrl} alt="icon" width="200" /> </div>);
    }
 
    return (
      <div className="App">
         <input type="file" name="avatar" onChange={this.fileChangedHandler} />
         <button type="button" onClick={this.submit} > Upload </button>
         { $imagePreview }
      </div>
    );
  }
}

export default ImgDrop;
