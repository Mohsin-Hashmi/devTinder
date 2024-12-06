import NavBar from "./components/NavBar";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<NavBar />}></Route>
          <Route path="/login" element= {<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
