import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, StatusBar, Button, Keyboard, BackHandler, Dimensions, Platform } from 'react-native';
import { Content, Input, Item, Thumbnail } from 'native-base';
import axios from 'axios';
import { Actions } from 'react-native-router-flux'; // New code
import AsyncStorage from '@react-native-community/async-storage';
import { Loader } from '../loader';

const { height, width, fontScale } = Dimensions.get("window");

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmationPass: '',
            loading: false,
            err: null
        };
    };

    static navigationOptions = {
        header: null
    };

    renderFunc = () => {
        const { loading } = this.state;
        if (loading) {
            return <Loader />
        } else {
            return <TouchableOpacity style={styles.signinBtn} onPress={this.signup}><Text style={{ color: '#fff', fontSize: fontScale * 16 }}>SIGN UP</Text></TouchableOpacity>
        };
    };

    signup = () => {
        const { name, email, password, confirmationPass } = this.state;
        if (email && password && name && confirmationPass) {
            if (password !== confirmationPass) {
                this.setState({ err: 'Password not matched' });
                return;
            }
            this.setState({ loading: true });
            const user = {
                name,
                email,
                password,
                password_confirmation: confirmationPass
            };
            this.signupUsers(user);
            Keyboard.dismiss();

        } else {
            this.setState({ err: 'Please enter all fields!' });
        }
    };

    signupUsers = async (user) => {
        console.log(user, "userrrrrrr");
        try {
            let resp = await axios.post('https://ploi.io/api/register', JSON.stringify(user), {
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });
            this.setState({ loading: false });
            if(resp.status === 200){
                const { data: { success } } = resp;
                await AsyncStorage.setItem('token', JSON.stringify(success));
                Actions.home();
            }
            console.log(resp, "Successs");
        } catch (err) {
            console.log(err, "errr");
            this.setState({ err: 'Signup failed', loading: false });
        }
    };

    _focusNextField = (nextField) => {
        this.refs[nextField]._root.focus();
    };

    render() {
        const { err } = this.state;
        const title = '';
        Platform.OS === 'android' && StatusBar.setBarStyle('light-content', true);
        Platform.OS === 'android' && StatusBar.setBackgroundColor('#62a6a6');
        return (
            <View style={styles.container}>
                <View>
                    <View style={{ textAlign: "center", padding: 5, width: 70, height: 20, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                        <Text style={{ fontSize: fontScale * 28, color: '#000', fontWeight: '500' }}>Ploi</Text>
                        <Text style={{ color: '#62a6a6', fontSize: fontScale * 28, fontWeight: '500' }}>.io</Text>
                    </View>
                    <Text style={{ textAlign: "center", padding: 10, marginBottom: 20 }}>
                        Signup
                    </Text>

                    <Item style={styles.item} regular>
                        <Input textContentType='name'
                            returnKeyType='next'
                            placeholder='Name'
                            placeholderTextColor="black"
                            onChangeText={name => this.setState({ name, err: null })} style={styles.input}
                            onSubmitEditing={() => this._focusNextField('email')}
                        />
                    </Item>

                    <Item style={styles.item} regular>
                        <Input textContentType='emailAddress'
                            returnKeyType='next'
                            placeholder='E-mail'
                            placeholderTextColor="black"
                            onChangeText={email => this.setState({ email, err: null })} style={styles.input}
                            onSubmitEditing={() => this._focusNextField('pass')}
                            ref='email'
                        />
                    </Item>

                    <Item style={styles.item} regular>
                        <Input placeholder='Password'
                            returnKeyType='next'
                            placeholderTextColor="black"
                            onChangeText={password => this.setState({ password, err: null })}
                            style={styles.input} secureTextEntry={true}
                            onSubmitEditing={() => this._focusNextField('confirm')}
                            ref="pass"
                        />
                    </Item>

                    <Item style={styles.item} regular>
                        <Input placeholder='Confirm Password'
                            returnKeyType='done'
                            placeholderTextColor="black"
                            onChangeText={confirmationPass => this.setState({ confirmationPass, err: null })}
                            style={styles.input} secureTextEntry={true}
                            ref="confirm"
                        />
                    </Item>

                    <Text style={{ color: 'red', textAlign: 'center', paddingBottom: 10 }}>{err}</Text>
                    <View style={styles.btn}>
                        {this.renderFunc()}
                    </View>
                    <TouchableOpacity onPress={() => Actions.login()}>
                        <Text style={{ alignSelf: 'center', paddingVertical: 5, color: '#000' }}>
                            Already have an Account?
                                </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingBottom: 60
    },
    input: {
        height: height / 14,
        color: 'black'
    },
    item: {
        width: width / 1.3,
        marginBottom: height / 25,
        borderColor: '#62a6a6',
        borderWidth: 1,
        borderRadius: 5,
    },
    signinBtn: {
        height: "80%",
        width: "100%",
        backgroundColor: '#ef8626',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    btn: {
        width: width / 1.3,
        height: height / 12,
        alignSelf: 'center',
        borderRadius: 5
    },
});

export default Signup;