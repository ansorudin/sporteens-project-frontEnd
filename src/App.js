import React from 'react'
import Navbar from './pages/Navbar.jsx'
import './support/css/Component.css'
import './support/css/Utilities.css'
import './support/css/LandingPage.css'
import './support/css/registrasi.css'
import './support/css/detailProduct.css'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import ListProduct from './pages/ListProduct.jsx'
import Brands from './pages/Brands.jsx'
import Cart from './pages/Cart.jsx'
import Registrasi from './pages/Registrasi.jsx'
import DetailProduct from './pages/DetailProduct.jsx'
import CreatePassword from './pages/CreatePassword.jsx'



class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <div>
          <Navbar/> 
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route path='/products' component={ListProduct} />
            <Route path='/brands' component={Brands} />
            <Route path='/carts' component={Cart} />
            <Route path='/register' component={Registrasi} />
            <Route path='/detail-product/:bebas' component={DetailProduct} />
            <Route path='/create-password' component={CreatePassword} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App