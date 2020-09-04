import React, { Component } from 'react';
import Axios from 'axios'
import { Link } from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const linkApiProduct = 'http://localhost:2000/product'

class ListProduct extends Component {
    state ={
        data : null,
        filteredData : null,
        dropdownOpen : false,
        isi : 'Default',
        sortBy : '',
        allBrands : null,
        allCategories : null
        
    }

    componentDidMount(){
        this.getDataProduct()
    }

    
    getDataProduct = () =>{
        Axios.get(linkApiProduct)
        .then((res) => {
            // console.log(res.data[0].name)
            console.log(res.data)
            var allBrand = []
            var allCategories = []
            res.data.forEach((val) =>{
                if(!allBrand.includes(val.brand)){
                    allBrand.push(val.brand)
                }
                if(!allCategories.includes(val.category)){
                    allCategories.push(val.category)
                }
            })
            this.setState({data : res.data, filteredData : res.data, allBrands : allBrand, allCategories : allCategories})
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    
    

    mapDataProduct = () => {
        return this.state.filteredData.map((val) => {
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
        this.setState({filteredData : dataSort})
        this.setState({dropdownOpen : !this.state.dropdownOpen})
        this.setState({isi : e.target.value})
    }

    modalFilterSwitch = () =>{
        this.setState({modalFilterOpen : !this.state.modalFilterOpen})
    }

    onApplyFilterClick = () =>{
        var categorySelected = this.refs.category.value
        var brandSelected = this.refs.brand.value
        var dataFilter = this.state.data

        // Jika value category !== all atau value brand !== all maka di filter
        if(!(categorySelected === 'All') || !(brandSelected === 'All')){
            dataFilter = this.state.data.filter((val) => {
                if(categorySelected === 'All'){
                    return val.brand === brandSelected
                }
                if(brandSelected === 'All'){
                    return val.category === categorySelected
                }
                return val.category === categorySelected && val.brand === brandSelected
            })
        }
        this.setState({filteredData : dataFilter, modalFilterOpen : false})
    }

    render() {
        if(this.state.data !== null){
            return (
                <div className=''>
                    {/* Modal Filter */}
                    <Modal centered={true} toggle={this.modalFilterSwitch} isOpen={this.state.modalFilterOpen}>
                        <ModalHeader toggle={this.modalFilterSwitch}>
                            Filter By
                        </ModalHeader>
                        <ModalBody>
                            <p className='p-0 m-0 sporteens-font-14 font-weight-bold'>Category</p>
                            <select className='form-control mt-2' ref='category'>
                                <option value="All">All Category</option>
                            {
                                this.state.allCategories ? 
                                this.state.allCategories.map((val) => {
                                    return (
                                    <option value={val}>{val}</option>
                                    )
                                })
                                :
                                null
                            }
                            </select>

                            <p className='p-0 m-0 mt-4 sporteens-font-14 font-weight-bold'>Brand</p>
                            <select className='form-control mt-2' ref='brand'>
                                <option value="All">All Brand</option>
                                {
                                this.state.allBrands ? 
                                this.state.allBrands.map((val) => {
                                    return (
                                    <option value={val}>{val}</option>
                                    )
                                })
                                :
                                null
                            }
                            </select>
                        </ModalBody>
                        <ModalFooter>
                            <input onClick={this.onApplyFilterClick} type="button" value="Apply" className='btn btn-info'/>
                        </ModalFooter>
                    </Modal>


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

                        <div className="d-flex align-items-center sporteens-font-14 sporteens-clickable-el" onClick={this.modalFilterSwitch}>
                                <span>Filter By : <FontAwesomeIcon icon={faChevronDown}/> </span>
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