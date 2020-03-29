import React, { Component } from 'react'
import Slider from './Slider'
import { base64StringtoFile, extractImageFileExtensionFromBase64,
        downloadBase64File, image64toCanvasRef } from './FileDownload'
import './editor.css'

class Editor extends Component {
    constructor(props) {
      super(props)
      this.imagePreviewCanvasRef = React.createRef()
      this.state = {
        hue: 0, 
        blur: 0,
        grayscale: 0,
        contrast: 100,
        opacity: 100,
        brightness: 100,
        invert: 0,
        sepia: 0,
        saturate: 100,
        selectedFile: null,
        imagePreviewUrl: null,
        fileExtension: null
        // rotate: 0
      }
    }

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

    // handles the download click event
    handleDownloadClick = (event) => {
      event.preventDefault();
      const canvasRef = this.imagePreviewCanvasRef.current
      const {imagePreviewUrl} = this.state

      const fileExtension = extractImageFileExtensionFromBase64(imagePreviewUrl)
      const imageData64 = canvasRef.toDataURL('image/'+fileExtension)

      const myFilename = 'previewFile.' + fileExtension
      // file to be uploaded
      const myNewCroppedFile = base64StringtoFile(imageData64, myFilename)
      console.log(myNewCroppedFile)
      // download file
      downloadBase64File(imageData64, myFilename)
    }

    saveOnCanvas = (event) => {
      const canvasRef = this.imagePreviewCanvasRef.current
      const {imagePreviewUrl} = this.state
      image64toCanvasRef(canvasRef, imagePreviewUrl, this.getFilterString())
    }

    getFilterStyle() {
      return {
        filter: `hue-rotate(${this.state.hue}deg) blur(${this.state.blur}px) 
        grayscale(${this.state.grayscale}%) contrast(${this.state.contrast}%)
        opacity(${this.state.opacity}%) brightness(${this.state.brightness}%)
        invert(${this.state.invert}%) sepia(${this.state.sepia}%)
        saturate(${this.state.saturate}%)`,
        transform: `rotate(0deg)`
      }
    }

    getFilterString() {
      return `hue-rotate(${this.state.hue}deg) blur(${this.state.blur}px) 
        grayscale(${this.state.grayscale}%) contrast(${this.state.contrast}%)
        opacity(${this.state.opacity}%) brightness(${this.state.brightness}%)
        invert(${this.state.invert}%) sepia(${this.state.sepia}%)
        saturate(${this.state.saturate}%)`  
    }
    
    render() {
      const filterStyle = this.getFilterStyle()
      let $imagePreview = (<div className="previewText image-container">Please select an Image for Preview</div>);
    if (this.state.imagePreviewUrl) {
      $imagePreview = (<div className="image-container" ><img src={this.state.imagePreviewUrl} style={filterStyle}
      alt="icon" width="600" height='500'/> </div>);
    }
    // let img = this.state.imagePreviewUrl.toDataURL('image/')
      return (
        <div>
          <div className='container'>
            <div>
            <div className='btn'>
            <input type="file" className='choosefile' name="avatar" onChange={this.fileChangedHandler} />
              <button className='save' onClick = {this.saveOnCanvas}>Save</button> 
              <button className="download" onClick={this.handleDownloadClick}>Download</button> {/*handles download button*/}   
            </div>

              {$imagePreview} {/*chosen image from file upload*/}
              <canvas width="500" height="500" ref={this.imagePreviewCanvasRef}></canvas>
            </div>

            <div>
              <span>Hue: {this.state.hue}</span>
              <Slider
                min="0"
                max="360"
                type="range"
                value={this.state.hue}
                onChange={(e) =>{
                  this.setState({ hue: e.target.value })
                }}
              />

              <span>Blur: {this.state.blur}</span>
              <Slider 
                min="0"
                max="10"
                type="range"
                value={this.state.blur}
                onChange={(e) => {
                  this.setState({ blur: e.target.value })
                }}
              />

              <span>Grayscale: {this.state.grayscale}</span>
              <Slider 
                min="0"
                max="100"
                type="range"
                value={this.state.grayscale}
                onChange={(e) => {
                  this.setState({ grayscale: e.target.value })
                }}
              />

              <span>Contrast: {this.state.contrast}</span>
              <Slider 
                min="0"
                max="200"
                type="range"
                value={this.state.contrast}
                onChange={(e) => {
                  this.setState({ contrast: e.target.value })
                }}
              />

              <span>Opacity: {this.state.opacity}</span>
              <Slider 
                min="0"
                max="100"
                type="range"
                value={this.state.opacity}
                onChange={(e) => {
                  this.setState({ opacity: e.target.value })
                }}
              />

              <span>Brightness: {this.state.brightness}</span>
              <Slider 
                min="0"
                max="200"
                type="range"
                value={this.state.brightness}
                onChange={(e) => {
                  this.setState({ brightness: e.target.value })
                }}
              />

              <span>Invert: {this.state.invert}</span>
              <Slider 
                min="0"
                max="100"
                type="range"
                value={this.state.invert}
                onChange={(e) => {
                  this.setState({ invert: e.target.value })
                }}
              />

              <span>Sepia: {this.state.sepia}</span>
              <Slider 
                min="0"
                max="100"
                type="range"
                value={this.state.sepia}
                onChange={(e) => {
                  this.setState({ sepia: e.target.value })
                }}
              />

              <span>Saturate: {this.state.saturate}</span>
              <Slider 
                min="0"
                max="200"
                type="range"
                value={this.state.saturate}
                onChange={(e) => {
                  this.setState({ saturate: e.target.value })
                }}
              />
            </div>
          </div>
      </div>
      )
    }
}

export default Editor