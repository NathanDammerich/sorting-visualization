import React, { Component } from 'react';
import './MergeSort.css'

export class BubbleSort extends Component {
    constructor(props) {
        super(props);

        this.state = {
            array: this.props.array
        }; 
    }

    resetArray = (array) => {
        this.setState({array});
    }

  
    render() {
        const {array} = this.props;


        return (
            <div style={contStyle}>
            <h3>Bubble Sort</h3>
            <div>
                {array[2].map((value, idx) => (
                    <div 
                    className="array-bar" 
                    style={{height: `${value[0]}px`, backgroundColor: `${value[1]}`}} 
                    key={idx}>  
                    </div>
                ))}
            </div>
            </div>
        );
    }
}



const contStyle = {
    gridArea: "bubble"
}

const getRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

export default BubbleSort
