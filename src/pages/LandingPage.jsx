import React, { Component } from 'react';
import Logo1 from './../support/images/logo1.png'
import Logo2 from './../support/images/logo2.png'
import Axios from 'axios';
import apiUrl from '../support/constant/apiUrl';
import { Link } from 'react-router-dom';
import MyCarousel from '../component/MyCarousel';
import Skeleton from 'react-loading-skeleton'




class LandingPage extends Component {

    state={
        data : null,
        bestSellerData : null
    }

    componentDidMount(){
        this.getAllProducts()
    }

    getAllProducts = () => {
        Axios.get(apiUrl + 'product')
        .then((res) => {
            // console.log(res.data)
            this.setState({data : res.data})
            this.renderDataBestSeller()
        })
        .catch((err) => {
            alert(err.message)
        })

        
        
    }


    renderDataBestSeller = () => {
        Axios.get(apiUrl + 'transactions')
        .then((res) => {
            var sold = []

            // loping 2 kali buat dapetin detailnya
            res.data.forEach((val) => {
                val.detail.forEach((prod) => {
                    // isAda true ketika nama ada dua atau lebi
                    var isAda = false
                    // indexAda adalah index yg namnya ada dua atau lebih
                    var indexAda = null

                    // lopping di sold yg belum ada ==> jika prod.product_name sudah ada di sold
                    // yang artinya prod_name tersebut duplicate maka qty nya yg ditambahin bukan di push si prodnya
                    for(var i = 0 ; i < sold.length ; i ++){
                        if(sold[i].product_name === prod.product_name){
                            isAda = true
                            indexAda = i
                        }
                    }
                    if(isAda){
                        sold[indexAda].qty += prod.qty
                    }else{
                        sold.push(prod)
                    }
                })
                sold.sort((a,b) => {
                    return b.qty - a.qty
                })
            })
            sold = sold.slice(0,4)
            sold.forEach((val, index) => {
              this.state.data.forEach((data) => {
                  if(val.product_name === data.name){
                      sold[index]['poduct_id'] = data.id
                      sold[index]['product_discount'] = data.discount
                  }
              })
            })
            // console.log(sold)
            this.setState({bestSellerData : sold})
        })
        .catch((err) => {
            console.log(err)
        })
        
    }



    renderDataToJsx = () => {
        return this.state.data.map((val) => {
            if(val.discount){
                return(
                    <div className="col-4 col-md-2 sporteens-clickable-el h-100" key={val.id}>
                        <div>
                            <Link to={'/detail-product/' + val.id} className='my-link'>
                            {/* Image */}
                            <div className='py-2'>
                                <img  src={val.image1} className='align-self-center img-fluid sporteens-thumbnail-img img-thumbnail' alt='gambar gagal'/>
                            </div>
                            
                            {/* Detail price etc */}
                            <div className="mt-md-3 mt-1 d-flex flex-column">
                                <p className='p-0 m-0 sporteens-main-dark image-font-flash-sale-title'>{val.name.length >= 30 ? val.name.slice(0,30) + '...' : val.name}</p>

                                <div className='d-flex mt-1 mb-1'>
                                    <p className='p-0 m-0 text-secondary image-font-flash-sale-isi'> <s>Rp. {val.price.toLocaleString('id-ID')}</s> </p>
                                    <p className='p-0 m-0 text-danger ml-1 image-font-flash-sale-isi'>(-{val.discount}%)</p>
                                </div>
                              
                                <p className='p-0 m-0 sporteens-main-dark font-weight-bold image-font-flash-sale-isi'>Rp. {(val.price-(val.price * (val.discount/100))).toLocaleString('id-ID')} </p>
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

    bestSellerSection = () => {
        return this.state.bestSellerData.map((val,index) => {
            return(
                <div className="col-4 col-md-3 sporteens-clickable-el h-100" key={index}>
                <div>
                    <Link to={'/detail-product/' + val.product_id} className='my-link'>
                    {/* Image */}
                    <div className='py-2'>
                        <img src={val.product_image} className='align-self-center img-fluid sporteens-thumbnail-img img-thumbnail' alt='gambar gagal'/>
                    </div>
                    
                    {/* Detail price etc */}
                    <div className="mt-md-3 mt-1 d-flex flex-column">
                        <p className='p-0 m-0 sporteens-main-dark image-font-flash-sale-title'>{val.product_name.length >= 30 ? val.product_name.slice(0,30) + '...' : val.product_name}</p>


                        {
                            val.product_discount ? 
                            <span>
                                <div className='d-flex mt-1 mb-1'>
                                    <p className='p-0 m-0 text-secondary image-font-flash-sale-isi'> <s>Rp. {val.product_price.toLocaleString('id-ID')}</s> </p>
                                    <p className='p-0 m-0 text-danger ml-1 image-font-flash-sale-isi'>(-{val.product_discount}%)</p>
                                </div>
                              
                                <p className='p-0 m-0 sporteens-main-dark font-weight-bold image-font-flash-sale-isi'>Rp. {(val.product_price-(val.product_price * (val.product_discount/100))).toLocaleString('id-ID')} </p>
                            </span>
                            :
                            <p className='p-0 m-0 sporteens-main-dark font-weight-bold image-font-flash-sale-isi'>Rp. {val.product_price.toLocaleString('id-ID')} </p>

                        }
                    </div>
                    </Link>
                </div>
            </div>
            )
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
                        <h3 className='p-0 m-0 sporteens-text-ditengah-line my-landing-page-font'>
                            <span className="sporteens-text-ditengah-text ">GRAB IT NOW</span>
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
                    <div className="container mt-4">
                        <h3 className='p-0 m-0 sporteens-text-ditengah-line'>
                            <span className="sporteens-text-ditengah-text my-landing-page-font">RECOMENDED FOR YOU</span>
                        </h3>
                        <div  className="container-fluid mt-5  h-100 ">
                            <div className="row  " >
                                
                                {/* card image flash sale */}

                                {
                                   this.state.bestSellerData !== null ?
                                    this.bestSellerSection()
                                   : null
                               }

                                {/* End card image flash sale */}

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