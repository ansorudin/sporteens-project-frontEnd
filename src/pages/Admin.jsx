import React, { Component } from 'react';
import Axios from 'axios';
import apiUrl from '../support/constant/apiUrl';
import Skeleton from 'react-loading-skeleton';

class Admin extends Component {

    state = {
        unpaid : 0,
        paid : 0,
        income : 0,
        pending : 0,
        productAktif : 0,
        draftProduct : 0,
        aktifUser : 0,
        pasifUser : 0
    }


    componentDidMount(){
        this.getDataTransactions()
        this.getDataProduct()
    }

    getDataTransactions = () => {
        Axios.get(apiUrl + 'transactions')
        .then((res) => {
            // console.log(res.data)
            // this.setState({dataHistTransactions : res.data})
            var data = res.data
            // console.log(data)
            var income = 0
            var pending = 0
            // var id_user = []

            var unpaid = data.filter((s) =>{
                return s.status === 'unpaid'
            })
            var paid = data.filter((s) => {
                return s.status === 'paid'
            })
            console.log(paid)

            unpaid.forEach((val) => {
                pending += val.totalPrice
            })
            paid.forEach((val) => {
                income += val.totalPrice
            })

            var id_user = data.map((val) => {
               return val.id_user
            })

            var aktif = []
            for(var i = 0 ; i < id_user.length ; i ++){
                if(aktif.includes(id_user[i])){

                }else{
                    aktif.push(id_user[i])
                }
            }
            this.getDataUser()
            return this.setState({income : income, paid : paid.length, pending : pending, unpaid : unpaid.length, aktifUser : aktif.length})
            
        })
        .catch((err) => {
            console.log(err)
        })
    }

    getDataProduct = () => {
        Axios.get(apiUrl + 'product')
        .then((res) => {
            // console.log(res.data)
            this.setState({productAktif : res.data.length})
        })
        .catch((err) => {
            console.log(err)
        })

        Axios.get(apiUrl + 'draft')
        .then((res) => {
            this.setState({draftProduct : res.data.length})
        })
        .catch((err) => {
            console.log(err)
        })
    }
    getDataUser = () => {
        Axios.get(apiUrl + 'user')
        .then((res) =>{
            this.setState({pasifUser : res.data.length - this.state.aktifUser})
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    
    
    render() {
        return (
            <div className='py-5'>
                <div className="container">
                <h1 className='text-center'>Statistic Page</h1>
                <p className='text-center'>Only Role = Admin can view this page</p>
                    <div className="row mt-5">
                        <div className="col-3 py-3">
                            <div className="border p-4 rounded">
                                <h5 className='text-center'>Transactions</h5>
                                <div>
                                    <h6 className='m-0 p-0'>Succes</h6>
                                    <p>{this.state.paid && this.state.paid} Transactions</p>
                                </div>
                                <div className='mt-3'>
                                    <h6 className='m-0 p-0'>Pending</h6>
                                    <p>{this.state.unpaid && this.state.unpaid} Transactions</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 py-3">
                            <div className="border p-4 rounded">
                                <h5 className='text-center'>Users</h5>
                                <div>
                                    <h6 className='m-0 p-0'>Active User</h6>
                                    <p>{this.state.aktifUser && this.state.aktifUser} Users</p>
                                </div>
                                <div className='mt-3'>
                                    <h6 className='m-0 p-0'>Pasif Users</h6>
                                    <p>{this.state.pasifUser && this.state.pasifUser} Users</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 py-3">
                            <div className="border p-4 rounded">
                                <h5 className='text-center'>Total Product</h5>
                                <div>
                                    <h6 className='m-0 p-0'>Active</h6>
                                    <p>{this.state.productAktif && this.state.productAktif} Product</p>
                                </div>
                                <div className='mt-3'>
                                    <h6 className='m-0 p-0'>Draft</h6>
                                    <p>{this.state.draftProduct && this.state.draftProduct} products</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 py-3">
                            <div className="border p-4 rounded">
                                <h5 className='text-center'>Total Income</h5>
                                <div>
                                    <h6 className='m-0 p-0'>Succes</h6>
                                    <p>Rp. {this.state.income && (this.state.income).toLocaleString('id-ID')}</p>
                                </div>
                                <div className='mt-3'>
                                    <h6 className='m-0 p-0'>Pending</h6>
                                    <p>Rp. {this.state.pending && (this.state.pending).toLocaleString('id-ID')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin;