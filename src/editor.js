import React, { Component } from 'react'

class Editor extends Component {
    constructor(props) {
      super(props)

      this.state = {
        bill: 36,
        tipPercent: 15,
        hue: 0, 
        blur: 0
      }
    }

    render() {
      const bill = parseFloat(this.state.bill)
      const tipPercent = parseInt(this.state.tipPercent)
      const tip = bill * tipPercent / 100
      const total = bill + tip

      const filterStyle = {
        filter: `hue-rotate(${this.state.hue}deg) blur(${this.state.blur})`
      }

      return (
        <div style={styles.container}>
          <span style={styles.output}>{total}</span>
          <span style={styles.output}>{tip}</span>

          <label for="input-bill">Bill</label>
          <input 
            style={styles.input}
            id="input-bill"
            type="text" 
            value={this.state.bill}
            onChange={(e) => {
              // this.state.bill = e.target.value // <- BAD! DON'T Do this!
              this.setState({ bill: e.target.value })
            }}
          />

          <label for="input-tip-percent">Tip %</label>
          <input 
            style={styles.input}
            id="input-tip-percent"
            type="text"
            value={this.state.tipPercent}
            onChange={(e) => {
              this.setState({ tipPercent: e.target.value })
            }}
          />

          <img 
            src='public/images/2C.png'
            width="100"
            height="100"
            style={filterStyle}
            alt='enteredimg'
          />

          <span>{this.state.hue}</span>
          <input 
            min="0"
            max="360"
            type="range"
            value={this.state.hue}
            onChange={(e) =>{
              this.setState({ hue: e.target.value })
            }}
          />
          <span>{this.state.blur}</span>
          <input 
            min="0"
            max="360"
            type="range"
            value={this.state.blur}
            onChange={(e) =>{
              this.setState({ blur: e.target.value })
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