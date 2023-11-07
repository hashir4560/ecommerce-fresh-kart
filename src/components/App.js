import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Items from "./Items";
import Cart from "./Cart";
import Final from "./Final";
import Login from "./Login";
import Register from "./RegisterUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import these two lines for toast

function App() {
  return (
    <div className="App">
      <ToastContainer /> {/* Add this line for ToastContainer */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/final" element={<Final />} />
        <Route path="/items/:type" element={<Items />} />
      </Routes>
    </div>
  );
}

export default App;
