import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer/Footer';
import Navigation from './Components/Navbar/Navigation';
import Homepage from './Pages/Homepage/Homepage';
import Loginpage from './Pages/Loginpage/Loginpage';
import Landingpage from './Pages/Landingpage/Landingpage';
import Registerpage from './Pages/Registerpage.jsx/Registerpage';
import Editpage from './Pages/Editpage/Editpage';
import Viewpage from './Pages/Viewpage/Viewpage';
import Searchpage from './Pages/Searchpage/Searchpage';

function App() {
  return (
    <div>
      <div className='Navbar'><Navigation logged={true}/></div>

      <div>
        <Routes>
          <Route path={'/'} element={<Homepage/>}/>
          <Route path={'/loginpage'} element={<Loginpage/>}/>
          <Route path={'/registerpage'} element={<Registerpage/>}/>
          <Route path={'/landingpage'} element={<Landingpage/>}/>
          <Route path={'/task/editpage/:id'} element={<Editpage/>}/>
          <Route path={'/task/viewpage/:id'} element={<Viewpage/>}/> 
          <Route path={'/searchpage'} element={<Searchpage/>}/>     
        </Routes>
      </div>

      <div className='footer'><Footer/></div>
    </div>
  );
}

export default App;
