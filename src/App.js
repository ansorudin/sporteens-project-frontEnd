import React from 'react'
import Navbar from './pages/Navbar.jsx'
import './support/Component.css'
import './support/Utilities.css'
import './support/LandingPage.css'
import './support/registrasi.css'
import './support/detailProduct.css'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import ListProduct from './pages/ListProduct.jsx'
import Brands from './pages/Brands.jsx'
import Cart from './pages/Cart.jsx'
import Registrasi from './pages/Registrasi.jsx'
import DetailProduct from './pages/DetailProduct.jsx'



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
            <Route path='/detail-product' component={DetailProduct} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App