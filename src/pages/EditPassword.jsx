import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import apiUrl from '../support/constant/apiUrl';
import phoneNumberValidator from '../support/function/phoneNumberValidator';
import emailValidator from '../support/function/emailValidator';

class EditPassword extends Component {
    state ={
        eyePass : true,
        data : null,
        errorMessage : ''
     
    }


    validateEmailOrPhone = () =>{
        var value = this.refs.emailOrPhone.value

        if(value){
            if(Number(value[0]) >= 0){
                if(phoneNumberValidator(value) === true) {
                    // alert('berhasil')

                    // Jalankan fungsi send data to api dengan value(phone : diisi value phone, email : kosong, password : value password)
                    this.sendDataToApi({phone : value, email : ""})
                }else{
                    this.setState({errorMessage : phoneNumberValidator(value), isError : true})
                    
                    // munculin error message phone 
                }
            }else{
                if(emailValidator(value) === true){

                    // Jalankan fungsi send data to api dengan value(phone : diisi value phone, email : kosong, password : value password)
                    this.sendDataToApi({email : value, phone : ""})
                   
                }else{
                    // munculin error message email
                    this.setState({errorMessage : 'Email format wrong', isError : true})
                }
            }
            // jika value or pass tidak ada pasing error message
        }else{
            value ? this.setState({errorMessage : ''}) : this.setState({errorMessage : 'Email atau Phone tidak boleh kosong', isError : true})
        }
    }

    sendDataToApi = (data) =>{
        var dataType = data.phone ? 'phone' : 'email'
        var dataValue = data.phone ? data.phone : data.email
        Axios.get(apiUrl + 'user?' + dataType + '=' + dataValue)
        .then((res) =>{
            console.log(res.data)
            if(res.data.length !== 0){
                this.setState({data : res.data})
            }else{
                this.setState({errorMessage : 'Email atau Phone tidak terdaftar!'})
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    updatePassword = () => {
        var pass = this.refs.pass.value
        var confirmPass = this.refs.confirmPass.value
        var id = this.state.data[0].id
        
        if(pass === confirmPass){
            Axios.patch(apiUrl + 'user/' + id, {password : pass})
            .then((res) => {
                alert('update password berhasil')
                window.location = '/'
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    render() {
        return (
            <div>
                <div className="container mt-5">
                    <div className="row justify-content-center ">
                        <div className="col-6  text-center">
                            <h5>Edit your password</h5>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                    <div className='w-100 mt-4 col-6'>
                        <form className='row justify-content-center'>
                            <div className='col-8 form-group'>
                                <input type="text" ref='emailOrPhone' placeholder="Enter your email or phone" className=' form-control'/>
                            </div>
                            {
                                this.state.data ? 
                                <div className='col-8 form-group d-flex'>
                                    <input type={this.state.eyePass ? 'password' : 'text'} ref='pass' placeholder="Enter new password" className=' form-control'/>
                                    <span><FontAwesomeIcon className='ml-2 h-100 ' color='black' onClick= {() => this.setState({eyePass: !this.state.eyePass})} icon={faEye}/></span>
                                </div>
                                : null
                            }
                            {
                                this.state.data ?  
                                <div className='col-8 form-group d-flex'>
                                    <input type={this.state.eyePass ? 'password' : 'text'} ref='confirmPass' placeholder="Confrim new password" className=' form-control'/>
                                    <span><FontAwesomeIcon className='ml-2 h-100 ' color='black' onClick= {() => this.setState({eyePass: !this.state.eyePass})} icon={faEye}/></span>
                                </div>
                                :null
                            }
                            <span className='sporteens-font-12 text-danger col-8 text-center'>{this.state.errorMessage}</span>

                            {
                                this.state.data ?
                            <div className='col-8 form-group mt-3'>
                                <input onClick={this.updatePassword} type='button' className="btn btn-warning btn-block p-0 py-1 px-3 sporteens-font-14" value='Edit Password'></input>
                            </div>
                            :
                            <div className='col-8 form-group mt-3'>
                                <input onClick={this.validateEmailOrPhone} type='button' className="btn btn-warning btn-block p-0 py-1 px-3 sporteens-font-14" value='Submit'></input>
                            </div>
                            }
                        </form>
                        
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditPassword;