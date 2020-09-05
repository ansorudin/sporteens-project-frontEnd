import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes,  faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import ModalLogin from '../component/ModalLogin';
import {Link} from 'react-router-dom'
import Axios from "axios";
import apiUrl from "../support/constant/apiUrl";


export class Navbar extends Component{
    state ={
        openToggle : false,
        isLogin : false,
        data : null,
        ava : '',
        badgeCart : null
    }

    componentDidMount(){
        this.getIdUser()
        
    }
    

    onLogout = () => {
        if(window.confirm('are you sure want to logout ??')){
            localStorage.removeItem('id')
            window.location = '/'
        }else{
            window.location = '/'
        }

    }

   
    getIdUser = () => {
        // get value di local storage ('id' adalah valuenya)
        var id = localStorage.getItem('id')
        if(id){
            this.setState({isLogin : true})
            Axios.get(apiUrl + 'user/' + id)
            .then((res) => {
                if(res.data.email){
                    this.setState({data : res.data.email, ava : res.data.email})
                }else{
                    this.setState({data : res.data.phone, ava : res.data.phone})
                }
            })
            .catch((err) =>{
                console.log(err)
                alert(err.message)
            })
        }else{
            this.setState({isLogin : false})
        }
    }

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





    render(){
        // {this.getBadgeCarts()}
        return (
            
            <div>

            {/* Secondary Navbar */}
            <div className="sporteens-bg-black py-3 sporteens-light">
                <div className="container">
                    <div className="row justify-content-end ">
                        <div className='mr-3 sporteens-navbar-top d-none d-md-block'>
                            {
                                this.state.isLogin ? 
                                    <div className='sporteens-navbar-top d-none d-md-block '>
                                        <Link onClick={this.onLogout} to='/user-detail' className='sporteens-clickable-el my-link sporteens-font-16'>
                                            {this.state.data ? 
                                            <img src={`https://avatars.dicebear.com/api/human/${this.state.ava}.svg`} alt="kkk" style={{width:'22px', marginTop:'-3px', padding:'1px'}} className='border rounded-circle'/>
                                            : null}
                                        </Link>
                                        <span className='mx-2 my-link sporteens-font-16'> / </span> 
                                        <Link to='/carts' className='sporteens-clickable-el my-link my-link sporteens-font-16'> <FontAwesomeIcon icon={faShoppingCart} /> <span className="badge badge-light rounded-circle bg-danger text-light" style={{maxWidth:'100%', height:'auto',position:'absolute', marginLeft:'-2px', marginTop:'-3px', fontSize:'9px'}} >{this.state.badgeCart}</span></Link>
                                    </div>
                                :
                                <div className="d-flex">
                                    
                                    <ModalLogin isi='Login' className=' sporteens-clickable-el'/>
                                    <span className='mx-1'> / </span> 
                                    <Link to='/register' className='sporteens-clickable-el my-link'>Register</Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="sporteens-bg-light py-4 navbar-sporteens">
                <div className="container">
                    <div className="row justify-content-between px-5 px-md-0">
                        {/* Header Logo */}
                        <div className="sporteens-main-dark sporteens-logo-header sporteens-clickable-el">
                            <Link to='/' className='my-link'>LOGO</Link> 
                        </div>

                        {/* Header Items */}
                        <div className="sporteens-main-dark sporteens-items-header d-none d-md-block">
                            <span className='mr-md-3 sporteens-clickable-el'>
                                <Link to='/' className='my-link'>Home</Link>  
                            </span>
                            <span className='mr-md-3 sporteens-clickable-el' >
                                <Link to='/products' className='my-link'>Products</Link>
                            </span>
                            <span className='mr-md-3 sporteens-clickable-el'>
                            <Link to='/brands' className='my-link'>Brands</Link>
                            </span>
                            <span className='mr-md-3 sporteens-clickable-el'>
                            <Link to='/sale' className='my-link'>Sale</Link>
                            </span>
                        </div>

                        <div className="sporteens-main-dark sporteens-items-mobile d-md-none">
                            {this.state.openToggle ? 
                                <span onClick={() => this.setState({openToggle : false})} className='sporteens-clickable-el'>
                                    <FontAwesomeIcon icon={faTimes} />
                                    
                                </span>
                                :
                                <span onClick={() => this.setState({openToggle : true})} className='sporteens-clickable-el'>
                                    <FontAwesomeIcon icon={faBars} />
                                </span>
                            }
                        </div>
                        
                    </div>
                    {
                        this.state.openToggle ? 
                        <div className="sporteens-main-dark sporteens-header-items-mobile px-4 d-md-none">
                            <div className="mt-3 border-bottom sporteens-clickable-el">
                                Home
                            </div>
                            <div className="mt-3 border-bottom sporteens-clickable-el">
                                Products
                            </div>
                            <div className="mt-3 border-bottom sporteens-clickable-el">
                                Brands
                            </div>
                            {
                                this.state.isLogin ? 
                                <div className="mt-3 border-bottom sporteens-clickable-el">
                                    Carts
                                </div>
                                :
                                <div className="mt-3 border-bottom sporteens-clickable-el d-flex">
                                    <Link className='my-link mr-1' to='/register'>Register</Link> / <ModalLogin isi='Login' className='ml-2'/>
                                </div>
                            }
                        </div>
                    : null
                    } 
                </div>
            </div>
            </div>
        )
    }
}

export default Navbar