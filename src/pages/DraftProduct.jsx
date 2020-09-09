import React, { Component } from 'react';
import Axios from 'axios';
import apiUrl from '../support/constant/apiUrl';

class DraftProduct extends Component {
    state ={
        data : null
    }

    componentDidMount(){
        this.getDataDraft()
    }

    getDataDraft = () => {
        Axios.get(apiUrl + 'draft')
        .then((res) => {
            this.setState({data : res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    mapDataAll = () => {
        return this.state.data.map((val) => {
            return(
                <div className='col-6 border py-3 mb-3' key={val.id}>
                    <h6>{val.name}</h6>
                    <div>
                        <p className='sporteens-font-14'>Product Category : <span>{val.category}</span></p>
                        <p className='sporteens-font-14'>Product Brand : <span>{val.brand}</span> </p>
                        <p className='sporteens-font-14'>Product price : <span>{val.price}</span> </p>
                        <p className='sporteens-font-14'>Product Qty : <span>{val.discount}</span> </p>
                        <p className='sporteens-font-14'>Product Discount : <span>{val.Stock}</span> </p>
                        <p className='sporteens-font-14 mt-2 '>Link Image 1 : <span>{val.image1}</span> </p>
                        <p className='sporteens-font-14 mt-2 mb-2'>Link Image 2 : <span>{val.image2}</span> </p>
                        <p className='sporteens-font-14'>Link Image 3 : <span>{val.image3}</span> </p>

                    </div>
                </div>
            )
        })
    }
    render() {
        return (
            <div className='py-5'>
                <div className="container mt-3">
                    <h3 className='text-center mb-5'>Draft Product</h3>
                    <div className="row mt-4">
                        {
                            this.state.data ? this.mapDataAll() : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default DraftProduct;