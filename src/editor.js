import React, { Component } from 'react'
import Slider from './Slider'
import { base64StringtoFile, extractImageFileExtensionFromBase64,
        downloadBase64File, image64toCanvasRef } from './FileDownload'

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
      const {imagePreviewUrl} = this.state
      const fileExtension = extractImageFileExtensionFromBase64(imagePreviewUrl)
      // this.setState({
      //   fileExtension: extractImageFileExtensionFromBase64(imagePreviewUrl)
      // })
      console.log(imagePreviewUrl)
      const myFilename = 'previewFile.' + fileExtension
      // file to be uploaded
      const myNewCroppedFile = base64StringtoFile(imagePreviewUrl, myFilename)
      console.log(myNewCroppedFile)
      // download file
      // downloadBase64File(imagePreviewUrl, myFilename)
    }

    handleOnEditComplete = (event) => {
      const canvasRef = this.imagePreviewCanvasRef.current
      const {imagePreviewUrl} = this.state
      image64toCanvasRef(canvasRef, imagePreviewUrl)
    }

    render() {
      const filterStyle = {
        filter: `hue-rotate(${this.state.hue}deg) blur(${this.state.blur}px) 
        grayscale(${this.state.grayscale}%) contrast(${this.state.contrast}%)
        opacity(${this.state.opacity}%) brightness(${this.state.brightness}%)
        invert(${this.state.invert}%) sepia(${this.state.sepia}%)
        saturate(${this.state.saturate}%)`,
        transform: `rotate(0deg)`
      }

      let $imagePreview = (<div className="previewText image-container">Please select an Image for Preview</div>);
    if (this.state.imagePreviewUrl) {
      $imagePreview = (<div className="image-container" ><img src={this.state.imagePreviewUrl}style={filterStyle}

      alt="icon" width="500" height='auto'/> </div>);
    }
    // let img = this.state.imagePreviewUrl.toDataURL('image/')
    console.log('*****img********')
    // console.log(img)
    // console.log({$imagePreview})
      return (
        <div style={styles.container}>
          <div>
            <input type="file" name="avatar" onChange={this.fileChangedHandler} />
            
            {$imagePreview} {/*chosen image from file upload*/}
            <p>preview canvas</p>
            <canvas ref={this.imagePreviewCanvasRef} width="500" height='auto'></canvas>
            
            <button onClick={this.handleDownloadClick}>Download</button> {/*handles download button*/}
            <button onClick = {this.handleOnEditComplete}>Appear on canvas</button>
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
      )
    }
}

export default Editor

const fontSize = 20
const padding = 0.33

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row'
  }, 
  input: {
    padding: `${padding}em`,
    fontSize: `${fontSize}px`
  },
  output: {
    fontSize: `${fontSize * 1.5}px`,
    padding: `${padding}em`,
    fontWeight: 'bold'
  },
  label: {
    alignSelf: 'flex-start'
  }
}