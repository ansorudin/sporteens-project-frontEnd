import React, { Component } from 'react';
import Logo1 from './../support/images/logo1.png'
import Logo2 from './../support/images/logo2.png'
import Axios from 'axios';
import apiUrl from '../support/constant/apiUrl';
import { Link } from 'react-router-dom';
import MyCarousel from '../component/MyCarousel';




class LandingPage extends Component {

    state={
        data : null
    }

    componentDidMount(){
        this.getAllProducts()
    }

    getAllProducts = () => {
        Axios.get(apiUrl + 'product')
        .then((res) => {
            console.log(res.data)
            this.setState({data : res.data})
        })
        .catch((err) => {
            alert(err.message)
        })
    }

    renderDataToJsx = () => {
        return this.state.data.map((val) => {
            if(val.discount){
                return(
                    <div className="col-md-2 sporteens-clickable-el h-100">
                        <div>
                            <Link to={'/detail-product/' + val.id}>
                            {/* Image */}
                            <div className='py-2'>
                                <img src={val.image1} className='align-self-center img-fluid sporteens-thumbnail-img img-thumbnail' alt='gambar gagal'/>
                            </div>
                            
                            {/* Detail price etc */}
                            <div className="mt-3 d-flex flex-column">
                                <p className='p-0 m-0 sporteens-main-dark sporteens-font-14'>{val.name.length >= 30 ? val.name.slice(0,30) + '...' : val.name}</p>

                                <div className='d-flex mt-1 mb-1'>
                                    <p className='p-0 m-0 text-secondary sporteens-font-12'> <s>Rp. {val.price.toLocaleString('id-ID')}</s> </p>
                                    <p className='p-0 m-0 text-danger sporteens-font-12 ml-1'>(-{val.discount}%)</p>
                                </div>
                              
                                <p className='p-0 m-0 sporteens-main-dark sporteens-font-12 font-weight-bold'>Rp. {(val.price-(val.price * (val.discount/100))).toLocaleString('id-ID')} </p>
                            </div>
                            </Link>
                        </div>
                    </div>
                )
            }else{
                return(
                    null
                )
            }
        })
        
    }



    render() {
        return (
            <div >
                {/* MyCarousel Section*/}
                <MyCarousel/>
                {/* End of MyCarousel Section */}


                {/* Flash Sale Section */}
                <div className="py-5 px-3 ">
                    <div className="container mt-4  ">
                        <h3 className='p-0 m-0 sporteens-text-ditengah-line'>
                            <span className="sporteens-text-ditengah-text">GRAB IT NOW</span>
                        </h3>
                        
                        <div  className="container-fluid mt-5  h-100 ">
                            <div className="row flex-nowrap " style={{overflow:'auto'}}>
                                
                                {/* card image flash sale */}

                                {
                                   this.state.data !== null ?
                                    this.renderDataToJsx()
                                    
                                   : null
                               }

                                {/* End card image flash sale */}

                            </div>
                        </div>
                    </div>
                </div>
                {/* End Flash Sale Section */}

                {/* Bestseller Section */}
                <div className="py-5 px-3 sporteens-bg-light-dark">
                    <div className="container mt-3">
                        <h3 className='p-0 m-0 sporteens-text-ditengah-line'>
                            <span className="sporteens-text-ditengah-text">RECOMENDED FOR YOU</span>
                        </h3>

                        <div  className="container-fluid mt-5">
                            <div className="row py-3 flex-nowrap " style={{overflow:'auto'}}>
                                
                                {/* card image Bestseller */}

                                <div className="col-md-2 sporteens-clickable-el">
                                    <div>
                                        <Link to={'/detail-product/'}>
                                        {/* Image */}
                                        <div className='sporteens-thumbnail-border d-flex justify-content-center'>
                                            <img src='https://thumblr.uniid.it/product/207022/d2202e15c4bc.jpg' className='align-self-center img-fluid sporteens-thumbnail-img' alt='gambar gagal'/>
                                        </div>
                                        
                                        {/* Detail price etc */}
                                        <div className="mt-3 d-flex flex-column">
                                            <p className='p-0 m-0 sporteens-main-dark sporteens-font-14'>ini nama</p>

                                            <div className='d-flex mt-1 mb-1'>
                                                <p className='p-0 m-0 text-secondary sporteens-font-12'> <s>Rp. 1200000</s> </p>
                                                <p className='p-0 m-0 text-danger sporteens-font-12 ml-1'>(-10%)</p>
                                            </div>
                                        
                                            <p className='p-0 m-0 sporteens-main-dark sporteens-font-12 font-weight-bold'>Rp. 1829828 </p>
                                        </div>
                                        </Link>
                                    </div>
                                </div>
                                {/* End card Bestseller */}

                            </div>
                        </div>
                    </div>
                </div>

                {/* Brands Section */}
                <div className="py-5 px-3">
                    <div className="container mt-4">
                    <h3 className='p-0 m-0'>Brands</h3> 
                         <p>We sell Official Products from various Brands</p>
                         <div className="row mt-4  align-items-center">
                             <div className="col-4 col-md-2   h-100">
                                 <img className='mx-2' alt='brand-logo' src={Logo1} width='100%'/>
                             </div>
                             <div className="col-4 col-md-2  h-100">
                                 <img className='mx-2 ' alt='brand-logo' src={Logo2} width='100%'/>
                             </div>
                             <div className="col-4 col-md-2   h-100">
                                 <img className='mx-2' alt='brand-logo' src={Logo1} width='100%'/>
                             </div>
                             <div className="col-4 col-md-2  h-100">
                                 <img className='mx-2 ' alt='brand-logo' src={Logo2} width='100%'/>
                             </div>
                             <div className="col-4 col-md-2   h-100">
                                 <img className='mx-2' alt='brand-logo' src={Logo1} width='100%'/>
                             </div>
                             <div className="col-4 col-md-2  h-100">
                                 <img className='mx-2 ' alt='brand-logo' src={Logo2} width='100%'/>
                             </div>
                         </div>
                    </div>
                </div>

                {/* Banner Section Email Subscription */}
                <div className="py-5 px-3">
                    <div className="container mt-4 sporteens-bg-banner p-5 rounded">
                        <h3 className='text-white text-center'>
                            Subscribe to our newsletter !!
                        </h3>
                        <p className='text-white text-center'>
                            Get interested offer from us
                        </p>
                        <div className="text-center">
                            <input type="button" value="Subscribe Now!!" className='btn btn-primary'/>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="py-5 px-3">
                     <div className="container border-top p-4">

                         <div className="row">
                             <div className="col-md-3">
                                 <p className='sporteens-main-dark font-weight-bold p-0 m-0'> SITEMAP </p>
                                 <p className='text-secondary font-weight-light sporteens-font-14 p-0 m-0 mt-3'> Products </p>
                                 <p className='text-secondary font-weight-light sporteens-font-14 p-0 m-0'> Brands </p>
                                 <p className='text-secondary font-weight-light sporteens-font-14 p-0 m-0'> Careeers </p>
                                 <p className='text-secondary font-weight-light sporteens-font-14 p-0 m-0'> Privacy & Policy </p>
                             </div>

                             <div className="col-md-3">
                                 <p className='sporteens-main-dark font-weight-bold p-0 m-0'> OUR STORE </p>
                                 <p className='text-secondary font-weight-light sporteens-font-14 p-0 m-0 mt-3'> Trunojoyo Street, Bandung, West Java, Postal Code 54312 </p>
                                 <p className='text-secondary font-weight-light sporteens-font-14 p-0 m-0 mt-2'> Green Office Park, Ground Floor, Serpong, Banten, Postal Code 54348 </p>

                             </div>

                             <div className="col-md-3">
                                 <p className='sporteens-main-dark font-weight-bold p-0 m-0'> CONTACT US </p>
                                 <p className='text-secondary font-weight-light sporteens-font-14 p-0 m-0 mt-3'>+62 836 7465 745</p>
                                 <p className='text-secondary font-weight-light sporteens-font-14 p-0 m-0'>+62 945 8453 123</p>
                                 <p className='text-secondary font-weight-light sporteens-font-14 p-0 m-0'>admin@sporteens.com</p>

                             </div>

                             <div className="col-md-3">
                                 <p className='sporteens-main-dark font-weight-bold p-0 m-0'> FIND US </p>
                                 <p className='text-secondary font-weight-light sporteens-font-14 p-0 m-0 mt-3'>Instagram</p>
                                 <p className='text-secondary font-weight-light sporteens-font-14 p-0 m-0'>Youtube</p>
                                 <p className='text-secondary font-weight-light sporteens-font-14 p-0 m-0'>Tokopedia</p>
                                 <p className='text-secondary font-weight-light sporteens-font-14 p-0 m-0'>Shopee</p>
                                 <p className='text-secondary font-weight-light sporteens-font-14 p-0 m-0'>Amazon</p>

                             </div>
                         </div>

                         <div className='text-center mt-4 sporteens-font-14'>
                             © 2009 - 2020, PT. Sporteens Indonesia.
                         </div>

                     </div>

                 </div>


            </div>
        );
    }
}

export default LandingPage;