import Login from "./components/Login";
import Signup from "./components/Signup";
import Body from "./components/Body";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
