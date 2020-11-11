import React, { Component } from 'react';
import './MergeSort.css'

export class QuickSort extends Component {
    constructor(props) {
        super(props);

        this.state = {
            array: this.props.array
        }; 
    }

    /*componentDidMount() {
        const array = [];
        for (let i = 0; i < 80; i++) {
            array.push(getRandomNum(5, 180));
        }
        this.resetArray(array)
    }*/

    resetArray(array) {

        this.setState({array});
    }

  
    render() {
        const {array} = this.props;
        return (
            <div style={contStyle}>
            <h3>Quick Sort</h3>
            <div>
                {array[0].map((value, idx) => (
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
    gridArea: "quick"
}


const getRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

export default QuickSort