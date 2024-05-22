
import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      {/* <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1> */}

    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
      </Routes>
      <ToastContainer />
    </Router>
    </div>
  );
}

export default App;
