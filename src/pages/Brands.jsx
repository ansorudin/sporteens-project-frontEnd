import React, { Component } from 'react';
import Skeleton from 'react-loading-skeleton';

class Brands extends Component {
    state ={
        aku : null
    }
    render() {
        return (
            <div>
                <h1>{this.state.aku ? 'aku' : <Skeleton />}</h1>
                {/* {this.props.body || <Skeleton count={10} />} */}
             </div>
        );
    }
}

export default Brands;