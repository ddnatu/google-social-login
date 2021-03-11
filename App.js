/* global gapi */
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: false
    };
    //this.onSuccess = this.onSuccess.bind(this);
    //this.onLoginFailed = this.onLoginFailed.bind(this);
    this.getContent = this.getContent.bind(this);
  }

  componentDidMount() {
    const successCallback = this.onSuccess.bind(this);
    console.log("gapi", gapi);
    gapi.load("auth2", () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          "986127222914-f4hn19927op8a48kfbheu15v2boi4qim.apps.googleusercontent.com"
      });

      // this.auth2.attachClickHandler(document.querySelector('#loginButton'), {}, this.onLoginSuccessful.bind(this))

      this.auth2.then(test => {
        console.log("on init auth token", test);
        this.setState({
          isSignedIn: this.auth2.isSignedIn.get()
        });
      });
    });

    window.gapi.load("signin2", function() {
      // Method 3: render a sign in button
      // using this method will show Signed In if the user is already signed in
      var opts = {
        width: 200,
        height: 50,
        client_id: "YOUR_CLIENT_ID.apps.googleusercontent.com",
        onsuccess: successCallback
      };
      gapi.signin2.render("loginButton", opts);
    });
  }

  onSuccess() {
    console.log("on success");
    this.setState({
      isSignedIn: true,
      err: null
    });
  }

  onLoginFailed(err) {
    this.setState({
      isSignedIn: false,
      error: err
    });
  }

  getContent() {
    if (this.state.isSignedIn) {
      return <p>hello user, you're signed in </p>;
    } else {
      return (
        <div>
          <p>You are not signed in. Click here to sign in.</p>
          <button id="loginButton">Login with Google</button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          {/* <p>You are not signed in. Click here to sign in.</p>
          <button id="loginButton">Login with Google</button> */}
          {this.getContent()}
        </header>
      </div>
    );
  }
}

export default App;
