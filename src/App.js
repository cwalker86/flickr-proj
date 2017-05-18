/* App that communicates with the flicker API to get images with a given keyword.
    Renders an image slideshow with the images returned. */

import React, { Component } from 'react';
import {
  FormGroup,
  InputGroup,
  FormControl,
  Glyphicon,
  Grid,
  Row,
  Col,
  Button,
  HelpBlock
} from 'react-bootstrap';
import './App.css';
import logo from './flickr.svg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      keyProvided: false,
      validState: null,
      displayHelp: false,
      ajax: false
    }
  }

  handleKeyInput(e) {
    this.setState({
      key: e.target.value
    })
  }


  handleKeySubmit(e) {
    e.preventDefault();
    console.log('Inside handleKey');
    const { key } = this.state;
    if ( key.length >= 32) {
      this.setState({
        validState: "success",
        displayHelp: false,
        keyProvided: true
      })
    } else {
      this.setState({
        validState: null,
        displayHelp: true,
      })
    }
  }

  handleSearchInput(e) {
    this.setState({
      term: e.target.value
    })
  }

  handleSearchSubmit(e) {
    e.preventDefault();
    const { key } = this.state;
    // const secret = '2751377373213030'
    let keyword = e.target.value;
    // https://www.flickr.com/services/api/flickr.photos.search.html
    // https://www.flickr.com/services/api/misc.urls.html
    const endpoint = `https://api.flickr.com/services/rest/?api_key=${key}&method=flickr.photos.search&format=json&nojsoncallback=1&&per_page=50&page=1&text=${keyword}`;
    this.setState({
      ajax: true
    });
    fetch(endpoint)
          .then((response) => {
               return response.status === 200 ? response.json() : response;
           })
           .then((response) => {
                  console.log(response);
                   this.setState({
                     ajax: false,
                     data: response
                   });
          })
           .catch((error) => {
               console.log(error);
           });
    }

  render() {
    const { keyProvided, validState, displayHelp, data } = this.state;

    return(
      <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Flickr Image Search</h2>
      </div>
      <Grid>
        <Col
          style={{
            marginTop: 20
          }}
          xs={12} sm={12} md={12} lg={12}>
          <Row>
          <form>
            <FormGroup
              validationState={validState}>
              <InputGroup>
                <FormControl
                type="text"
                placeholder="Enter API key here"
                onChange={this.handleKeyInput.bind(this)}
                ref="keyInput"
                />
                <InputGroup.Button>
                  <Button
                   onClick={this.handleKeySubmit.bind(this)}>
                    <Glyphicon glyph="lock" />
                  </Button>
                </InputGroup.Button>
              </InputGroup>
              {displayHelp ? <HelpBlock>API Key Doesn't Seem Long Enough</HelpBlock> : null }
            </FormGroup>
          </form>
          </Row>
          <Row>
          <form>
            <FormGroup>
              <InputGroup>
                <FormControl
                type="text"
                placeholder="Search..."
                onChange={this.handleSearchInput.bind(this)}
                disabled={!keyProvided}
                />
                <InputGroup.Button>
                <Button
                disabled={!keyProvided}
                 onClick={this.handleSearchSubmit.bind(this)}>
                  <Glyphicon glyph="search" />
                </Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </form>
          </Row>
          {
            data ?
            <Carousel>
            {this.renderCarousel(data).bind(this)}
              <Carousel.Item>
                <img width={900} height={500} alt="900x500" src="/assets/carousel.png"/>
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img width={900} height={500} alt="900x500" src="/assets/carousel.png"/>
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img width={900} height={500} alt="900x500" src="/assets/carousel.png"/>
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
            :
            null
          }
       </Col>
      </Grid>
      </div>
    );
  }
}

export default App;
