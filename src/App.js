// import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import { Home } from './component/Home';
import { About } from './component/About';
import {
  BrowserRouter,
  Routes,
  Route,
  // Link,
} from "react-router-dom";
import NoteState from './Cotext/Notes/NoteState';
import { Alert } from './component/Alert';
import Login from './component/Login';
import Signup from './component/Signup';

function App() {
  return (
    <>
    <NoteState>
      <BrowserRouter>
      <Navbar/>
      <Alert message="this is props" />
      <div className="container">
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </div>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
