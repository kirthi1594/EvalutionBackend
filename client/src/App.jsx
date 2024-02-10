
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Posts from './Pages/Posts';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div style = {{display:"flex",justifyContent:"space-around",alignItems:"center",margin:"10px",border:"2px solid teal"}}>
        <Link to="/">LogIn</Link>
        <Link to="/register">Register</Link>
        <Link to="/posts">Posts</Link>
        
      </div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/posts' element={<Posts />}/>
      </Routes>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
