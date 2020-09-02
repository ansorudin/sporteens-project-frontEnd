import React, { Component } from 'react';
import Axios from 'axios'
import apiUrl from '../support/constant/apiUrl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'


class CreatePassword extends Component {
    state = {
        eyePassword : true,
        eyePassConfirm : true
    }
    onSubmitBtnClick = () => {
        // get value from inputs user
        let pass = this.refs.pass.value
        let passconfirm = this.refs.passconfirm.value

        if(pass && passconfirm){
            // ngmabil id di addres bar
            var id = this.props.location.pathname.split('/')[2]
            
            // check inputs 1 and 2 must same
            if(pass === passconfirm){
                Axios.patch(apiUrl + 'user/' + id, {password : pass})
                .then((res) => {
                    alert('create password succes')
                    console.log(res)
                    window.location = '/'
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }
    }
    render() {
        return (
            <div className="py-5 px-3">
                <h1 className='text-center'>Create Your Password in Here !!</h1>
                <div className="row justify-content-center mt-5">
                    <div className="col-md-4 p-5 sporteens-bg-main-dark rounded sporteens-shadow">
                        <div className="border bg-white d-flex px-2">
                            <input style={{flex:'1', border : 'none'}} type={this.state.eyePassword ? 'password' : 'text'} ref='pass' className='form-control' placeholder='enter password'/>
                            <span><FontAwesomeIcon className='h-100' color='gray' onClick= {() => this.setState({eyePassword : !this.state.eyePassword})} icon={faEye}/></span>
                        </div>
                        <div className="border bg-white d-flex px-2">
                            <input style={{flex:'1', border : 'none'}} type={this.state.eyePassConfirm ? 'password' : 'text'} ref='passconfirm' className='form-control' placeholder='confirm password'/>
                            <span><FontAwesomeIcon className='h-100' color='gray' onClick= {() => this.setState({eyePassConfirm : !this.state.eyePassConfirm})} icon={faEye}/></span>
                        </div>
                        <input type="button" onClick={this.onSubmitBtnClick} value='Submit' className='btn btn-light w-100 mt-5'/>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreatePassword;