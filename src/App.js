import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImagelinkForm';
import Rank from './components/Rank/Rank';
import Logo from './components/Logo/Logo';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';


const particlesSettings = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        area: 800
      }
    }
  },
  interactivity: {
      events:
      {
        onhover: {
          enable: true,
          mode: 'repulse'
        }
      }
  }
}

const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: new Date()
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  };

  loadUser= (data) => {
    this.setState({user: {
      'id': data.id,
      'name': data.name,
      'email': data.email,
      'entries': data.entries,
      'joined': data.joined
    }});
  }

  calculateFaceLocation = (data) => {
    const { top_row, left_col, bottom_row, right_col } = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const { width, height } = image;
    return {
      leftCol: left_col * width,
      topRow: top_row * height,
      rightCol: width - right_col * width,
      bottomRow: height - bottom_row * height
    }
  }

  displayBoundingBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onUrlSubmit = () => {
    this.setState({ imageURL: this.state.input });
    
    fetch('https://facefind-api.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res) {
        fetch('https://facefind-api.herokuapp.com/image', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(res => res.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count }))
        })
        .catch(err => res.json('Could not fetch'));
      }
      this.displayBoundingBox(this.calculateFaceLocation(res));
    })
    .catch(err => {
      console.log(err);
    });
  }

  onRouteChange = (route) => {
    if (route === 'signout') 
    {
      this.setState(initialState)
    }
    else if (route === 'home')
    {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  render () {
    const { isSignedIn, imageURL, route, box } = this.state;
    return (
      <div className="App">
      <Particles 
          className='particles'
          params={ particlesSettings }
        />
      <link rel="stylesheet" href="https://unpkg.com/tachyons@4/css/tachyons.min.css"></link>
        <Navigation isSignedIn={ isSignedIn } onRouteChange={ this.onRouteChange } />
        { route === 'home' ? 
        <div>
          <Logo />
          <Rank name={ this.state.user.name } entries={ this.state.user.entries } />
          <ImageLinkForm onInputChange={ this.onInputChange } onSubmit={ this.onUrlSubmit } />
          <FaceRecognition imageURL= { imageURL } box = { box } />
        </div>
        : ( route === 'signin' ) ?
        <SignIn onRouteChange={ this.onRouteChange } loadUser= { this.loadUser } />
        :
        <Register onRouteChange={ this.onRouteChange } loadUser= { this.loadUser } />
        }
      </div>
    );
  }
}

export default App;
