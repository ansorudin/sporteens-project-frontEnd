import React, { Component } from 'react';
import Axios from 'axios'
import apiUrl from '../support/constant/apiUrl';

import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';



class DetailProduct extends Component {
    state = {
        data : null,
        selectId : 1,
        showLogin : false
    }
    componentDidMount(){
        this.getDataDetailProduct()
    }

    getDataDetailProduct = () => {
        var id = this.props.match.params.bebas
        Axios.get(apiUrl + 'product/' + id)
        .then((res) => {
            this.setState({data : res.data})
            
        })
        .catch((err) => {
            console.log(err)
        })
    }

  
  
    imageBesar = () =>{
        if(this.state.selectId === 1){
            return(
            <div className="h-100 d-flex align-items-center">
                <img src={this.state.data.image1} alt="gagal" className='gambar-thumbnail'/>          
            </div>
            )
        }else if(this.state.selectId === 2){
            return(
            <div className="h-100 d-flex align-items-center">
                <img src={this.state.data.image2} alt="gagal" className='gambar-thumbnail'/>          
            </div>
            )
        }else{
            return(
            <div className="h-100 d-flex align-items-center">
                <img src={this.state.data.image3} alt="gagal" className='gambar-thumbnail'/>          
            </div>
            )
        }
    }

    handleModal = () => {
        this.setState({showLogin: !this.state.showLogin})
    }

    onAddWishlistBtn = () => {
        var id = localStorage.getItem('id')
        if(id){
            // udah login
        }else{
            this.setState({showLogin : true})
        }
    }
    onAddToCartBtn = () => {
        var id = localStorage.getItem('id')
        if(id){
 
        }else{
            this.setState({showLogin : true})
        }
     }
   

    render() {
        if(this.state.data !== null){
            return (  
                <div>
                    <Modal show={this.state.showLogin} onHide={() => this.handleModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container p-3">
                        <form>
                            <div className="form-group px-4">
                                <label>Username : </label>
                                <input type="text" placeholder='Enter your email or phone' className='form-control'/>
                            </div>
                            <div className="form-group px-4">
                                <label>Password : </label>
                                <input type="password" placeholder='Enter your password' className='form-control'/>
                            </div>
                            <div className="form-group px-4">
                                <input type="button" value="Submit" className='btn tombol-dark'/>
                            </div>
                        </form>
                            <p className='p-0 m-0 mt-5 text-center'>Not have account ? Register <Link to='/register' className='my-link' onClick={() => this.handleModal()}><span className='font-weight-bold'>here</span></Link></p>
                        </div>
                    </Modal.Body>
                </Modal>
                    <div className="container sporteens-container-detail-product mb-5 ">
                        <div className="row  h-75 mt-5">
                            <div className="col-6 sporteens-detail-product-image ">
                                <div className="container h-100">
                                    <div className="row h-100 ">
                                        <div className=' col-12 h-75'>
                                           {this.imageBesar()}
                                        </div>
                                        <div className="h-25 col-12">
                                        <div className="row h-100 justify-content-center  mt-4">
                                            <div className="col-3 p-2 sporteens-clickable-el" onClick={() => this.setState({selectId : 1})}>
                                                <div className="">
                                                    <img src={this.state.data.image1} alt="gagal" className='gambar-thumbnail'/>          
                                                </div>
                                            </div>
                                            <div className="col-3 p-2 sporteens-clickable-el" onClick={() => this.setState({selectId : 2})}>
                                                <div className="">
                                                    <img src={this.state.data.image2}  alt="gagal" className='gambar-thumbnail'/>          
                                                </div>
                                            </div>
                                            <div className="col-3 p-2 sporteens-clickable-el" onClick={() => this.setState({selectId : 3})}>
                                                <div className="">
                                                    <img src={this.state.data.image3}  alt="gagal" className='gambar-thumbnail'/>          
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    
    
                                </div>
                            </div>
                            <div className="col-6 sporteens-detail-product-deskripsi h-100">
                                    <div className="row h-100">
                                    <div className="col-12 deskripsi-nama  d-flex flex-column justify-content-center border-bottom">
                                        <div className='mb-3'>
                                            <h4>{this.state.data.name}</h4>
                                            <h6>Terjual 20 Pcs</h6>
                                        </div>
                                        {
                                        this.state.data.discount > 0? 
                                        <div>
                                            <span className='d-flex'>
                                                <h4 className='card-text mr-2'>
                                                    <s>Rp. {this.state.data.price.toLocaleString('id-ID')}</s>
                                                </h4> 
                                                <span>
                                                    <h4>(-{this.state.data.discount}%)</h4>
                                                </span>
                                            </span>
                                            <h4 className='card-text text-danger'>
                                                Rp. {(this.state.data.price - (this.state.data.price / this.state.data.discount)).toLocaleString('id-ID')}
                                            </h4>
                                        </div>
                                        : 
                                        <h4 className='card-text'>Rp. {this.state.data.price.toLocaleString('id-ID')}</h4>
                                        }

                                    </div>
                                        <div className="col-12 deskripsi-stock  d-flex flex-column justify-content-center border-bottom">
                                            <div>
                                                <h5>Stock</h5>
                                                <h5>{this.state.data.Stock} pcs</h5>
                                            </div>
                                            <div>
                                                <h5>Berat</h5>
                                                <h5>350 gr</h5>
                                            </div>
                                        </div>
                                        <div className="col-12 deskripsi-text  d-flex flex-column justify-content-center">
                                            <div>
                                                <h5>Deskripsi</h5>
                                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab unde placeat dignissimos ratione quod laboriosam officiis facilis tempora ipsa sed. Minima dolor nostrum beatae est sapiente accusantium in distinctio? Sunt.</p>
                                            </div>
                                            <div className='row'>
                                                <div className="col-8">
                                                    <input type="button" value="Add to Chart" className='btn tombol-dark btn-block' onClick={this.onAddToCartBtn}/>
                                                </div>
                                                <div className="col-3">
                                                    <input type="button" value="Add to Wishlist" className='btn tombol-dark' onClick={this.onAddWishlistBtn}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return(
            <div>
                <h1>hahaha</h1>
            </div>
        )
        }
    
}

export default DetailProduct;