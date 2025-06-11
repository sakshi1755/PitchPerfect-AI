// import React from 'react';
// import Homepage from './Homepage';

// function App() {
//   return (
//     <div>
//       <Homepage />
//     </div>
//   );
// }

// export default App;
import { Routes, Route } from "react-router-dom";

import Homepage from './Homepage';
import Result from './analyseResult';
import MockPitch from './Mockpitch';
import ExampleGuide from "./ExampleGuide";
function App() {
  return (
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/result" element={<Result/>} />
        <Route path="/mockpitch" element={<MockPitch />} />
        <Route path="/guide" element={<ExampleGuide/>}/>
      </Routes>
  );
}

export default App;