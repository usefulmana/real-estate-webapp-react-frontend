import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default class Body extends Component {
    render() {
        return (
            <BodyWrapper>
                <h1 className="text-center">We’re reimagining how you buy and sell. It’s now easier <br />to get into a place you love. So let’s do this, together.</h1>
                <hr />
                <div className="row">
                    <div className="card-deck">
                        <div class="col-12 col-sm-6 col-lg-3 ml-auto">

                            <div className="card">
                                <img src="https://s.zillowstatic.com/homepage/static/Buy_a_home.png" className="card-img-top" alt="Buy a house" />
                                <div className="card-block">
                                    <h4 className="card-title text-center text-bold">Buy a Home</h4>
                                    <p className="card-text text-center">Find your place with an immersive photo experience and the most listings, including
                                things you won't find anywhere else.</p>
                                    <div className="text-center">
                                        <Link to='/'><button className="btn">Search Properties</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-lg-3 mr-auto">
                            <div className="card">
                                <img src="https://s.zillowstatic.com/homepage/static/Sell_a_home.png" className="card-img-top" alt="Sell a house" />
                                <div className="card-block ">
                                    <h4 className="card-title text-center text-bold">Sell a Home</h4>
                                    <p className="card-text text-center">Whether you sell a house, a condominium unit, or a project, we'll help you
                                navigate the path to a successful sale.</p>
                                    <div className="text-center">
                                        <Link to='/dashboard'>
                                            <button className="btn">Post Your Property</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BodyWrapper>
        )
    }
}

const BodyWrapper = styled.div`
.row{
    margin-bottom: 7rem;
}
.btn{
    border: 1px solid #F93838;
    color: #F93838
}
.btn:hover{
    color:white;
    background-color: #F93838;
}
button{
    margin-bottom: 1.5rem;
}
p{
    margin-left:2rem;
    margin-right: 2rem;
}
h4{
    margin-top:1rem;
    margin-bottom:1rem;
}
h1{
    margin-top: 420px;
}
hr{
    border:none;
    margin-top: 50px;
    margin-bottom: 50px;
    max-width: 10%;
    height:2px;
    background-color:#F93838
}
.card {

	background: #fff;
	box-shadow: 0 3px 10px rgba(0,0,0,0.1);
	
}
.card:hover{
    transform:scale(1.05)
}

`