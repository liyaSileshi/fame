import React, { Component } from 'react'

class Editor extends Component {
    constructor(props) {
      super(props)

      this.state = {
        hue: 0, 
        blur: 0,
        grayscale: 0,
        contrast: 100,
        opacity: 100
      }
    }

    render() {
      const filterStyle = {
        filter: `hue-rotate(${this.state.hue}deg) blur(${this.state.blur}px) grayscale(${this.state.grayscale}%) contrast(${this.state.contrast}%)`
      }

      return (
        <div style={styles.container}>
          <img 
            src='images/liya.jpeg'
            width="500"
            height="auto"
            style={filterStyle}
            alt='enteredimg'
          />

          <span>Hue: {this.state.hue}</span>
          <input 
            min="0"
            max="360"
            type="range"
            value={this.state.hue}
            onChange={(e) =>{
              this.setState({ hue: e.target.value })
            }}
          />

          <span>Blur: {this.state.blur}</span>
          <input 
            min="0"
            max="10"
            type="range"
            value={this.state.blur}
            onChange={(e) => {
              this.setState({ blur: e.target.value })
            }}
          />

          <span>Grayscale: {this.state.grayscale}</span>
          <input 
            min="0"
            max="100"
            type="range"
            value={this.state.grayscale}
            onChange={(e) => {
              this.setState({ grayscale: e.target.value })
            }}
          />

          <span>Contrast: {this.state.contrast}</span>
          <input 
            min="0"
            max="200"
            type="range"
            value={this.state.contrast}
            onChange={(e) => {
              this.setState({ contrast: e.target.value })
            }}
          />

          <span>Opacity: {this.state.opacity}</span>
          <input 
            min="0"
            max="100"
            type="range"
            value={this.state.opacity}
            onChange={(e) => {
              this.setState({ opacity: e.target.value })
            }}
          />

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
    flexDirection: 'column'
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