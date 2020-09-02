import React, { Component } from 'react';
import {Modal} from 'react-bootstrap'

import { Link } from 'react-router-dom';
import phoneNumberValidator from '../support/function/phoneNumberValidator';
import emailValidator from '../support/function/emailValidator';
import Axios from 'axios';
import apiUrl from '../support/constant/apiUrl';


class ModalLogin extends Component {
    state ={
        showLogin : false,
    }
    handleModal = () =>{
        this.setState({showLogin: !this.state.showLogin})
    }
    onSubmitBtnClick = () => {
        // get value from input
        var value = this.refs.userName.value
        var pass = this.refs.pass.value

        if(Number(value[0]) >= 0){
            if(phoneNumberValidator(value) === true) {
                alert('berhasil')
                
                // kirim ke api
                this.sendDataToApi({phone : value, email : "", password : pass})
            }else{
                this.setState({errorMessage : phoneNumberValidator(value)})
                // munculin error message
            }
        }else{
            if(emailValidator(value) === true){
                alert('berhasil')
                this.sendDataToApi({email : value, phone : "", password : pass})
                // kirim ke API
            }else{
                this.setState({errorMessage : 'Email format wrong'})
            }
        }
    }

    sendDataToApi = (data) =>{
        var dataType = data.phone ? 'phone' : 'email'
        var dataValue = data.phone ? data.phone : data.email

        Axios.get(apiUrl + 'user?' + dataType + '=' + dataValue)
        .then((res) =>{
            if(res.data.length !== 0){
                if(data.password === res.data[0].password){
                    localStorage.setItem('id', res.data[0].id)
                    window.location = '/'
                }else{
                    alert('Password salah')
                }
            }else{
                alert('Akun anda belum terdaftar')
            }
        })
        .catch((err) =>{
            console.log(err.Message)
        })
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
                                <input type="text" placeholder='Enter your email or phone' className='form-control' ref='userName'/>
                            </div>
                            <div className="form-group px-4">
                                <label>Password : </label>
                                <input type="password" placeholder='Enter your password' className='form-control' ref='pass'/>
                            </div>
                            <div className="form-group px-4">
                                <input type="button" value="Submit" className='btn tombol-dark' onClick={this.onSubmitBtnClick}/>
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