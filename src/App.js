import { BrowserRouter} from "react-router-dom";
import RoutesApp from "./routes";
import Navbar from "./component/Navbar";
import { ToastContainer } from "react-toastify";
import Footer from "./component/Footer";


function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <RoutesApp />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
