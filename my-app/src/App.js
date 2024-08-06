
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home.jsx';
import Login from './Pages/Login/Login.jsx';
import MobileLogin from './Pages/Login/MobileLogin.jsx';
import MobileOTP from './Pages/Login/MobileOTP.jsx';
import EmailLogin from './Pages/Login/EmailLogin.jsx';
import EmailOTP from './Pages/Login/EmailOTP.jsx';
import GoogleLogin from './Pages/Login/GoogleLogin.jsx';
import Register from './Pages/Register/Register.jsx';
import Profile from './Pages/UserProfile/Profile.jsx';
import ProductDetail from './Pages/Product/ProductDetail.jsx';
import User from './Pages/Login/User.jsx';
import FilteredPage from './Pages/FilteredPage/FilteredPage.jsx';
import Product from './Pages/Product/Products.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';


import { AuthProvider } from './AuthContext.js';




const App = () =>  {
  // const [user, setUser] = useState(null);
  
  return (    
    <GoogleOAuthProvider clientId="1080539088484-27r7uupsmlpnaptei93rhi487sgr8f0n.apps.googleusercontent.com">
      <BrowserRouter>
    <div className=''>
        <AuthProvider>
          <Navbar />           
          {/* <WeatherForecast /> */}
          <Routes>
            {/* <Route path='/' element={<Home/>}/>    */}
            {/* <Route path='/admin' element={<Admin />}/>    */}
            <Route path='/login' element={<Login/>}/>            
            <Route path="/login-success/:userID" element={<User />} />
            <Route path='/MobileLogin' element={<MobileLogin/>}/>
            <Route path='/MobileOTP' element={<MobileOTP/>}/>                 
            <Route path='/EmailLogin' element={<EmailLogin/>}/>
            <Route path='/EmailOTP' element={<EmailOTP/>}/>      
            <Route path='/GoogleLogin' element={<GoogleLogin />}/>   
            <Route path='/Register' element={<Register />}/>   
            {/* <Route path='/Profile' element={user ? <Profile /> : <Navigate to="/login" />}/>    */}
            <Route path='/Profile' element={<Profile /> }/>   
            {/* <Route path='/Profile' element={<ProtectedRoute element={<Profile />} />} /> */}
            {/* <Route path='/product/:id_pr' element={<ProductDetail />}/>
            <Route path='/product/' element={<Product />}/>

            <Route path='/filtered' element={<FilteredPage />}/> */}
            <Route path='/*' element={<Home/>}>
              <Route path='product/:id_pr' element={<ProductDetail />}/>
              <Route path='product' element={<Product />}/>

              <Route path='filtered' element={<FilteredPage />}/>
            </Route>
          </Routes>      
        </AuthProvider>
    </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
