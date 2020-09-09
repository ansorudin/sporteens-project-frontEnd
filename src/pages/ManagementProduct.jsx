import React, { Component } from 'react';
import Axios from 'axios';
import apiUrl from '../support/constant/apiUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'reactstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { ModalBody } from 'react-bootstrap';

class ManagementProduct extends Component {

    state = {
        data : null,
        openToggle : false,
        selectId : null,
        selectIdDell : null
    }

    componentDidMount(){
        this.getDataAllProduct()
    }

    getDataAllProduct = () => {
        Axios.get(apiUrl + 'product')
        .then((res) => {
            // console.log(res.data)
            this.setState({data : res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onSaveEdit = () => {

        const data = {
            name : this.refs.nameNew.value,
            brand : this.refs.brandNew.value,
            price : this.refs.priceNew.value,
            category : this.refs.categoryNew.value,
            qty : this.refs.qtyNew.value,
            discount : this.refs.discountNew.value,
            image1 : this.refs.image1New.value,
            image2 : this.refs.image2New.value,
            image3 : this.refs.image3New.value
        }

        // console.log(data)

        if(data){
            Axios.patch(apiUrl + 'product/' + this.state.selectId, data)
            .then((res) => {
                alert('Edit your data succes')
                this.setState({selectId : null})
            })
            .catch((err) => {
                console.log(err)
            })
        }else{
            alert('data tidak boleh ada yang kosng')
        }
    }


    mapDataAll = () => {
        return this.state.data.map((val,index) => {
            if(this.state.selectId === val.id){
                return(
                    <div className='col-6 border py-3 mb-3' key={index}>
                        <h6> <span><input type="text" ref='nameNew' defaultValue={val.name} className='form-control'/></span></h6>
                        <div>
                            <p className='sporteens-font-14'>Product Category : <span><input type="text" ref='categoryNew' defaultValue={val.category} className='form-control'/></span></p>
                            <p className='sporteens-font-14'>Product Brand :  <span><input type="text" ref='brandNew' defaultValue={val.brand} className='form-control'/></span></p>
                            <p className='sporteens-font-14'>Product price :  <span><input type="text" ref='priceNew' defaultValue={val.price} className='form-control'/></span> </p>
                            <p className='sporteens-font-14'>Product Qty :  <span><input type="text" ref='qtyNew' defaultValue={val.Stock} className='form-control'/></span> </p>
                            <p className='sporteens-font-14'>Product Discount :  <span><input type="text" ref='discountNew' defaultValue={val.discount} className='form-control'/></span></p>
                            <p className='sporteens-font-14 mt-2 '>Link Image 1 :  <span><input type="text" ref='image1New' defaultValue={val.image1} className='form-control'/></span></p>
                            <p className='sporteens-font-14 mt-2 mb-2'>Link Image 2 : <span><input type="text" ref='image2New' defaultValue={val.image2} className='form-control'/></span></p>
                            <p className='sporteens-font-14'>Link Image 3 :  <span><input type="text" ref='image3New' defaultValue={val.image3} className='form-control'/></span></p>
                            <input type="button" value="Save Edit" className='btn btn-outline-danger mt-4' onClick={this.onSaveEdit}/>
                            <input type="button" value="Cancel" className='ml-4 btn btn-outline-danger mt-4' onClick={() =>this.setState({selectId : null})}/>
                        </div>
                    </div>
                )
            }
            return(
                <div className='col-6 border py-3 mb-3' key={index}>
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
                        <input type="button" value="Edit This Product" className='btn btn-outline-danger mt-4' onClick={() => this.setState({selectId : val.id})}/>
                        <input type="button" value="Move to Draft" className='btn btn-outline-danger mt-4' onClick={() => this.onMoveToDraft(val.id)}/>
                    </div>
                </div>
            )
        })
    }

    onSubmitBtn = () => {
        var name = this.refs.name.value
        var brand = this.refs.brand.value
        var price = this.refs.price.value
        var category = this.refs.category.value
        var qty = this.refs.qty.value
        var discount = this.refs.discount.value
        var image1 = this.refs.image1.value
        var image2 = this.refs.image2.value
        var image3 = this.refs.image3.value

        if(name && brand && price && category && qty && discount && image1 && image2 && image3){
            Axios.post(apiUrl + 'product', {name : name, brand : brand, price : price, category : category, Stock : qty, discount : discount, image1 : image1, imag2 : image2, image3 : image3})
            .then((res) =>{
                console.log(res.data)
                alert('add new product succes')
                this.setState({openToggle : false})
                this.getDataAllProduct()
            })
            .catch((err) => {
                console.log(err)
            })

        }else{
            alert('inputan tidak boleh ada yang kosng')
        }

    }

    onMoveToDraft = (id) =>{

        Axios.get(apiUrl + 'product?id=' + id)
        .then((res) => {
            var data = res.data[0]
            // console.log(data)
            Axios.post(apiUrl + 'draft', data)
            .then((res) =>{
                // console.log(res.data)
                Axios.delete(apiUrl + 'product/' + id)
                .then((res) => {
                    // console.log(res)
                    alert('Move to Draft Succes')
                    window.location = '/draft-product'

                })
                .catch((err) => {
                    console.log(err)
                })
            })
            .catch((err) => {
                console.log(err)
            })
        })
        .catch((err) => {
            console.log(err)
        })
        
        
    }

    render() {
        return (
            <div className='py-5'>
                {/* Modal Tambah Product */}
                <Modal isOpen={this.state.openToggle} >
                    <ModalHeader >
                        Add New Product Here
                        <FontAwesomeIcon icon={faTimes} onClick={() => this.setState({openToggle : !this.state.openToggle})}/>
                    </ModalHeader>
                    <ModalBody>
                        <form >
                            <input type="text" ref='name' placeholder='Product Name' className='form-control mb-2'/>
                            <input type="text" ref='category' placeholder='Product Category' className='form-control mb-2'/>
                            <input type="text" ref='brand' placeholder='Product Brand' className='form-control mb-2'/>
                            <input type="text" ref='price' placeholder='Product Price' className='form-control mb-2'/>
                            <input type="text" ref='qty' placeholder='Product Qty' className='form-control mb-2'/>
                            <input type="text" ref='discount' placeholder='Product Discount' className='form-control mb-2'/>
                            <input type="text" ref='image1' placeholder='Link Image 1' className='form-control mb-2'/>
                            <input type="text" ref='image2' placeholder='Link Image 2' className='form-control mb-2'/>
                            <input type="text" ref='image3' placeholder='Link Image 3' className='form-control mb-2'/>    
                        </form>
                        <input type="button" value="Submit" className='btn btn-warning mt-3' onClick={this.onSubmitBtn}/>
                    </ModalBody>
                </Modal>

                <div className="container mt-3">
                    <h3 className='text-center mb-5'>Product Management</h3>
                        <FontAwesomeIcon icon={faPlus} size='2x' className='sporteens-clickable-el' onClick={() => this.setState({openToggle : !this.state.openToggle})}/>
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

export default ManagementProduct;