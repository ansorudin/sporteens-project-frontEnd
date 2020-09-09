import React, { Component } from 'react';
import ModalLogin from '../component/ModalLogin';
import phoneNumberValidator from '../support/function/phoneNumberValidator'
import emailValidator from '../support/function/emailValidator';
import Axios from 'axios'
import apiUrl from '../support/constant/apiUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';



class Registrasi extends Component {

    state = {
        errorMessage : '',
        eyePass : true
    }

    onSubmitBtnClick = () => {
        // get value from input
        var value = this.refs.emailOrPhone.value
        var pass = this.refs.pass.value
        var confirmPass = this.refs.confirmPass.value

        if(value && pass && confirmPass){
            if(Number(value[0]) >= 0){
                if(phoneNumberValidator(value) === true) {
                    if(pass === confirmPass){
                        // kirim ke api
                        this.sendDataToApi({phone : value, email : "", password : pass})
                    }else{
                        this.setState({errorMessage : 'Password tidak sama'})
                    }
                }else{
                    this.setState({errorMessage : phoneNumberValidator(value)})
                    // munculin error message
                }
            }else{
                if(emailValidator(value) === true){
                    if(pass === confirmPass){
                        this.sendDataToApi({email : value, phone : "", password : pass})
                        // kirim ke API
                    }else{
                        this.setState({errorMessage : 'Password tidak sama'})
                    }
                }else{
                    this.setState({errorMessage : 'Email format wrong'})
                }
            }
        }else{
            this.setState({errorMessage : 'Inputan tidak boleh kosong'})
        }
    }

    sendDataToApi = (data) => {
        var dataToSend = data
        dataToSend.role = 'user'
        

        var dataType = data.phone ? 'phone' : 'email'
        var dataValue = data.phone ? data.phone : data.email

        Axios.get(apiUrl + 'user?' + dataType + '=' + dataValue)
        .then((res) =>{
            if(res.data.length === 0){
                Axios.post(apiUrl + 'user' , dataToSend)
                .then((res) =>{
                    console.log(res)
                    alert('register succes')
                    // window.location = '/create-password/' + res.data.id
                    // simpan data user (id) ke local storage (val, datanya)
                    localStorage.setItem('id', res.data.id)
                    // localStorage.setItem('role', res.data.role)
                })
                .catch((err) =>{
                    this.setState({errorMessage : err.message })
                })

            }else{
                this.setState({errorMessage : dataType + ' already taken, try another !!!!'})
            }
        })
        .catch((err) => {
            this.setState({errorMessage : err.message})
        })
    }
    render() {
        return (
            <div className='container-fluid p-0'>
                {/* banner side */}
                <div className="row w-100">
                    <div className="col-8 d-none d-md-block">
                        <div className="sporteens-register-bg sporteens-register"></div>
                    </div>

                    {/* form */}
                    <div className="col-12 col-md-4">
                        <div className="sporteens-register d-flex align-items-center">
                            <div className="d-flex flex-column h-75 align-items-center justify-content-center">
                                
                                <div><h5>Create Account</h5></div>
                                <div className='w-100 mt-4'>
                                    <form className='row justify-content-center'>
                                        <div className='col-8 form-group'>
                                            <input type="text" ref='emailOrPhone' placeholder="Enter your email or phone" className=' form-control'/>
                                        </div>
                                        <div className='col-8 form-group d-flex'>
                                            <input type={this.state.eyePass ? 'password' : 'text'} ref='pass' placeholder="Enter your password" className=' form-control'/>
                                            <span><FontAwesomeIcon className='ml-2 h-100' color='black' onClick= {() => this.setState({eyePass: !this.state.eyePass})} icon={faEye}/></span>
                                        </div>
                                        <div className='col-8 form-group d-flex'>
                                            <input type={this.state.eyePass ? 'password' : 'text'} ref='confirmPass' placeholder="Confrim your password" className=' form-control'/>
                                            <span><FontAwesomeIcon className='ml-2 h-100' color='black' onClick= {() => this.setState({eyePass: !this.state.eyePass})} icon={faEye}/></span>
                                        </div>
                                        <span className='sporteens-font-12 text-danger col-8 text-center'>{this.state.errorMessage}</span>
                                        <div className='col-8 form-group mt-3'>
                                            <input onClick={this.onSubmitBtnClick} type='button' className="btn btn-warning btn-block p-0 py-1 px-3 sporteens-font-14" value='Submit'></input>
                                        </div>
                                    </form>
                                    <div className="row justify-content-center">
                                        <div className=''>
                                                <span className='sporteens-font-14'>Have account ? </span>
                                                <ModalLogin isi='sign in' className='sporteens-onhover sporteens-clickable-el sporteens-font-14'/> 
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-3 '>
                                    <h5>or</h5>
                                </div>
                                <div className='w-100 mt-3'>
                                    <div className='row justify-content-center'>
                                        <span className='sporteens-font-14'>Login with <span className='sporteens-onhover sporteens-clickable-el sporteens-font-14'>Google Account</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Registrasi;