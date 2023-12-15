import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Pages
import CadastroUsuario from "./pages/CadastroUsuario";
import Login from "./pages/Login";
import Filmes from "./pages/Filmes";

//componentes
import Navbar from "./component/Navbar";

//Hoolk
import useAuth from "./hoolk/useAuth";
import Conta from "./pages/Conta";

function App() {
  const { user, loadingUser } = useAuth();

  if (loadingUser) {
    return <p>Caregando ...</p>;
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />

          <Route
            path="/filmes"
            element={user ? <Filmes /> : <Login to="/login" />}
          />
        </Route>
        <Route
          path="/conta"
          element={user ? <Conta /> : <Login to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
