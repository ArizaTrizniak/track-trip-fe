import './App.css'
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import Navbar from "./components/Navbar.tsx";

function App() {

  return (
      <>
          <Navbar />
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="*" element={<NotFound />} />
              </Routes>
      </>
  )
}

export default App
