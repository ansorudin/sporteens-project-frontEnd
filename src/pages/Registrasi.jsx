import React, { Component } from 'react';
import ModalLogin from '../component/ModalLogin';
import phoneNumberValidator from '../support/function/phoneNumberValidator'
import emailValidator from '../support/function/emailValidator';
import Axios from 'axios'
import apiUrl from '../support/constant/apiUrl';



class Registrasi extends Component {

    state = {
        errorMessage : ''
    }

    onSubmitBtnClick = () => {
        // get value from input
        var value = this.refs.emailOrPhone.value

        if(Number(value[0]) >= 0){
            if(phoneNumberValidator(value) === true) {
                alert('berhasil')
                // kirim ke api
                this.sendDataToApi({phone : value, email : ""})
            }else{
                this.setState({errorMessage : phoneNumberValidator(value)})
                // munculin error message
            }
        }else{
            if(emailValidator(value) === true){
                alert('berhasil')
                this.sendDataToApi({email : value, phone : ""})
                // kirim ke API
            }else{
                this.setState({errorMessage : 'Email format wrong'})
            }
        }
    }

    sendDataToApi = (data) => {
        var dataToSend = data
        dataToSend.password = ''

        var dataType = data.phone ? 'phone' : 'email'
        var dataValue = data.phone ? data.phone : data.email

        Axios.get(apiUrl + 'user?' + dataType + '=' + dataValue)
        .then((res) =>{
            if(res.data.length === 0){
                Axios.post(apiUrl + 'user' , dataToSend)
                .then((res) =>{
                    console.log(res)
                    alert('register succes')
                    window.location = '/create-password/' + res.data.id
                    // simpan data user (id) ke local storage (val, datanya)
                    localStorage.setItem('id', res.data.id)
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
            <div className='border container-fluid p-0'>
                {/* banner side */}
                <div className="row w-100">
                    <div className="col-8 d-none d-md-block">
                        <div className="sporteens-register-bg sporteens-register"></div>
                    </div>

                    {/* form */}
                    <div className="col-12 col-md-4">
                        <div className="sporteens-register">
                            <div className="d-flex flex-column h-100 align-items-center justify-content-center">
                                {
                                this.state.errorMessage ? 
                                    <div className='alert alert-danger'>{this.state.errorMessage}</div>
                                    :null
                                }
                                <div><h3>Daftar Disini</h3></div>
                                <div className='w-100 mt-4'>
                                    <form className='row justify-content-center'>
                                        <div className='col-8 form-group'>
                                            <input type="text" ref='emailOrPhone' placeholder="Silahkan Masukan Email / Phone Number" className='form-control'/>
                                        </div>
                                        <div className='col-8 form-group'>
                                            <input onClick={this.onSubmitBtnClick} type='button' className="btn tombol-dark btn-block" value='Submit'></input>
                                        </div>
                                    </form>
                                </div>
                                <div className='mt-4 '>
                                    <h3>ATAU
                                    </h3>
                                    </div>
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
        )
    }
}

export default Registrasi;