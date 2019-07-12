import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Login from "./components/login";
import Signup from './components/signup';
import Home from './components/home';

export default class Routes extends Component {
    // backAndroidHandler={() => {}}
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene
                        key='login'
                        component={Login}
                        initial

                    />
                    <Scene
                        key='signup'
                        component={Signup}

                    />
                    <Scene
                        key='home'
                        component={Home}

                    />
                </Scene>
            </Router>
        );
    };
};