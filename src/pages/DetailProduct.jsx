import React, { Component } from 'react';

class DetailProduct extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row border">
                        <div className="col-6 sporteens-detail-product-image border">
                            <div className="container h-100">
                                <div className="row h-100 border">
                                    <div className='border col-12 h-75'>ini yg gede</div>
                                    <div className="h-25 border col-12">
                                        <div className="row border h-100 justify-content-center">
                                            <div className="col-3 p-2 h-100">
                                                <div className="border h-100"></div>
                                            </div>
                                            <div className="col-3 p-2 h-100">
                                                <div className="border h-100"></div>
                                            </div>
                                            <div className="col-3 p-2 h-100">
                                                <div className="border h-100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                

                            </div>
                        </div>
                        <div className="col-6 sporteens-detail-product-deskripsi border">
                                <div className="row">
                                    <div className="col-12 deskripsi-nama border ">
                                        <h4>Nike Air Max 90s</h4>
                                        <h6>Terjual 20 Pcs</h6>
                                        <h4>Rp. 200.000</h4>
                                    </div>
                                    <div className="col-12 deskripsi-stock border">
                                        <div>
                                            <h5>Stock</h5>
                                            <h5>20 pcs</h5>
                                        </div>
                                        <div>
                                            <h5>Berat</h5>
                                            <h5>350 gr</h5>
                                        </div>
                                    </div>
                                    <div className="col-12 deskripsi-text border">
                                        <div>
                                            <h5>deskripsi</h5>
                                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab unde placeat dignissimos ratione quod laboriosam officiis facilis tempora ipsa sed. Minima dolor nostrum beatae est sapiente accusantium in distinctio? Sunt.</p>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailProduct;