import React from 'react';
import './App.css';
import sketch from './sketch/sketch';
import p5 from 'p5';

class App extends React.Component { // TODO: refactor into functional component
  componentDidMount() {
    new p5(sketch, this.canvas);
  }


  render() {


    return (
      <div className="main">
        <div id="canvas-parent" ref={canvas => (this.canvas = canvas)} />
      </div >
    );
  }
}

export default App;
