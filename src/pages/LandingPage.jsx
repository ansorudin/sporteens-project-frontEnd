import React, { Component } from 'react';
import {Carousel} from 'react-bootstrap'



class LandingPage extends Component {
    render() {
        return (
            <div >
                <Carousel>
                    <Carousel.Item interval={1000}>
                    <div className="sporteens-jumbotron">
                        <div className="h-100 sporteens-carousel-1" >
                            <div className="container h-100">
                                <div className="row align-items-center h-100 justify-content-center justify-content-md-start">
                                    <div className="col-6 jumbotron-text">
                                        <h1 className='sporteens-light'>Lorem ipsum dolor, sit amet consectetur adipisicing elit!.</h1>
                                        <button className='btn btn-outline-light mt-4 tombol'>Shop Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </Carousel.Item>
                <Carousel.Item interval={500}>
                <div className="sporteens-jumbotron">
                        <div className="h-100 sporteens-carousel-2" >
                            <div className="container h-100">
                                <div className="row align-items-center h-100">
                                    <div className="col-6 jumbotron-text">
                                        <h1 className='sporteens-light'>Lorem ipsum dolor, sit amet consectetur adipisicing elit!.</h1>
                                        <button className='btn btn-outline-light mt-4 tombol'>Shop Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                <div className="sporteens-jumbotron">
                        <div className="h-100 sporteens-carousel-3" >
                            <div className="container h-100">
                                <div className="row align-items-center h-100">
                                    <div className="col-6 jumbotron-text">
                                        <h1 className='sporteens-light'>Lorem ipsum dolor, sit amet consectetur adipisicing elit!.</h1>
                                        <button className='btn btn-outline-light mt-4 tombol'>Shop Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
                </Carousel>
                

            </div>
        );
    }
}

export default LandingPage;