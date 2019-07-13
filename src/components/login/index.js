import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, StatusBar, Button, Keyboard, BackHandler, AsyncStorage, Dimensions, Platform } from 'react-native';
import { Content, Input, Item, Thumbnail } from 'native-base';
import axios from 'axios';
import { Actions } from 'react-native-router-flux'; // New code
import { Loader } from '../loader';

const { height, width, fontScale } = Dimensions.get("window");

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            loading: false,
            error: null
        };
    };

    componentDidMount(){
        this.checkLogin()
    };

    checkLogin = async () => {
        let token = await JSON.parse(AsyncStorage.getItem('token'));
        if(token && token.length) {
            alert('Already Login');
        }
    };

    componentWillMount() {
        BackHandler.addEventListener("hardwareBackPress", this._handlePress);
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._handlePress);
    }
    
    _onPressOkay = () => {
        BackHandler.exitApp();
    };

    _handlePress = () => {
        Alert.alert(
            'Exit App',
            'Exiting the application?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => this._onPressOkay }
            ],
            { cancelable: true }
        );
        return true;
    };
    
    static navigationOptions = {
        header: null
    };
    
    renderFunc = () => {
        const { loading } = this.state;
        if (loading) {
            return <Loader color='#62a6a6' />
        } else {
            return <TouchableOpacity style={styles.signinBtn} onPress={this.login}><Text style={{ color: '#fff', fontSize: fontScale * 16 }}>SIGN IN</Text></TouchableOpacity>
        };
    };

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    login = () => {
        const { email, password } = this.state;

        if(!this.validateEmail(email)) {
            this.setState({ error: 'Please enter valid email address' });
            return;
        }
        if (email && password) {
            this.setState({ loading: true }, () => {
                const user = {
                    email: this.state.email.trim(),
                    password: this.state.password.trim(),
                };
                this.loginUser(user);
                Keyboard.dismiss();
            });
        } else {
            this.setState({ error: 'Please enter all fields!' });
        }
    };

    loginUser = async (data) => {
        try{
            let resp = await axios.post('https://ploi.io/api/login', JSON.stringify(data), {
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });
            if(resp.status === 200){
                const { data: { success: { token } } } = resp;
                await AsyncStorage.setItem('token', token);
                this.setState({ loading: false });
            }else {
                throw 'Error';
            }
        }catch(err) {
            console.log(err)
            this.setState({ loading: false, error: 'Wrong credentials' });
        }
    };

    _focusNextField = (nextField) => {
        this.refs[nextField]._root.focus();
    };

    render() {
        const { error } = this.state;
        const title = '';
        Platform.OS === 'android' && StatusBar.setBarStyle('light-content', true);
        Platform.OS === 'android' && StatusBar.setBackgroundColor('#62a6a6');
        return (
            <View style={styles.container}>
                {
                    this.props.checkLoader ?
                        <View style={{ justifyContent: 'center', position: 'absolute', width, height }}>
                            <Loader color="#058d94" />
                        </View> : <View>
                            <View style={{ textAlign: "center", padding: 5, width: 70, height: 30, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                                <Text style={{ fontSize: fontScale * 28, color: '#000', fontWeight: '500' }}>Ploi</Text>
                                <Text style={{ color: '#62a6a6', fontSize: fontScale * 28, fontWeight: '500' }}>.io</Text>
                            </View>
                            <Text style={{ textAlign: "center", marginBottom: 20 }}>
                                SIGN IN
                            </Text>
                            <Item style={styles.item} regular>
                                <Input textContentType='emailAddress'
                                    returnKeyType='next'
                                    placeholder='E-mail'
                                    placeholderTextColor="black"
                                    onChangeText={email => this.setState({ email, error: null })} style={styles.input}
                                    onSubmitEditing={() => this._focusNextField('pass')}
                                />
                            </Item>

                            <Item style={styles.item} regular>
                                <Input placeholder='Password'
                                    placeholderTextColor="black"
                                    onChangeText={password => this.setState({ password, error: null })}
                                    style={styles.input} secureTextEntry={true}
                                    ref="pass"
                                />
                            </Item>
                            <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>{ error }</Text>
                            <View style={styles.btn}>
                                {this.renderFunc()}
                            </View>
                            <TouchableOpacity onPress={() => Actions.signup()}>
                                <Text style={{ alignSelf: 'center', paddingVertical: 5, color: '#000' }}>
                                    Don't have an Account?
                            </Text>
                            </TouchableOpacity>
                        </View>
                }
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
        marginBottom: height / 20,
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

export default Login;