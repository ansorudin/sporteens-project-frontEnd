import React, { Component } from 'react';
import Axios from 'axios'
import apiUrl from '../support/constant/apiUrl';
import ModalLogin from '../component/ModalLogin';



class DetailProduct extends Component {
    state = {
        data : null,
        selectPhoto : null,
        isLogin : false
    }
    componentDidMount(){
        this.getDataDetailProduct()
    }

    getDataDetailProduct = () => {
        var id = this.props.match.params.bebas
        var userId = localStorage.getItem('id')

        if(userId) this.setState({isLogin : true})

        Axios.get(apiUrl + 'product/' + id)
        .then((res) => {
            this.setState({data : res.data, selectPhoto : res.data.image1})
            
        })
        .catch((err) => {
            console.log(err)
        })
    }

   
  

    handleModal = () => {
        this.setState({showLogin: !this.state.showLogin})
    }

   
    
   
    onAddToCartBtn = () => {
        var userId = localStorage.getItem('id')
        var id = this.props.match.params.bebas

        // console.log(id)
        Axios.get(apiUrl + 'carts?id_user=' + userId + '&id_product=' + id)
        .then((res) => {
            console.log(res.data)
            if(res.data.length === 0){
                Axios.post(apiUrl + 'carts/', {id_user : userId, id_product : id, qty : 1})
                .then((res) =>{
                    // console.log(res.data)
                })
                .catch((err) => {
                    // console.log(err.message)
                })
            }else{
                var qtyBaru = res.data[0].qty
                
                Axios.patch(apiUrl + 'carts/' + res.data[0].id, {qty : qtyBaru + 1})
                .then((res) =>{
                    // console.log(res.data)
                })
                .catch((err) => {
                    console.log(err.message)
                })
            }
            
        })



        
        
     }


   

    render() {
        if(this.state.data !== null){
            return (  
                <div>
                    <div className="container sporteens-container-detail-product mb-5 ">
                        <div className="row  h-75 mt-5">
                            <div className="col-6 sporteens-detail-product-image ">
                                <div className="container h-100">
                                    <div className="row h-100 ">
                                        <div className=' col-12 h-75'>
                                            <div className="h-100 d-flex align-items-center">
                                                <img src={this.state.selectPhoto} alt="gagal" className='gambar-thumbnail'/>          
                                            </div>
                                        </div>
                                        <div className="h-25 col-12">
                                        <div className="row h-100 justify-content-center  mt-4">
                                            <div className="col-3 p-2 sporteens-clickable-el">
                                                <div className="">
                                                    <img src={this.state.data.image1} alt="gagal" className='gambar-thumbnail' onClick={() => this.setState({selectPhoto : this.state.data.image1})}/>          
                                                </div>
                                            </div>
                                            <div className="col-3 p-2 sporteens-clickable-el" onClick={() => this.setState({selectPhoto : this.state.data.image2})}>
                                                <div className="">
                                                    <img src={this.state.data.image2}  alt="gagal" className='gambar-thumbnail'/>          
                                                </div>
                                            </div>
                                            <div className="col-3 p-2 sporteens-clickable-el" onClick={() => this.setState({selectPhoto : this.state.data.image3})}>
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
                                                    {
                                                        this.state.isLogin ?
                                                        <input  onClick={this.onAddToCartBtn} type="button" value="Add to Chart" className='btn tombol-dark btn-block' />
                                                       :
                                                       <ModalLogin isi='Add to Chart' className='btn tombol-dark btn-block'/>
                                                    }

                                                </div>
                                                <div className="col-3">
                                                    {
                                                        this.state.isLogin ?
                                                        <input type="button" value="Add to Wishlist" className='btn tombol-dark' />
                                                       :
                                                       <ModalLogin isi='Add to Wishlist' className='btn tombol-dark' />
                                                    }
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