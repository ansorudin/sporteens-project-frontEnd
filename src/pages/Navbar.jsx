import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes,  faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import ModalLogin from '../component/ModalLogin';
import {Link} from 'react-router-dom'
import Axios from "axios";
import apiUrl from "../support/constant/apiUrl";
import BadgeCart from "../component/BadgeCart";


export class Navbar extends Component{
    state ={
        openToggle : true,
        isLogin : false,
        data : null,
        ava : '',
        badgeCart : null,
        role : null
    }

    componentDidMount(){
        this.getIdUser()
        
    }
    

    onLogout = () => {
        if(window.confirm('are you sure want to logout ??')){
            localStorage.removeItem('id')
            localStorage.removeItem('role')
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
                // jika hasil res adalah data email maka state data diganti data email
                if(res.data.email){
                    this.setState({data : res.data.email, ava : res.data.email, role : res.data.role})
                }else{
                    this.setState({data : res.data.phone, ava : res.data.phone, role : res.data.role})
                }
                

            })
            .catch((err) =>{
                console.log(err)
                alert(err.message)
            })
        }else{
            this.setState({isLogin : false, role : 'guest'})
        }
    }

    

    onOpenToggle = () =>{
        this.setState({openToggle : !this.state.openToggle})
    }



    render(){
        return (
            <div>
            {/* Secondary Navbar */}
            <div className="sporteens-bg-black py-3 sporteens-light">
                <div className="container">
                    <div className="row justify-content-end">
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
                                        <Link to='/carts' className='sporteens-clickable-el my-link my-link sporteens-font-16'> <FontAwesomeIcon icon={faShoppingCart} /> <BadgeCart/> </Link>
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
                    <div className="row justify-content-between px-4 px-md-0">
                        {/* Header Logo */}
                        <div className="sporteens-main-dark sporteens-logo-header sporteens-clickable-el">
                            <Link to='/' className='my-link'>LOGO</Link> 
                        </div>

                        {/* Header Items */}
                        {
                            this.state.role === 'admin' ?
                            <div className="sporteens-main-dark sporteens-items-header d-none d-md-block">
                                <span className='mr-md-3 sporteens-clickable-el'>
                                    <Link to='/' className='my-link'>Home</Link>  
                                </span>
                                <span className='mr-md-3 sporteens-clickable-el' >
                                    <Link to='/products' className='my-link'>Products</Link>
                                </span>
                                <span className='mr-md-3 sporteens-clickable-el'>
                                <Link to='/management-product' className='my-link'>Management</Link>
                                </span>
                                <span className='mr-md-3 sporteens-clickable-el'>
                                <Link to='/admin' className='my-link'>Statistic</Link>
                                </span>
                            </div>
                            :
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

                        }

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
                        <div className="sporteens-main-dark sporteens-header-items-mobile px-4 d-md-none" onClick={this.onOpenToggle}>
                            <div className="mt-3 border-bottom sporteens-clickable-el">
                               <Link className='my-link sporteens-onhover' to='/'>Home</Link> 
                            </div>
                            <div className="mt-3 border-bottom sporteens-clickable-el">
                            <Link className='my-link sporteens-onhover' to='/products'>Products</Link> 
                            </div>
                            <div className="mt-3 border-bottom sporteens-clickable-el">
                            <Link className='my-link sporteens-onhover' to='/brands'>Brands</Link> 
                            </div>
                            {
                                this.state.isLogin ? 
                                <div className="mt-3 border-bottom sporteens-clickable-el mb-2">
                                    <Link className='my-link sporteens-onhover' to='/carts'>Carts</Link> 
                                </div>
                                :
                                <div className="mt-3 border-bottom sporteens-clickable-el d-flex mb-2">
                                    <Link  className='my-link mr-1 sporteens-onhover' to='/register'>Register</Link> / <ModalLogin isi='Login' className='ml-2 sporteens-onhover'/>
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