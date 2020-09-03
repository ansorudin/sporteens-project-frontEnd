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
        errorMessage : '',
        errorMessagePass : ''
    }
    handleModal = () =>{
        this.setState({showLogin: !this.state.showLogin})
    }
    onSubmitBtnClick = () => {
        // get value from input
        var value = this.refs.userName.value
        var pass = this.refs.pass.value

        // jika value or pass ada
        if(value && pass){
            
            if(Number(value[0]) >= 0){
                if(phoneNumberValidator(value) === true) {
                    // alert('berhasil')

                    // Jalankan fungsi send data to api dengan value(phone : diisi value phone, email : kosong, password : value password)
                    this.sendDataToApi({phone : value, email : "", password : pass})
                }else{
                    this.setState({errorMessage : phoneNumberValidator(value)})
                    // munculin error message phone 
                }
            }else{
                if(emailValidator(value) === true){

                    // Jalankan fungsi send data to api dengan value(phone : diisi value phone, email : kosong, password : value password)
                    this.sendDataToApi({email : value, phone : "", password : pass})
                   
                }else{
                    // munculin error message email
                    this.setState({errorMessage : 'Email format wrong'})
                }
            }
            // jika value or pass tidak ada pasing error message
        }else{
            value ? this.setState({errorMessage : ''}) : this.setState({errorMessage : 'Email atau Phone tidak boleh kosong'})
            pass ? this.setState({errorMessagePass : ''}) : this.setState({errorMessagePass : 'Password tidak boleh kosong'})
        }
    }

    sendDataToApi = (data) =>{

        var dataType = data.phone ? 'phone' : 'email'
        var dataValue = data.phone ? data.phone : data.email

        Axios.get(apiUrl + 'user?' + dataType + '=' + dataValue )
        .then((res) =>{
            // jika inputan user ada di database
            if(res.data.length !== 0){
                // jika password di res.data sama password di inputan user sama ubah id di localstorage
                if(data.password === res.data[0].password){
                    localStorage.setItem('id', res.data[0].id)
                    window.location = '/'
                }else{
                // jika tidak sama munculin pesan errornya
                    this.setState({errorMessagePass : 'Password salah'})
                }
            // jika tidak ada
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
            <span>
                <span className={this.props.className} onClick={() => this.handleModal()} >{this.props.isi}</span>
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
                                <span className='sporteens-font-14 text-danger'>{this.state.errorMessage}</span>
                                
                            </div>
                            <div className="form-group px-4">
                                <label>Password : </label>
                                <input type="password" placeholder='Enter your password' className='form-control' ref='pass'/>
                                <span className='sporteens-font-14 text-danger'>{this.state.errorMessagePass}</span>
                            </div>
                            <div className="form-group px-4">
                                <input type="button" value="Submit" className='btn tombol-dark' onClick={this.onSubmitBtnClick}/>
                            </div>
                        </form>
                            <p className='p-0 m-0 mt-5 text-center'>Not have account ? Register <Link to='/register' className='my-link' onClick={() => this.handleModal()}><span className='font-weight-bold'>here</span></Link></p>
                        </div>
                    </Modal.Body>
                </Modal>
            </span>
        );
    }
}

export default ModalLogin;