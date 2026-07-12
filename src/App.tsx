import { Route, BrowserRouter as Router, Routes } from "react-router";
import Home from "./pages/Home";
import List from "./pages/jobs/List";
import { NotFound } from "./pages/NotFound";
import { Document } from "./pages/document/Document";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/todo-list" element={<List />} />

          <Route path="/todo-list-document" element={<Document />} />

          <Route path="/404-not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
