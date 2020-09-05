import React, { Component } from 'react';

import Axios from 'axios';
import apiUrl from "./../support/constant/apiUrl";
import { Link } from 'react-router-dom';



class Cart extends Component {

    state={
        dataCart : null,
        dataProduct : null,
        summarOrder : 0,
        potongan : 0
    }
    componentDidMount(){
        this.getDataCart()
        this.mapDataOrderSummary()
        
    }

    getDataCart = () =>{

        // Ambil id user yg sedang login
        var idUser = localStorage.getItem('id')

        if(idUser){
            // get data cart by id user
            Axios.get(apiUrl + "carts?id_user=" + idUser)
            .then((res) =>{
                var url = 'product?'
                res.data.forEach((val) => {
                    // dapat id product buat di get array product dengan id yg dipilih
                    url += 'id=' + val.id_product + '&'
                    // product?id=10&id=3&id=6& ==> 
                    // artinya idUser tersebut memiliki cart yg isinya product dgn id 10, 3, 6
                })
                // console.log(url)
                // console.log(res.data)

                // sort karena urutan memasukan cart tdk urut sama id prodcut
                res.data.sort((a,b) => {
                    return a.id_product - b.id_product
                })
                this.setState({dataCart : res.data})

                // get Data product berdasakan id yg dipilih idUser (10,3,6)
                Axios.get(apiUrl + url)
                .then((res) => {
                var summaryOrder = 0
                var potongan = 0

                res.data.forEach((val,i) =>{
                    summaryOrder += val.price * this.state.dataCart[i].qty
                    potongan += (val.price * (val.discount/100)) * this.state.dataCart[i].qty
                })
                // console.log(potongan)
                // console.log(res.data)
                this.setState({dataProduct : res.data, summarOrder : summaryOrder, potongan : potongan})

                })
                .catch((err) => {
                    console.log(err)
                })

            })
            .catch((err) => {
                console.log(err)
            })
        }
    }


    onRemoveCartBtn = (e) =>{
        var del = e.target.id
        // console.log(del)
        Axios.delete(apiUrl + 'carts/' + del)
        .then((res) => {
            console.log(res)
            this.getDataCart()
            
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnPlusClick = (e) => {
        var up = e.target.id
        // console.log(up)

        Axios.get(apiUrl + 'carts/' + up)
        .then((res) => {
            var qtyBaru = res.data.qty + 1

            Axios.patch(apiUrl + 'carts/' + up, {qty : qtyBaru})
            .then((res) => {
                this.getDataCart()
            })
            .catch((err) => {
                console.log(err.message)
            })
        })
    }
    onBtnMinClick = (e) => {
        var up = e.target.id
        // console.log(up)

        Axios.get(apiUrl + 'carts/' + up)
        .then((res) => {
            var qtyBaru = res.data.qty - 1
            if(res.data.qty === 0){
                Axios.delete(apiUrl + 'carts/' + up)
                .then((res) => {
                    // console.log(res)
                    this.getDataCart()
                    
                })
                .catch((err) => {
                    console.log(err)
                })
            }else{
                Axios.patch(apiUrl + 'carts/' + up, {qty : qtyBaru})
                .then((res) => {
                    // console.log(res.data.qty)
                    this.getDataCart()
                })
                .catch((err) => {
                    console.log(err.message)
                })
            }
        })
        
    }

    mapDataOrderSummary = () =>{
        var arr = []
        var arr2 = 0
        if(this.state.dataProduct !== null && this.state.dataCart !== null){
            this.state.dataProduct.map((val,index)=>{
                arr.push(val.price * this.state.dataCart[index].qty)
            })
            arr.forEach(val => arr2 += val)
            this.setState({summarOrder : arr2})
        }
        // console.log(arr2)
    }

    mapDataCart = () => {
        return this.state.dataCart.map((val, index) =>{
            return (
                <div className="row mb-4" key={index}>
                    <div className="col-7">
                        <div className=" d-flex">
                            <div className=' w-25 '>
                                <img src={this.state.dataProduct[index].image1} className='image-in-carts img-thumbnail' alt='gambar gagal'/>
                            </div>
                            <div className='ml-4 w-75 d-flex flex-column justify-content-center'>
                                <span className='text-secondary mb-2 sporteens-font-14'>{this.state.dataProduct[index].brand}</span>
                                <h5>{this.state.dataProduct[index].name}</h5>
                                <p>Rp. {(this.state.dataProduct[index].price).toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                        <div className='sporteens-font-12 '>
                            <span onClick={this.onBtnMinClick} className='border px-2 py-1 rounded sporteens-clickable-el ' id={val.id}>-</span>
                            <span className=' px-2 py-1 font-weight-bold'>{val.qty}</span>
                            <span onClick={this.onBtnPlusClick} className='border px-2 py-1 rounded sporteens-clickable-el' id={val.id}>+</span>
                        </div>
                        <span><p onClick={this.onRemoveCartBtn} className='p-0 m-0 sporteens-font-12 mt-3 sporteens-clickable-el' id={val.id}>Remove</p></span>
                    </div>
                    <div className="col-3 d-flex flex-column justify-content-center align-items-center">
                        <p className='sporteens-font-12 p-0 m-0'>Rp. {(this.state.dataProduct[index].price * val.qty).toLocaleString('id-ID')}</p>
                    </div>
                </div>
            )
        })
    }

    // mapDataCart = () => {
    //     var summaryOrder = 0
    //     this.state.dataCart.forEach((val, index) =>{
    //         summaryOrder += val.price
    //         console.log(summaryOrder)
    //     })
    // }

    render() {
        return (
            <div>
                {/* Cart Detail Section */}
                <div className="container">
                    <div className="row">
                        <div className="col-8 mt-5">
                            {/* Judul */}
                            <div className="row mb-4 border-bottom font-weight-bold sporteens-font-14 py-2">
                                <div className="col-7 ">
                                    <p className='text-center p-0 m-0'>Item Description</p>
                                </div>
                                <div className="col-2">
                                    <p className='text-center p-0 m-0'>Quantity</p>
                                </div>
                                <div className="col-3">
                                    <p className='text-center p-0 m-0'>Total</p>
                                </div>
                            </div>

                            {/* Isi Cart */}
                           {
                               this.state.dataProduct === null || this.state.dataCart === null ? 
                               <div className='text-center mt-5'>
                                  <h5>Keranjang kamu masih kosong</h5>
                                  <p>Klik <Link to='/products' className='my-link sporteens-onhover'><span>disini</span></Link> untuk mulai belanja</p> 
                                </div>
                               :
                               this.mapDataCart()
                           }
                            {/* End Of Isi Cart */}
                            
                        </div>


                        {/* Checkout Section */}
                        
                        <div className="col-4 mt-5 d-flex flex-column">
                            <div className='border-bottom text-center'>
                                <p className='p-0 m-0 py-2 sporteens-font-14 font-weight-bold'>Order Summary</p>
                            </div>
                            <div className=" mt-3 mb-2 row sporteens-font-14">
                                <span className=' col-6'>Order Sub Total :</span>
                                <span className='col-6 text-right'>Rp. {(this.state.summarOrder).toLocaleString('id-ID')}</span>
                            </div>
                            <div className=" mb-3 row sporteens-font-14">
                                <span className=' col-6'>Promotion :</span>
                                <span className='col-6 text-right'>(Rp. {(this.state.potongan.toLocaleString('id-ID'))})</span>
                            </div>
                            <div className="border-top py-3 d-flex justify-content-between">
                                <span className=' font-weight-bold'>Order Total :</span>
                                <span>Rp. {(this.state.summarOrder - this.state.potongan).toLocaleString('id-ID')} </span>
                            </div>
                            <input type="button" value="Checkout" className='btn tombol-dark mt-4 mb-5'/>

                        </div>
                        <div>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cart;