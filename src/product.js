import React from 'react';
import Axios from 'axios';
import apiUrl from './support/constant/apiUrl';
import ManagementProduct from './pages/ManagementProduct';
import ListProduct from './pages/ListProduct';

class Home extends React.Component {

  state = {
    role : ''
  }

  componentDidMount(){
    this.getRole()
  }
  
  getRole = () => {

    var id = localStorage.getItem('id')
    Axios.get(apiUrl + 'user/' + id)
    .then((res) => {
      this.setState({role : res.data})
    })
    .catch((err) => {
      console.log(err)
    })

  }


  render() {
    return this.state.role.role === "admin" ? <ManagementProduct /> : <ListProduct /> ;
  }
}

export default Home;