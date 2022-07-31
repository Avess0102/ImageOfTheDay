import React, { Component } from 'react';
import './Nav.css';
require('dotenv').config();

export class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imgData: [],
      mImg: '',
    }
  }

  async updateImg() {
    const url = `{process.env.REACT_APP_APIURL}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      imgData: parsedData.reverse(),
      mImg: parsedData[0],
    })
  }
  
  async componentDidMount() {
    this.updateImg();
  }

  render() {
    return (
      <>
      <div className='mainImg'>
        <div className="container p-5">
          <h1 className='text-light'>{this.state.mImg.title}</h1>
          <div className="row my-5">
            <div className="col-lg col-md-12 d-flex align-items-center">
              <img src={this.state.mImg.hdurl} className="rounded img-thumbnail p-1 " alt="" />
            </div>
            <div className="col-lg mt-5 d-flex align-items-center">
              <p className='text-info'>{this.state.mImg.explanation}</p>
            </div>
          </div>
          <h5 className='text-danger'> &copy; {this.state.mImg.copyright} </h5>
        </div>
      </div>

      <div className="eachImg">
        <br />
        <div className="container">
          <div className="row mt-5">
            {
              this.state.imgData.map((img) => {
                return (
                  <>
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-3 maina align-center"  onClick={this.mainImg = () => {this.setState({mImg: img})} } key={img.date}>
                      <div className="main">
                        <div className='img-container'>
                          <img src={img.hdurl} className="img d-flex align-items-center" alt={img.title}/>
                        </div>
                        <div className='row text'>
                            <h2 className='text-left'> {img.title} </h2>
                            <pre className='text-warning'>{img.date}</pre>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })
            }
          </div>
        </div>
      </div>
      </>
    )
  }
}

export default Navbar

