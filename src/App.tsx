import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import ToolRoomPage from "./pages/toolroom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/toolroom" element={<ToolRoomPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
