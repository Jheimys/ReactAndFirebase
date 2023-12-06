import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastroUsuario from "./pages/CadastroUsuario";
import Login from './pages/Login'
import Navbar from "./component/Navbar";



function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route>
          <Route path="/" element={<Login />}/>
          <Route path="/cadastro" element={<CadastroUsuario />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
