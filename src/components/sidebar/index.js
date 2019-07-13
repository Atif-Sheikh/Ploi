import React, { Component } from 'react';
import { Text, Platform, StyleSheet, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Content, Button, List, ListItem, Left, Body, Right, Thumbnail, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Styles, screenHeight, screenWidth } from "../config";
import { Loader } from "../loader";

class Sidebar extends Component {
    constructor() {
        super();
        this.state = {

        };
    };

    logout = () => {
        // this.props.logout();
        Actions.login();
    };

    render() {
        //require('../images/face.jpg')
        return (
            <View style={{ backgroundColor: Styles.theme.normalColor, height: screenHeight, justifyContent: "space-between" }}>
                <View style={{ height: "20%", backgroundColor: Styles.theme.backgroundColor, justifyContent: "center", alignItems: "center", paddingTop: 10 }}>
                    <Thumbnail style={{ borderWidth: 2, borderColor: '#0b4d8c', }} source={require('../images/face.jpg')} />
                    <Text style={{ fontSize: Styles.fonts.h1, color: Styles.theme.normalColor, fontFamily: Styles.fonts.BoldItalic }}>{userName && userName}</Text>
                </View>
                <View style={{ height: "60%" }}>
                    <ListItem onPress={() => Actions.profile()} avatar style={{ margin: 12 }}>
                        <Icon style={{ color: Styles.theme.themeColor }} name='person' />
                        <Text style={{ marginLeft: '11%', fontSize: Styles.fonts.h3, fontFamily: Styles.fonts.Bold, color: Styles.theme.themeColor }}>My Profile</Text>
                    </ListItem>
                    <ListItem avatar style={{ margin: 12 }}>
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
                    </ListItem>
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
        fontSize: Styles.fonts.regular,
        marginLeft: "11%"
    },
    logoutBtn: {
        backgroundColor: '#62a6a6',
        height: "10%",
        width: '100%',
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20
    },
    btnText: {
        fontFamily: Styles.fonts.BoldItalic,
        fontSize: Styles.fonts.h1,
        color: '#fff'
    }
});

export default Sidebar;