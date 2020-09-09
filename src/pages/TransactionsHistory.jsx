import React, { Component } from 'react';
import Axios from 'axios';
import apiUrl from '../support/constant/apiUrl';
import { Link } from 'react-router-dom';
import moment from 'moment';

class TransactionsHistory extends Component {

    state={
        data : null
    }

    componentDidMount(){
        this.getDataTransactions()
    }

    getDataTransactions = () =>{
        // ambil id si user
        var id = localStorage.getItem('id')
        if(id) {
            Axios.get(apiUrl + 'transactions?id_user=' + id)
            .then((res) => {
                console.log(res)
                this.setState({data : res.data})

            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    


    render() {
        return (
            <div>
                <div className="container py-5 text-center">
                    <h2>Transactions History</h2>
                </div>
                <div className="row mt-5 justify-content-center px-2">
                    <div className="col-md-8 rounded shadow">
                        <table className='table my-5'>
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Total Item</th>
                                    <th scope="col">Total Price</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data ?
                                this.state.data.map((val,index) => {
                                    return(
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{moment(val.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                            <td>{val.detail.length}</td>
                                            <td>Rp. {val.totalPrice.toLocaleString('id-ID')}</td>
                                            <td>{val.status}</td>
                                            <td>{val.status === 'paid' ? <input type="button" value="see detail" className='btn btn-info'/> : <Link className='my-link' to={'/checkout/' + val.id}><input type="button" value="pay now" className='btn btn-info'/></Link>  } </td>
                                        </tr>
                                    )
                                })
                                :
                                null
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default TransactionsHistory;