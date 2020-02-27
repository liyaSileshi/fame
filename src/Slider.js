import React from 'react'
import './Slider.css'
function Slider({min, max, value, type, onChange}) {
    return (
        <div className='Slider'>
            <input 
            min= {min}
            max= {max}
            type={type}
            value= {value}
            onChange={onChange}
          />
        </div>
    )
}

export default Slider;