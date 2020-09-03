import React, { Component } from 'react';
import image1 from './../support/images/gambar1.jpg'


class Cart extends Component {
    render() {
        return (
            <div>
                {/* Cart Detail Section */}
                <div className="container">
                    <div className="row">
                        <div className="col-8 mt-5">
                            {/* Judul */}
                            <div className="row mb-4 border-bottom font-weight-bold sporteens-font-14 py-2">
                                <div className="col-8 ">
                                    <p className='text-center p-0 m-0'>Item Description</p>
                                </div>
                                <div className="col-2">
                                    <p className='text-center p-0 m-0'>Quantity</p>
                                </div>
                                <div className="col-2">
                                    <p className='text-center p-0 m-0'>Total</p>
                                </div>
                            </div>

                            {/* Isi Cart */}
                            <div className="row mb-4">
                                <div className="col-8">
                                    <div className="  d-flex">
                                        <div className=' w-25 '>
                                            <img src={image1} className='image-in-carts img-thumbnail' alt='gambar gagal'/>
                                        </div>
                                        <div className='ml-4 w-75 d-flex flex-column justify-content-center'>
                                            <span className='text-secondary mb-2 sporteens-font-14'>Vans</span>
                                            <h5>Anaheim Factory Old Skool 36 DX</h5>
                                            <p>Rp. 750.000</p>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                                    <div className='sporteens-font-12 '>
                                        <span className='border px-2 py-1 rounded sporteens-clickable-el'>-</span>
                                        <span className=' px-2 py-1 font-weight-bold'>0</span>
                                        <span className='border px-2 py-1 rounded sporteens-clickable-el'>+</span>
                                    </div>
                                    <span><p className='p-0 m-0 sporteens-font-12 mt-3 sporteens-clickable-el'>Remove</p></span>
                                </div>
                                <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                                    <p className='sporteens-font-12 p-0 m-0'>Rp. 10.050.000</p>
                                </div>
                            </div>
                            
                        </div>
                        {/* End Of Isi Cart */}


                        {/* Checkout Section */}
                        <div></div>
                        <div className="col-4 mt-5 d-flex flex-column justify-content-center">
                            <div className='border-bottom text-center'>
                                <p className='p-0 m-0 py-2 sporteens-font-14 font-weight-bold'>Order Summary</p>
                            </div>
                            <div className=" mt-3 mb-2 row sporteens-font-14">
                                <span className=' col-8'>Order Sub Total :</span>
                                <span className='col-4'>Rp. 2.500.000</span>
                            </div>
                            <div className=" mb-3 row sporteens-font-14">
                                <span className=' col-8'>Promotion :</span>
                                <span className='col-4'>Rp. 500.000 -</span>
                            </div>
                            <div className="border-top py-3 d-flex justify-content-between">
                                <span className=' font-weight-bold'>Order Total :</span>
                                <span>Rp. 2000.000</span>
                            </div>
                            <input type="button" value="Checkout" className='btn tombol-dark mt-4 mb-5'/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cart;