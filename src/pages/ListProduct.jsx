import React, { Component } from 'react';
import Axios from 'axios'
import { Link } from 'react-router-dom';

const linkApiProduct = 'http://localhost:2000/product'

class ListProduct extends Component {
    state ={
        data : null,
        
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
                    <div className="col-6 col-md-3 mt-4 mb-3 sporteens-clickable-el" key={val.id}>
                        <div className="h-100">
                            <Link to={'detail-product/' + val.id} className='my-link'>
                            <div className=''>
                                <img src={val.image1} className='card-image-top align-self-center img-fluid gambar-card img-thumbnail' alt='gambar gagal'/>
                            </div>
                                <div><p className='p-0 m-0 text-secondary'>{val.brand}</p></div>
                            <div className="mt-3">
                                <p className='card-title spoerteens-font-14 font-weight-light'>{val.name}</p>
                                    {
                                    val.discount > 0? 
                                    <div>
                                        <span className='d-flex'>

                                    
                                            <h6 className='card-text mr-2'>
                                                <s>Rp. {val.price.toLocaleString('id-ID')}</s>
                                            </h6> 
                                            <span>
                                                <h6>(-{val.discount}%)</h6>
                                            </span>
                                        </span>
                                        <h6 className='card-text text-danger'>
                                            Rp. {(val.price - (val.price / val.discount)).toLocaleString('id-ID')}
                                        </h6>
                                    </div>
                                    : 
                                    <h6 className='card-text'>Rp. {val.price.toLocaleString('id-ID')}</h6>
                                    }
                                
                            </div>
                            </Link>
                        </div>
                    </div>
            )
        })
    }

    render() {
        if(this.state.data !== null){
            return (
                <div className='py-5'>
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