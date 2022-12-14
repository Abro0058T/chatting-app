import logo from './logo.svg';
import './App.css';
import Register from './Pages/Register';
import Login from './Pages/Login';
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom"
import Home from './Pages/Home';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
function App() {
  const {currentUser}= useContext(AuthContext)
  // console.log(currentUser)
  const ProtectedRoute=({children})=>{
    if(!currentUser){
      return <Navigate to="/login"/>
    }
    return children
    
  }
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          </Route>
      </Routes>
      {/* <Register/> */}
      </BrowserRouter>
      {/* <Login/> */}
      {/* <Home/> */}
    </div>
  );
}

export default App;
