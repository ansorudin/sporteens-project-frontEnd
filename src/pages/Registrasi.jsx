import React, { Component } from 'react';
import {Form} from 'react-bootstrap'
import ModalLogin from '../component/ModalLogin';



class Registrasi extends Component {
    state ={
        validate : false
    }
    handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        this.setState({validate : true});
      };
    render() {
        return (
            <div>
                <div className='w-100 container-fluid'>
                    <div className="row sporteens-register">
                        <div className="col-8 ">
                            <div className="sporteens-register-bg h-100">

                            </div>
                        </div>
                        <div className="col-4 sporteens-register-form border w-auto">
                            <div className="container h-100 ">
                                <div className="d-flex flex-column h-100 align-items-center justify-content-center">
                                    <div><h3>Daftar Disini</h3></div>
                                    <div className='w-100 mt-4'>
                                        <Form className='row justify-content-center' noValidate validated={this.state.validate} onSubmit={this.handleSubmit}>
                                            <Form.Group controlId="formBasicEmail" className='col-8'>
                                                <Form.Control type="text" placeholder="Silahkan Masukan Email / Phone Number" required/>
                                                <Form.Control.Feedback type="invalid">
                                                    Email harus di isi!
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group className='col-8 '>
                                                <input type='submit' className="btn tombol-dark btn-block" value='Submit'></input>
                                            </Form.Group>
                                        </Form>
                                    </div>
                                    <div className='mt-4'><h3>Atau</h3></div>
                                    <div className='w-100 mt-4'>
                                        <div className='row justify-content-center'>
                                            <div className="col-8 text-center">
                                                <input type="button" value= "Daftar dengan Googel" className="btn tombol-dark px-5"/>
                                            </div>
                                            <div className='col-8 d-flex justify-content-center mt-5'>
                                                <span className=''>Sudah punya akun ? </span>
                                                <ModalLogin title='Masuk' margin='5px' tebal='600'/> 
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Registrasi;