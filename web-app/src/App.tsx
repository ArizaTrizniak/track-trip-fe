import './App.css'
import {Routes, Link, Route} from "react-router-dom";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import NotFound from "./pages/NotFound.tsx";

function App() {

  return (
        <div>
            <nav>
                <Link to="/">Home</Link> |{' '}
                <Link to="/about">About</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
  )
}

export default App
