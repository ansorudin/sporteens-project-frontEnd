import React, { Component } from 'react';
import {Modal} from 'react-bootstrap'

import { Link } from 'react-router-dom';


class ModalLogin extends Component {
    state ={
        showLogin : false,
    }
    handleModal = () =>{
        this.setState({showLogin: !this.state.showLogin})
    }

    render() {
        return (
            <div>
                <span className='sporteens-clickable-el' onClick={() => this.handleModal()} style={{marginLeft : this.props.margin, fontWeight : this.props.tebal}}>{this.props.title}</span>
                <Modal show={this.state.showLogin} onHide={() => this.handleModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container p-3">
                        <form>
                            <div className="form-group px-4">
                                <label>Username : </label>
                                <input type="text" placeholder='Enter your email or phone' className='form-control'/>
                            </div>
                            <div className="form-group px-4">
                                <label>Password : </label>
                                <input type="password" placeholder='Enter your password' className='form-control'/>
                            </div>
                            <div className="form-group px-4">
                                <input type="button" value="Submit" className='btn tombol-dark'/>
                            </div>
                        </form>
                            <p className='p-0 m-0 mt-5 text-center'>Not have account ? Register <Link to='/register' className='my-link' onClick={() => this.handleModal()}><span className='font-weight-bold'>here</span></Link></p>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default ModalLogin;