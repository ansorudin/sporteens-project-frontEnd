import React, { Component } from 'react';
import Axios from 'axios';
import apiUrl from '../support/constant/apiUrl';

class BadgeCart extends Component {

    state = {
        badgeCart : null
    }

    componentDidMount(){
        this.getBadgeCarts()
    }


    // componentWillMount(){
    //     this.getBadgeCarts()
    // }
    // componentWillUpdate = () =>{
    //     this.getBadgeCarts()
    // }
    // componentWillReceiveProps (){
    //     this.getBadgeCarts()
    // }

    getBadgeCarts = () =>{
        var id = localStorage.getItem('id')

        Axios.get(apiUrl + 'carts?id_user=' + id)
        .then((res) => {
            console.log(res.data)
            if(res.data.length !== 0){
                this.setState({badgeCart : res.data.length})
                console.log('ada')
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    render() {
        return (
            <span className="badge badge-light rounded-circle bg-danger text-light" style={{maxWidth:'100%', height:'auto',position:'absolute', marginLeft:'-2px', marginTop:'-3px', fontSize:'9px'}} >{this.state.badgeCart}</span>
        );
    }
}

export default BadgeCart;