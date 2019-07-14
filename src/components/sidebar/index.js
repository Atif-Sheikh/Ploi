import React, { Component } from 'react';
import { Text, Platform, StyleSheet, View, Image, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import { Content, Button, List, ListItem, Left, Body, Right, Thumbnail, Icon } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';

const { height, width, fontScale } = Dimensions.get("window");

import { Loader } from "../loader";

class Sidebar extends Component {
    constructor() {
        super();
        this.state = {

        };
    };

    logout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            Actions.login();
            return true;
          }
          catch(exception) {
            return false;
          }
    };

    render() {
        
        Platform.OS === 'android' && StatusBar.setBarStyle('light-content', true);
        Platform.OS === 'android' && StatusBar.setBackgroundColor('#62a6a6');

        return (
            <View style={{  height: height, justifyContent: "space-between" }}>
                <View style={{ height: "20%", backgroundColor: '#62a6a6', justifyContent: "center", alignItems: "center", paddingTop: 10 }}>
                    <Thumbnail style={{ borderWidth: 2, borderColor: '#0b4d8c', }} source={require('../../images/face.jpg')} />
                    {/* <Text style={{ fontSize: 16 }}>{name}</Text> */}
                </View>
                <View style={{ height: "60%" }}>
                    <ListItem avatar style={{ margin: 12 }}>
                        <Icon name='person' />
                        <Text style={{ marginLeft: '11%', color: '#000' }}>My Profile</Text>
                    </ListItem>
                    {/* <ListItem avatar style={{ margin: 12 }}>
                        <Icon style={{ color: 'grey' }} name='paper' />
                        <Text style={styles.menuTextStyle}>Exam syllabus</Text>
                    </ListItem>
                    <ListItem avatar style={{ margin: 12 }}>
                        <Icon style={{ color: 'grey' }} name='print' />
                        <Text style={styles.menuTextStyle}>Materials</Text>
                    </ListItem>
                    <ListItem avatar style={{ margin: 12 }}>
                        <Icon style={{ color: 'grey' }} name='color-filter' />
                        <Text style={styles.menuTextStyle}>Lessons</Text>
                    </ListItem> */}
                </View>
                <TouchableOpacity onPress={this.logout} style={styles.logoutBtn}>
                    <Text style={styles.btnText}>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    text: {
        color: "white"
    },
    menuTextStyle: {
        color: '#000',
        marginLeft: "11%"
    },
    logoutBtn: {
        backgroundColor: '#ef8626',
        height: "10%",
        width: '100%',
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20
    },
    btnText: {
        color: '#fff'
    }
});

export default Sidebar;