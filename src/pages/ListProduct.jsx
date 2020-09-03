import React, { Component } from 'react';
import Axios from 'axios'
import { Link } from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const linkApiProduct = 'http://localhost:2000/product'

class ListProduct extends Component {
    state ={
        data : null,
        dropdownOpen : false,
        isi : 'Default',
        sortBy : ''
        
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

    toggleDropdown = () =>{
        this.setState({dropdownOpen : !this.state.dropdownOpen})
    }

    onChangeSort = (e) =>{
        var dataSort = this.state.data
        console.log(e.target.value)
        if(e.target.value === 'New Product'){
            dataSort.sort((a,b) => {
                return b.id - a.id
            })
        }else if(e.target.value === 'Price Low-High'){
            dataSort.sort((a,b) => {
                return a.price - b.price
            })
        }else if(e.target.value === 'Price High-Low'){
            dataSort.sort((a,b) => {
                return b.price - a.price
            })
        }else if(e.target.value === 'Discount'){
            dataSort.sort((a,b) => {
                return b.discount- a.discount
            })
        }else if(e.target.value === 'Default'){
            dataSort.sort((a,b) => {
                return a.id - b.id
            })
        }
        this.setState({data : dataSort})
        this.setState({dropdownOpen : !this.state.dropdownOpen})
        this.setState({isi : e.target.value})
    }

    render() {
        if(this.state.data !== null){
            return (
                <div className=''>
                    {/* Jumbotron Section */}
                    <div className='sporteens-jumbotron-listProduct container mt-5 mb-5'>
                        <div className="d-flex flex-column justify-content-center h-100 px-5">
                            <div className='sporteens-light'> 
                                <h2>FIND YOUR STYLE</h2>
                            </div>
                            <div className="sporteens-light w-25">
                                <h5>From classic to Comfort we have the style you need.</h5>
                            </div>
                        </div>
                    </div>

                    {/* DropDown for Sort Product*/}

                    <div className="container">
                        <div className="d-flex align-items-center sporteens-font-14">
                            <div className="">
                                <span>Sort By :</span>
                            </div>
                            <div className="ml-2 sporteens-clickable-el">
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown} >
                                    <DropdownToggle
                                        tag="span"
                                        data-toggle="dropdown"
                                        aria-expanded={this.state.dropdownOpen}
                                    >
                                    {this.state.isi}
                                    <FontAwesomeIcon icon={faChevronDown} className='ml-2'/>
                                    </DropdownToggle>
                                    <DropdownMenu  >
                                        <div className='sporteens-clickable-el px-3 sporteens-font-14'>
                                            <option onClick={this.onChangeSort} className='sporteens-onhover'>New Product</option>
                                            <option onClick={this.onChangeSort} className='sporteens-onhover'>Price Low-High</option>
                                            <option onClick={this.onChangeSort} className='sporteens-onhover'>Price High-Low</option>
                                            <option onClick={this.onChangeSort} className='sporteens-onhover'>Discount</option>
                                            <option onClick={this.onChangeSort} className='sporteens-onhover'>Default</option>
                                        </div>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>

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