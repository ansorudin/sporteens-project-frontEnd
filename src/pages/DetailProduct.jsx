import React, { Component } from 'react';
import Axios from 'axios'

var linkApi = 'http://localhost:2000/product'

class DetailProduct extends Component {
    state = {
        apaja : null,
        selectId : 1
    }
    componentDidMount(){
        this.getDataDetailProduct()
    }

    getDataDetailProduct = () => {
        Axios.get(linkApi)
        .then((res) => {
            this.setState({apaja : res.data})
            
        })
        .catch((err) => {
            console.log(err)
        })
    }

    mapDataImage = () => {
        return this.state.apaja.map((val) => {
            return(
                <div className="row h-100 justify-content-center">
                <div className="col-3 p-2 sporteens-clickable-el" onClick={() => this.setState({selectId : 1})}>
                    <div className="border rounded h-100 d-flex align-items-center">
                        <img src={val.image1} alt="gagal" className='gambar-thumbnail'/>          
                    </div>
                </div>
                <div className="col-3 p-2 sporteens-clickable-el" onClick={() => this.setState({selectId : 2})}>
                    <div className="border rounded h-100 d-flex align-items-center">
                        <img src={val.image2} alt="gagal" className='gambar-thumbnail'/>          
                    </div>
                </div>
                <div className="col-3 p-2 sporteens-clickable-el" onClick={() => this.setState({selectId : 3})}>
                    <div className="border rounded h-100 d-flex align-items-center">
                        <img src={val.image3} alt="gagal" className='gambar-thumbnail'/>          
                    </div>
                </div>
                </div>
            )
        })
    }

    mapImageBesar = () => {
        return this.state.apaja.map((val) => {
            if(this.state.selectId === 1){
                return(
                <div className="h-100 d-flex align-items-center">
                    <img src={val.image1} alt="gagal" className='gambar-thumbnail'/>          
                </div>
                )
            }else if(this.state.selectId === 2){
                return(
                <div className="h-100 d-flex align-items-center">
                    <img src={val.image2} alt="gagal" className='gambar-thumbnail'/>          
                </div>
                )
            }else{
                return(
                <div className="h-100 d-flex align-items-center">
                    <img src={val.image3} alt="gagal" className='gambar-thumbnail'/>          
                </div>
                )
            }
        }
    )}

    mapDataDesc = () =>{
        return this.state.apaja.map((val) => {
            return(
                <div className="col-12 deskripsi-nama  d-flex flex-column justify-content-center border-bottom">
                    <div className='mb-3'>
                        <h4>{val.name}</h4>
                        <h6>Terjual 20 Pcs</h6>
                    </div>
                    <h4>{val.price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'IDR'})}</h4>
                </div>
            )
        })
    }

    render() {
        if(this.state.apaja !== null){
            return (
                <div>
                    <div className="container sporteens-container-detail-product ">
                        <div className="row  h-75 mt-5">
                            <div className="col-6 sporteens-detail-product-image ">
                                <div className="container h-100">
                                    <div className="row h-100 ">
                                        <div className=' col-12 h-75'>
                                           {this.mapImageBesar()}
                                        </div>
                                        <div className="h-25 col-12">
                                            {this.mapDataImage()} 
                                        </div>
                                    </div>
                                    
    
                                </div>
                            </div>
                            <div className="col-6 sporteens-detail-product-deskripsi h-100">
                                    <div className="row h-100">
                                        {this.mapDataDesc()}
                                        <div className="col-12 deskripsi-stock  d-flex flex-column justify-content-center border-bottom">
                                            <div>
                                                <h5>Stock</h5>
                                                <h5>20 pcs</h5>
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
                                                    <input type="button" value="Add to Chart" className='btn tombol-dark btn-block'/>
                                                </div>
                                                <div className="col-3">
                                                    <input type="button" value="Add to Wishlist" className='btn tombol-dark'/>
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