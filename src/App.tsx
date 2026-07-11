import { Route, BrowserRouter as Router, Routes } from "react-router";
import Home from "./pages/Home";
import List from "./pages/jobs/List";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/todo-list" element={<List />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
