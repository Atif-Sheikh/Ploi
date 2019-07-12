import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, StatusBar, Button, Keyboard, BackHandler, TouchableHighlight, Dimensions, Platform } from 'react-native';
import { Content, Input, Item, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux'; // New code
import { Loader } from '../loader';

const { height, width, fontScale } = Dimensions.get("window");

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmationPass: ''
            // loading: false,
        };
    };
    componentWillMount() {
        // if (this.props.from && this.props.from === "signup") {
        //     console.log("coming from signup")
        // }
        // else {
        //     this.props.checkUser();
        // }
        // BackHandler.addEventListener("hardwareBackPress", this._handlePress)
        // console.warn(moment(new Date()).format("YYYY-MM-DD"));
        // BackHandler.addEventListener('hardwareBackPress', () => {
        //     BackHandler.exitApp();
        // });
    };
    
    // _onPressOkay = () => {
    //     BackHandler.exitApp();
    // };

    // _handlePress = () => {
    //     if (Actions.currentScene === "login") {
    //         Alert.alert(
    //             'Exit App',
    //             'Exiting the application?',
    //             [
    //                 { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
    //                 { text: 'OK', onPress: () => { this._onPressOkay() } },
    //             ],
    //             { cancelable: true }
    //         )
    //     } else {
    //         Actions.pop();
    //     }
    //     return true;
    // };
    
    static navigationOptions = {
        header: null
    };
    
    renderFunc = () => {
        const { loader } = this.state;
        if (loader) {
            return <Loader />
        } else {
            return <TouchableOpacity style={styles.signinBtn} onPress={this.login}><Text style={{ color: '#fff', fontSize: fontScale * 16 }}>SIGN UP</Text></TouchableOpacity>
        };
    };

    login = () => {
        const { email, password } = this.state;
        // Actions.home();
        if (email, password) {
            // this.setState({loading: true});
            const user = {
                email: this.state.email.trim(),
                password: this.state.password.trim(),
            };
            // this.props.signin(user);
            Keyboard.dismiss();

        } else {
            Alert.alert(null, 'Please enter all fields!');
        }
    };

    _focusNextField = (nextField) => {
        this.refs[nextField]._root.focus();
    };

    render() {
        const { loader } = this.state;
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
                            <View style={{ textAlign: "center", padding: 5, width: 70, height: 20, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                                <Text style={{ fontSize: fontScale * 28, color: '#000', fontWeight: '500' }}>Ploi</Text>
                                <Text style={{ color: '#62a6a6', fontSize: fontScale * 28, fontWeight: '500' }}>.io</Text>
                            </View>
                            <Text style={{ textAlign: "center", padding: 10, marginBottom: 20 }}>
                                Signup
                            </Text>
                            
                            <Item style={styles.item} regular>
                                <Input textContentType='text'
                                    returnKeyType='next'
                                    placeholder='Name'
                                    placeholderTextColor="black"
                                    onChangeText={name => this.setState({ name })} style={styles.input}
                                    onSubmitEditing={() => this._focusNextField('email')}
                                />
                            </Item>
                            
                            <Item style={styles.item} regular>
                                <Input textContentType='email'
                                    returnKeyType='next'
                                    placeholder='E-mail'
                                    placeholderTextColor="black"
                                    onChangeText={email => this.setState({ email })} style={styles.input}
                                    onSubmitEditing={() => this._focusNextField('pass')}
                                    ref='email'
                                />
                            </Item>

                            <Item style={styles.item} regular>
                                <Input placeholder='Password'
                                    placeholderTextColor="black"
                                    onChangeText={password => this.setState({ password })}
                                    style={styles.input} secureTextEntry={true}
                                    onSubmitEditing={() => this._focusNextField('confirm')}
                                    ref="pass"
                                />
                            </Item>

                            <Item style={styles.item} regular>
                                <Input placeholder='Confirm Password'
                                    placeholderTextColor="black"
                                    onChangeText={confirmationPass => this.setState({ confirmationPass })}
                                    style={styles.input} secureTextEntry={true}
                                    ref="confirm"
                                />
                            </Item>

                            <Text style={{ color: 'red' }}>{this.props.error}</Text>
                            <View style={styles.btn}>
                                {this.renderFunc()}
                            </View>
                            <TouchableOpacity onPress={() => Actions.login()}>
                                <Text style={{ alignSelf: 'center', paddingVertical: 5, color: '#000' }}>
                                    Already have an Account?
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