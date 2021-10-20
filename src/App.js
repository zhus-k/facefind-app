import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImagelinkForm';
import Rank from './components/Rank/Rank';
import Logo from './components/Logo/Logo';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import HistoryBar from './components/HistoryBar/HistoryBar';
import './App.css';

// const url = 'https://facefind-api.herokuapp.com';
const url = 'http://localhost:3000';

const particlesSettings = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageURL: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    requests: 0,
    joined: new Date()
  },
  history: []
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  };

  loadUser = data => {
    this.setState({
      user: {
        'id': data.id,
        'name': data.name,
        'email': data.email,
        'requests': data.requests,
        'joined': data.joined
      }
    });
  }

  loadHistory = data => {
    this.setState({ history: data });
  }

  calculateFacesLocations = data => {
    return data.outputs[0].data.regions.map(face => {
      const faceData = face.region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const { width, height } = image;
      return {
        id: faceData.left_col + faceData.top_row + faceData.right_col + faceData.bottom_row,
        leftCol: faceData.left_col * width,
        topRow: faceData.top_row * height,
        rightCol: width - faceData.right_col * width,
        bottomRow: height - faceData.bottom_row * height
      }
    });
  }

  displayFacesBoundingBoxes = boxes => {
    this.setState({ boxes: boxes });
  }

  onInputChange = event => {
    this.setState({ input: event.target.value });
  }

  onUrlSubmit = () => {
    this.setState({ imageURL: this.state.input });

    fetch(`${url}/imageurl`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res) {
          fetch(`${url}/image`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id,
              url: this.state.input
            })
          })
            .then(res => res.json())
            .then(data => {
              this.setState(Object.assign(this.state.user, { requests: data.requests }))
              // this.loadHistory(data.history);
            })
            .catch(err => res.json('Could not fetch'));
        }
        this.displayFacesBoundingBoxes(this.calculateFacesLocations(res));
      })
      .catch(err => console.log(err));
  }

  onRouteChange = route => {
    if (route === 'signout') {
      this.setState(initialState)
    }
    else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }

  render() {
    const { isSignedIn, imageURL, route, boxes, history } = this.state;
    return (
      <div className="App">
        <Particles
          className='particles'
          params={particlesSettings}
        />
        <link rel="stylesheet" href="https://unpkg.com/tachyons@4/css/tachyons.min.css" />
        <div className='topbar isBlurred'>
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        </div>
        {route === 'home' ?
          <div>
            <Logo />
            <Rank name={this.state.user.name} requests={this.state.user.requests} />
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onUrlSubmit} />
            <FaceRecognition imageURL={imageURL} boxes={boxes} />
            {/* <HistoryBar history={ history } /> */}
          </div>
          : (route === 'signin') ?
            <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} loadHistory={this.loadHistory} />
            :
            <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        }
      </div>
    );
  }
}

export default App;
