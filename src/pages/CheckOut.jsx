import React, { Component } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import apiUrl from '../support/constant/apiUrl';
import moment from 'moment';



class CheckOut extends Component {
    state = {
        paymentMethods1Toggle : false,
        paymentMethods2Toggle : false,
        paymentMethods3Toggle : false,
        data : null
    }

    componentDidMount(){
        this.getDataTransactions()
    }

    getDataTransactions = () => {
        // dapetin id transactions nambahin params di app.js
        var id = this.props.match.params.idTrans

        // get data transactions dengan carts id ngambil pake method params
        Axios.get(apiUrl + 'transactions/' + id)
        .then((res) => {
            // console.log(res)
            this.setState({data : res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }





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
                                    <p className='text-center p-0 m-0'>Date</p>
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
                                  <input type="button" className="btn btn-outline-info mt-3" value='change address'/>
                                </div>
                                <div className="col-3">
                                    <p className='text-center'>Ahmad Ansorudin</p>
                                </div>
                                <div className="col-3">
                                    <p className='text-center'>{this.state.data ? moment(this.state.data.createdAt).format('MMMM Do YYYY, h:mm:ss a')  : null}</p>
                                </div>
                            </div>
                            
                        </div>
                        {/* End Of Isi Cart */}


                        {/* Payment Section */}
                        <div></div>
                        <div className="col-4 mt-5 d-flex flex-column">
                            <div className='border-bottom text-center'>
                                <p className='p-0 m-0 py-2 sporteens-font-14 font-weight-bold'>Payment Method</p>
                            </div>
                            <div className=" mt-3 mb-2 row sporteens-font-14">
                                <span className=' col-8'>Items </span>
                                <span className='col-4'>Sub Total</span>
                            </div>
                            <div className=" mb-2 row sporteens-font-14">
                                <span className=' col-8'>Nike air force <span>(x 1)</span></span>
                                <span className='col-4'>Rp.2.000.000</span>
                            </div>
                            <div className=" mb-2 row sporteens-font-14">
                                <span className=' col-8'>Sub-total</span>
                                <span className='col-4'>{this.state.data ? this.state.data.totalPrice.toLocaleString('id-ID'):null}</span>
                            </div>
                            <div className=" mb-2 row sporteens-font-14">
                                <span className=' col-8'>Shipping Rates</span>
                                <span className='col-4'>Rp.20.000</span>
                            </div>
                            <div className=" mb-2 row sporteens-font-14">
                                <span className=' col-8'>Unique Digit</span>
                                <span className='col-4'>Rp. 498</span>
                            </div>
                            <div className=" mb-2 row sporteens-font-14">
                                <span className=' col-8'>Total</span>
                                <span className='col-4'>{this.state.data ? (this.state.data.totalPrice + 20000 + 498).toLocaleString('id-ID'):null}</span>
                            </div>

                            <div className=" mb-3 row sporteens-font-14">
                                <span className=' col-8'>Paymet Method :</span>
                                <span className='col-4'>
                                </span>

                            <div>
                                 <input type="button" value="Checkout" className='btn tombol-dark mt-4 mb-5'/>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>    
        );
    }
}

export default CheckOut;