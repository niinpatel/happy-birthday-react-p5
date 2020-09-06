import React from 'react';
import './App.css';
import sketch from './sketch/sketch';
import p5 from 'p5';

const App = () => {
  const canvasRef = React.useRef(null)

  React.useEffect(() => { new p5(sketch(canvasRef.current), canvasRef.current); })

  return (
    <div className="main">
      <div ref={canvasRef} />
    </div >
  )
}

export default App;
