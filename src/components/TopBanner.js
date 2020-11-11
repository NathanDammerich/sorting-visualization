import React, { Component } from 'react';


export class TopBanner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            zIndex: 0,
            opacity: 0,
            display: "none"
        };
        this.openDescrip = this.openDescrip.bind(this);
        this.closeDescrip = this.closeDescrip.bind(this);
    }

    openDescrip() {
        this.setState((state) => { return {
            zIndex: 1,
            opacity: 1,
            display: "grid"
        }})
    }
    
    closeDescrip() {
        this.setState((state) => { return {
            opacity: 0,
            display: "none"
        }})

        const timer = setTimeout(
            this.setState((state) => { return {
                zIndex: 0
            }}), 2000);
        return () => clearTimeout(timer);
    }

    render() {

        const containerStyle = {
            position: "absolute",
            top: "0%",
            height: "auto",
            width: "50vw",
            left: "25%",
            backgroundColor: 'black',
            marginTop: '50px',
            zIndex: this.state.zIndex,
            borderRadius: "20%",
            opacity: this.state.opacity,
            display: this.state.display,
            gridTemplateColumns: "auto",
            gridTemplateRows: "'70px' 'auto' '70px'",
            gridTemplateAreas: "'header' 'body' 'close'"

        }

        return (
            <div style={divContainerStyle}>
                <h1 style={headerStyle}>Sorting Algorithm Visualizer</h1>
                <button id="descripButton" style={descripButtonStyle} onClick={this.openDescrip}>Description</button>
                <div id="descripContainer" style={containerStyle}>
                    <h1 style={h1Style}>Description</h1>
                    <p style={pStyle}>This SPA application was developed using React. A single parent component has an array state that holds an array of length of 4, each index corresponding to one of the four displayed arrays. When the sort button is pressed, the array is passed to each sorting algorithm which returns an array of animation commands. The animation visualizer algorithm then pushes state updates to visualize each sorting algorithm.</p>
                    <button id="closeButton" style={descripButton2Style} onClick={this.closeDescrip}>Close</button>
                </div>
            </div>
        )
    }
}
const divContainerStyle = {
    height: "auto",
    width: "auto",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px"
}

const h1Style = {
    color: "white",
    margin: "auto",
    gridArea: "header",
    padding: "10px 0px"
}

const pStyle = {
    color: "white",
    margin: "auto",
    fontSize: 20,
    gridArea: "body",
    padding: "10px 10px"
}



const descripButtonStyle = {
    backgroundColor: "transparent",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: 15,
    border: "2px solid black",
    cursor: "pointer",
    borderRadius: "25%"
}

const descripButton2Style = {
    backgroundColor: "transparent",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: 15,
    border: "2px solid white",
    cursor: "pointer",
    borderRadius: "25%",
    padding: "3px 8px",
    margin: "auto",
    color: "white",
    gridArea: "close",
    padding: "10px 0px"
}


const headerStyle = {
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: 25,
    
}

const paragraphStyle = {

}




export default TopBanner
