import { Route, BrowserRouter as Router, Routes } from "react-router";
import Home from "./pages/Home";
import List from "./pages/jobs/List";
import EditJob from "./pages/jobs/Edit";
import Details from "./pages/jobs/Details";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/todo-list" element={<List />} />
          <Route path="/todo-list/edit/:id" element={<EditJob />} />
          <Route path="/todo-list/details/:id" element={<Details />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
