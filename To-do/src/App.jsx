import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { TodoProvider } from "./context/Todocontext";
import "./styles/global.css";
import "./styles/app.css";

export default function App() {
  return (
    <TodoProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <footer className="site-footer">
            Made for a more focused day.
          </footer>
        </div>
      </BrowserRouter>
    </TodoProvider>
  );
}