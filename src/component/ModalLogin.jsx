import React, { Component } from 'react';
import {Modal} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import phoneNumberValidator from '../support/function/phoneNumberValidator';
import emailValidator from '../support/function/emailValidator';
import Axios from 'axios';
import apiUrl from '../support/constant/apiUrl';



class ModalLogin extends Component {
    state ={
        showLogin : false,
        errorMessage : '',
        errorMessagePass : '',
        isError : false
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
                    this.setState({errorMessage : phoneNumberValidator(value), isError : true})
                    
                    // munculin error message phone 
                }
            }else{
                if(emailValidator(value) === true){

                    // Jalankan fungsi send data to api dengan value(phone : diisi value phone, email : kosong, password : value password)
                    this.sendDataToApi({email : value, phone : "", password : pass})
                   
                }else{
                    // munculin error message email
                    this.setState({errorMessage : 'Email format wrong', isError : true})
                }
            }
            // jika value or pass tidak ada pasing error message
        }else{
            value ? this.setState({errorMessage : ''}) : this.setState({errorMessage : 'Email atau Phone tidak boleh kosong', isError : true})
            pass ? this.setState({errorMessagePass : ''}) : this.setState({errorMessagePass : 'Password tidak boleh kosong', isError : true})
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
                    this.setState({errorMessagePass : 'Password salah', isError : true})
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
                    {/* <Modal.Header closeButton className='border-white'>
                        
                    </Modal.Header> */}
                    <Modal.Body closeButton>
                        <div className='text-right m-0 p-0'><FontAwesomeIcon icon={faTimes} className='sporteens-clickable-el' onClick={() => this.handleModal()} /></div>
                        <div className="container py-3">
                            <h5 className='text-center mb-3'>Login Here</h5>

                            <form>
                                <div className={this.state.isError ? "form-group px-4 sporteens-font-14 text-danger" : "form-group px-4 sporteens-font-14"}>
                                    <label>Username : </label>
                                    <input type="text" placeholder='Enter your email or phone' className={this.state.isError ? 'form-control sporteens-font-12 border-danger' : 'form-control sporteens-font-12'} ref='userName'/>
                                    <span className='sporteens-font-12 text-danger mt-1'>{this.state.errorMessage}</span>
                                    
                                </div>
                                <div className={this.state.isError ? "form-group px-4 sporteens-font-14 text-danger" : "form-group px-4 sporteens-font-14"}>
                                    <label>Password : </label>
                                    <input type="password" placeholder='Enter your password' className={this.state.isError ? 'form-control sporteens-font-12 border-danger' : 'form-control sporteens-font-12'} ref='pass'/>
                                    <span className='sporteens-font-12 text-danger mt-1'>{this.state.errorMessagePass}</span>
                                </div>
                                <div className="form-group px-4">
                                    <input type="button" value="Submit" className={this.state.isError ? 'btn btn-outline-danger sporteens-font-12' : 'btn tombol-dark sporteens-font-12'} onClick={this.onSubmitBtnClick}/>
                                </div>
                            </form>

                            <p className='p-0 m-0 mt-4 text-center sporteens-font-12'>Not have account ? Register <Link to='/register' className='my-link' onClick={() => this.handleModal()}><span className='font-weight-bold sporteens-font-12'>here</span></Link></p>
                        </div>
                    </Modal.Body>
                </Modal>
            </span>
        );
    }
}

export default ModalLogin;