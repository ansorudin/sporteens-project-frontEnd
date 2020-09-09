import React from 'react'
import Navbar from './pages/Navbar.jsx'
import './support/css/Component.css'
import './support/css/Utilities.css'
import './support/css/LandingPage.css'
import './support/css/registrasi.css'
import './support/css/detailProduct.css'
import './support/css/Cart.css'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import ListProduct from './pages/ListProduct.jsx'
import Brands from './pages/Brands.jsx'
import Cart from './pages/Cart.jsx'
import Registrasi from './pages/Registrasi.jsx'
import DetailProduct from './pages/DetailProduct.jsx'
import CreatePassword from './pages/CreatePassword.jsx'
import CheckOut from './pages/CheckOut.jsx'
import TransactionsHistory from './pages/TransactionsHistory.jsx'
import EditPassword from './pages/EditPassword.jsx'
import ManagementProduct from './pages/ManagementProduct.jsx'
import DraftProduct from './pages/DraftProduct.jsx'
import Admin from './pages/Admin.jsx'
import Axios from 'axios'
import apiUrl from './support/constant/apiUrl.js'
import PageNotFound from './pages/PageNotFound.jsx'



class App extends React.Component{


  state = {
    role : null
  }

  componentDidMount(){
    this.getRole()
  }
  
  getRole = () => {
    var id = localStorage.getItem('id')
    if(id){
      Axios.get(apiUrl + 'user/' + id)
      .then((res) => {
        this.setState({role : res.data.role})
      })
      .catch((err) => {
        console.log(err)
      })
    }else{
      this.setState({role : 'guest'})
    }
  }

  render(){
    if(this.state.rol === null){
      return(
        <p>Loading....</p>
      )
    }
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
            <Route path='/transactions-history' component={TransactionsHistory} />
            <Route path='/detail-product/:bebas' component={DetailProduct} />
            <Route path='/create-password' component={CreatePassword} />
            <Route path='/checkout/:idTrans' component={CheckOut} />
            <Route path='/edit-password' component={EditPassword} />
            
            {this.state.role === 'admin' ?  <Route path='/management-product' component={ManagementProduct} />: null}
            {this.state.role === 'admin' ? <Route path='/admin' component={Admin} /> : null}

            <Route path='/draft-product' component={DraftProduct} />
            <Route path='*' component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App