import React, { Component} from 'react';
import './App.css';
import TopBanner from './components/TopBanner';
import SortAlgoVis from './components/SortAlgoVis';
import './components/descriptionContainer.css'

class App extends Component {
  render() {
    return (
      <div style={{textAlign: "center"}}>
        <TopBanner/>
			  <SortAlgoVis/>
      </div>
    )
  }
}


export default App;
