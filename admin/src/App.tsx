import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FaqList from "./pages/FAQList";
import FAQCreate from "./pages/FAQCreate";

function App() {
  return (
    <Router>
      <div className="flex justify-center items-center p-4">
        {/* Navigation Buttons */}
        <div className="space-x-4">
          <Link
            to="/"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
          >
            View FAQs
          </Link>
          <Link
            to="/create"
            className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700"
          >
            Create FAQ
          </Link>
        </div>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<FaqList />} />
        <Route path="/create" element={<FAQCreate />} />
      </Routes>
    </Router>
  );
}

export default App;
