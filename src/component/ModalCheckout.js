import React, { Component } from 'react';
import {Modal,ModalBody} from 'reactstrap';
import { Link } from 'react-router-dom';


class ModalCheckout extends Component {
    state={
        isOpen : false
    }

    
    handleModal = () =>{
        this.setState({isOpen : !this.state.isOpen})
    }
    render() {
            return (
                <div>
                    <span className={this.props.className} onClick={() => this.handleModal()} >{this.props.isi}</span>
                    <Modal isOpen={this.state.isOpen} centered>
                        <ModalBody>
                            <div className='border p-4'>
                                <h5 className='text-center mb-3 sporteens-font-18'>Thank you </h5>
                                <div className='d-flex'>
                                    <div className='w-25'>
                                        <img src={this.props.imageModal} className='image-in-carts img-thumbnail' alt='gambar gagal'/>
                                    </div>
                                    <div className='ml-4 w-75 d-flex flex-column justify-content-center'>
                                        <span className='text-secondary mb-2 sporteens-font-14'>vans</span>
                                        <h5 className='sporteens-font-14'>{this.props.nameModal}</h5>
                                        <p className='sporteens-font-14 font-weight-light'>Rp. {this.props.priceModal}</p>
                                    </div>
                                    {/* <div className='d-flex w-25 align-items-center'>
                                        <FontAwesomeIcon icon={faTimes}/>
                                        <h6 className='p-0 m-0 ml-5'>1</h6>
                                    </div> */}
                                </div>
                                <h5 className='text-center mb-2 mt-4 font-weight-light sporteens-font-16'>Has been added to your Cart!</h5>
                                <p className='text-center mt-3 sporteens-font-12'>Check your <Link to='/carts' className='my-link font-weight-bold'>cart</Link> or <Link to='/products' className='my-link font-weight-bold'>back shopping</Link></p>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            );
    }
}

export default ModalCheckout;