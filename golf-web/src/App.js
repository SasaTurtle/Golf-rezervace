import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Menu from './components/menu';
import Home from './components/home';
import About from './components/about';
import Login from './components/login';
import Register from './components/register';
import MyReservations from './components/myreservations';

function App() {
  return (
    <div className="App">
      <Menu/>
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path= "/login" element= {<Login />}/>
                <Route path= "/register" element= {<Register />}/>
                <Route path= "/myreservations" element= {<MyReservations />}/>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
