import React, { Component } from 'react'
import styled from 'styled-components'
import Geocode from 'react-geocode'
import GoogleMapReact from 'google-map-react';
import MapContainer from './Map'
const AnyReactComponent = ({ text }) => (
    <div style={{
        color: 'white',
        background: '#f93838',
        padding: '15px 10px',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        transform: 'translate(-50%, -50%)'
    }}>
        {text}
    </div>
);
export default class PropertyDetailCard extends Component {
    state  = {
        center: {
            lat: 10.8231,
            lng: 106.6297
        },
        zoom: 11,
        lat:'',
        lng:''
    };

    componentDidMount() {
        this.location()
    }

    location(){
        Geocode.setApiKey("AIzaSyBH0q-zFXWvuk9a9qwV_XyRmIjv9fAa8_Y");
        Geocode.enableDebug();
        Geocode.fromAddress(`${this.props.property.address} ${this.props.property.city} ${this.props.property.province}`).then(
        response => {
            const { lat, lng } = response.results[0].geometry.location;
            this.setState({
                lat: lat,
                lng: lng
            }
            )
        
        },
        error => {
            console.log(error);
        }
        
    );
    }
    render() {
        console.log(this.state.center)
        console.log(this.state.lat, this.state.lng)
        var pricePerSquareMeter = Math.floor(this.props.property.price / this.props.property.area)
        
        return (
            <PropertyDetailCardWrapper>
                <div>
                    <div className="card">
                        <div className="card-body">
                            <div className='row top'>
                                <div>
                                    <p className="card-title ml-4 mt-1" style={{ fontSize: 25 }}>$ {' '}{this.props.property.price}</p>
                                </div>
                                <div className='ml-auto mr-2' style={{ fontSize: 15 }}>
                                    <div class="vl d-inline-block">  <p className="ml-3 text-center"><strong>{this.props.property.numOfBedrooms}</strong> <br /> Beds</p></div>
                                    <div class="vl d-inline-block">  <p className="ml-3 text-center"><strong>{this.props.property.numOfBathrooms}</strong> <br /> Bath</p></div>
                                    <div class="vl d-inline-block">  <p className="ml-3 text-center"><strong>{this.props.property.area}</strong> <br />sqm</p></div>
                                </div>
                            </div>
                            <hr />
                            <div className="row bottom">
                                <div className="col-1 mt-3 ml-2">
                                    <span class="fas fa-map-marker text-muted fa-fw" style={{ fontSize: 20 }}></span>
                                </div>
                                <div className="col-4  mt-1 address">

                                    <p>
                                        {this.props.property.address}{', '}{this.props.property.city}{', '}{this.props.property.province}</p>
                                </div>
                                <div className="col-7 text-right ml-4" >
                                    <p style={{ color: 'red ' }} > {this.props.property.title}</p>
                                    <p className='post'>Posted on: {this.props.property.postDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card mt-4'>
                    <div className="card-body">
                        <div className="text-left" style={{ fontSize: 30 }}><p>Further Details</p><hr /></div>
                        <div className="row" style={{ fontSize: 25 }}>
                            <div className="col-4 box">
                                <div className="boxed bg-light text-center">
                                    <i class="fas fa-home"></i>
                                    <p>Project</p>
                                    <p className='text-muted'>{!this.props.project? 'Not Available': this.props.project.name}</p>
                                    
                                </div></div>
                            <div className="col-4 box">
                                <div className="boxed bg-light text-center">
                                    <i class="far fa-compass"></i>
                                    <p>Direction</p>
                                    <p className='text-muted'>{!this.props.property.direction? 'Not Available': this.props.property.direction}</p>      
                                </div>
                            </div>
                            <div className="col-4 box">
                                <div className="boxed bg-light text-center">
                                    <i class="fas fa-ruler"></i>
                                    <p>Price/Sqm </p>
                                    <p className='text-muted'>${pricePerSquareMeter}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div style={{ height: '50vh', width: '100%' }}>
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key:'AIzaSyBH0q-zFXWvuk9a9qwV_XyRmIjv9fAa8_Y' }}
                                    defaultCenter={this.state.center}
                                    defaultZoom={this.state.zoom}
                                >
                                    <AnyReactComponent
                                        lat={this.state.lat}
                                        lng={this.state.lng}
                                        text="Here"
                                    />
                                </GoogleMapReact>
                            </div>
                        </div>
                        <div className="row">
                            <MapContainer/>
                        </div>
                    </div>
                </div>
            </PropertyDetailCardWrapper>
        )
    }
}

const PropertyDetailCardWrapper = styled.div`
.row .box{
    padding-left:3rem;
    padding-right: 3rem;
}
.text-muted{
    margin-top: -1rem;
    font-size: 18px;
}
.boxed {
  border: none ;
} 
.post{
    margin-top: -0.5rem;
}
.bottom{
    margin-bottom: -0.6rem;
}
.top{
    margin-top:-0.6rem;
    margin-bottom: -1rem;
}
.address{
    margin-left: -2rem;
}
.vl {
 margin-right:1rem;
  border-left: 1px solid #6C757D;
  height: 2.5rem;
}
`