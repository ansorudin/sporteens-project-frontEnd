import React, { Component } from 'react';
import Axios from 'axios'

const linkApiProduct = 'http://localhost:2000/product'

class ListProduct extends Component {
    state ={
        data : null
    }

    componentDidMount(){
        this.getDataProduct()
    }

    
    getDataProduct = () =>{
        Axios.get(linkApiProduct)
        .then((res) => {
            // console.log(res.data[0].name)
            this.setState({data : res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    mapDataProduct = () => {
        return this.state.data.map((val) => {
            return(
                <div className="col-md-3 mt-4 mb-3">
                    <div className="border rounded">
                        <div className='rounded d-flex justify-content-center'>
                            <img src={val.image1} className='card-image-top align-self-center img-fluid' alt='gambar gagal'/>
                        </div>
                        <div className="card-body">
                            <h5 className='card-title'>{val.name}</h5>
                            <h6 className='card-text'>
                                {val.price.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'IDR'})}
                            </h6>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        if(this.state.data !== null){
            return (
                <div>
                    <div className="container ">
                        <div className="row">
                         {this.mapDataProduct()}
                        </div>
                    </div>
                </div>
            );
        }
        return(
            <div>
                <h1>Loading</h1>
            </div>
        )
    }
}

export default ListProduct;