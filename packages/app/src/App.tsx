import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CreateMonster from "./screens/CreateMonster";
import Monsters from "./screens/Monsters";
import RandomMonster from "./screens/RandomMonster";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<CreateMonster />} />
      <Route path="/monsters" element={<Monsters />} />
      <Route path="/random-monsters" element={<RandomMonster />} />
    </Routes>
  </Router>
);

export default App;
