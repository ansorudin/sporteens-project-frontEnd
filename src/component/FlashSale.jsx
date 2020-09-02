import React, { Component } from 'react';
import Axios from 'axios';
import apiUrl from '../support/constant/apiUrl';

class FlashSale extends Component {

    state={
        data = null
    }

    getData = () => {
        Axios.get(apiUrl)
        .then((res) =>{
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    render() {
        return (
            <div className="col-md-2 sporteens-clickable-el">
                <div>
                    <div className='sporteens-thumbnail-border d-flex justify-content-center'>
                        <img src='https://nb.scene7.com/is/image/NB/m990gl5_nb_05_i?$pdpPictExp$' className='card-image-top align-self-center img-fluid sporteens-thumbnail-img' alt='gambar gagal'/>
                    </div>
                    <div className="card-body">
                        <p className='p-0 m-0 sporteens-main-dark font-weight-bold'>Product Name</p>
                        <p className='p-0 m-0 text-danger'>30% OFF</p>
                        <p className='p-0 m-0 text-secondary'> <s>Rp. 100000</s> </p>
                        <p className='p-0 m-0 sporteens-main-dark'> Rp. 70000 </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default FlashSale;