import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from './COMPONENETS/User';
import EditUser from './COMPONENETS/EditUser';
import Home from './COMPONENETS/Home';
import Login from './COMPONENETS/Login';
import Trainer from './COMPONENETS/Trainer';
import PlacementOfficer from './COMPONENETS/PlacementOfficer';
import Adddata from './COMPONENETS/Adddata';
function App() {
  return (
<BrowserRouter>
    <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/login' exact element={<Login/>}/>
         <Route path='/user' exact element={<User/>}/>
         <Route path='/trainer' exact element={<Trainer/>}/>
         <Route path='/add' exact element={<Adddata/>}/>
         <Route path='/placement' exact element={<PlacementOfficer/>}/>
         <Route path='/edituser/:id'exact element={<EditUser/>}/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
