import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Pages
import CadastroUsuario from "./pages/CadastroUsuario";
import Login from './pages/Login'
import Posts from "./pages/Posts";

//componentes
import Navbar from "./component/Navbar";



//Hoolk
import useAuth from "./hoolk/useAuth";

function App() {

  const { user, loadingUser } = useAuth()


  if(loadingUser){
     return <p>Caregando ...</p>
  }

  return (
    <BrowserRouter>
    <ToastContainer />
    <Navbar />
      <Routes>
        <Route>
          <Route path="/" element={<Login />}/>
          <Route path="/cadastro" element={<CadastroUsuario />}/>

          <Route 
            path="/posts" 
            element={user ? <Posts /> : <Login to="/login"/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
