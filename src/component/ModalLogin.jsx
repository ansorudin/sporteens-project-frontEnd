import React, { Component } from 'react';
import {Modal} from 'react-bootstrap'
import FormLogin from './FormLogin';


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
                        <div className="container">
                             <FormLogin />
                            <div className='text-center m-3'>
                                Belum punya akun ? <a href="/register">Registrasi sekarang.</a>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default ModalLogin;