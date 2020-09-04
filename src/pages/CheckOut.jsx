import React, { Component } from 'react';


class CheckOut extends Component {
    render() {
        return (
            <div>
                {/* Check Detail Section */}
                <div className="container">
                    <div className="row">
                        <div className="col-8 mt-5">
                            {/* Judul */}
                            <div className="row mb-4 border-bottom font-weight-bold sporteens-font-14 py-2">
                                <div className="col-6 ">
                                    <p className='text-center p-0 m-0'>Shipping Address</p>
                                </div>
                                <div className="col-3">
                                    <p className='text-center p-0 m-0'>Name</p>
                                </div>
                                <div className="col-3">
                                    <p className='text-center p-0 m-0'>Mobile Phone</p>
                                </div>
                            </div>

                            {/* Isi Checkout */}
                            <div className="row mb-4">
                                <div className="col-6">
                                  <div className="border rounded p-3">
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione, in deserunt maiores quae distinctio nostrum iure eius eum, modi ex reiciendis, pariatur dignissimos tempora accusamus ipsum placeat earum quia delectus.
                                    </p>
                                  </div>
                                </div>
                                <div className="col-3">
                                    <p className='text-center'>Ahmad Ansorudin</p>
                                </div>
                                <div className="col-3">
                                    <p className='text-center'>082111014768</p>
                                </div>
                            </div>
                            
                        </div>
                        {/* End Of Isi Cart */}


                        {/* Payment Section */}
                        <div></div>
                        <div className="col-4 mt-5 d-flex flex-column justify-content-center">
                            <div className='border-bottom text-center'>
                                <p className='p-0 m-0 py-2 sporteens-font-14 font-weight-bold'>Payment Method</p>
                            </div>
                            <div className=" mt-3 mb-2 row sporteens-font-14">
                                <span className=' col-8'>Order Total :</span>
                                <span className='col-4'>Rp. 2.000.000</span>
                            </div>
                            <div className=" mb-3 row sporteens-font-14">
                                <span className=' col-8'>Promotion :</span>
                                <span className='col-4'>

                                </span>
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

export default CheckOut;