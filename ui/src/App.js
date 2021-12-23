import { useEffect, useState } from 'react';
import {jsx as _jsx} from 'react/jsx-runtime';

import './App.css';
function App() {
  const [SsrData, setSsrData] = useState({});
  useEffect(()=>{
    if (window.intialState) {
      setSsrData(window.intialState);
    }
  },[])
  return (
    <div className="App">
       {SsrData && SsrData.Component && <SsrData.Component {...SsrData.props} />}
    </div>
  );
}

export default App;
