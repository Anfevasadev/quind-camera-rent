import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Auth from "./pages/Auth";
import Rentals from "./pages/Rentals";
import { AuthProvider } from "./contexts/AuthContext";
import Bonus from "./pages/Bonus";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:type/:id" element={<ProductDetail />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/rentals" element={<Rentals />} />
              <Route path="/bonus" element={<Bonus />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
