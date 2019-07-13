import React, { Component } from 'react';
import { Platform, StatusBar, FlatList, View, Image, Dimensions, BackHandler, DeviceEventManager, Alert, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import {
    List, Header, Title, Content, Button, Icon, Left, Right, Body, Text,
    ListItem
} from 'native-base';
import axios from 'axios';
import { Drawer } from 'native-base';
import { Actions } from 'react-native-router-flux';
import SideBar from '../sidebar';
import Loader from "../loader";
import AsyncStorage from '@react-native-community/async-storage';

const { height, width, fontScale } = Dimensions.get("window");


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            servers: []
        };
    };
    static navigationOptions = {
        header: null,
    };

    closeDrawer = () => {
        this.drawer._root.close()
    };
    
    openDrawer = () => {
        this.drawer._root.open()
    };

    getServerList = async () => {
        try{
            let token = await AsyncStorage.getItem('token');
            let parsed = JSON.parse(token);
            console.log(parsed, ">>>>>>>>>>>>>>>>>>>>")
            let resp = await axios.get('https://ploi.io/api/servers', {
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${parsed.token}`
                }
            });
            console.log(resp, ">>>>>>>>>>>>>>>>>> success")
            if(resp.status === 200){
                const { data: { data } } = resp;
                this.setState({ isFetching: false, servers: data });
            }else {
                throw 'Error';
            }
        }catch(err) {
            console.log(err)
            this.setState({ isFetching: false });
        }
    };
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._handlePress);
    };
    
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
    };

    _onRefresh = () =>  {
        this.setState({ isFetching: true }, () => this.getServerList());
    };

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this._handlePress);
        this.getServerList();
    };

    render() {
        const { isFetching, servers } = this.state;
        console.log(servers, ">>>>>>>>>>>>")
        Platform.OS === 'android' && StatusBar.setBarStyle('light-content', true);
        Platform.OS === 'android' && StatusBar.setBackgroundColor('#62a6a6');

        return (
            <View style={{ height: height }}>
                <Drawer
                    type="displace" //:overlay:static
                    ref={(ref) => { this.drawer = ref; }}
                    panOpenMask={20}
                    content={<SideBar />}
                    onClose={() => this.closeDrawer()} >
                        <Header style={{ display: 'flex', backgroundColor: '#62a6a6', flexDirection: 'row', alignItems: "center" }}>
                            <View style={{ flex: 1 }}>
                                <Button onPress={this.openDrawer} transparent>
                                    <Icon style={{ fontSize: fontScale * 30, width: 30, color: '#fff' }} name="menu" />
                                </Button>
                            </View>
                            <View style={{ textAlign: "center", flex: 4, paddingRight: width/8, height: 30, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                                <Text style={{ fontSize: fontScale * 28, color: '#000', fontWeight: '500' }}>Ploi</Text>
                                <Text style={{ color: '#fff', fontSize: fontScale * 28, fontWeight: '500' }}>.io</Text>
                            </View>
                        </Header>
                        <View>
                            <FlatList
                                data={servers}
                                renderItem={({ item, index }) => <List>
                                    <ListItem avatar>
                                        <Body>
                                            <Text>{item.name}</Text>
                                            <Text note>{item.ip_address}</Text>
                                        </Body>
                                        <Right>
                                            <Text note>{item.created_at}</Text>
                                        </Right>
                                        </ListItem>
                                    </List>
                                    }
                                keyExtractor={(item, key) => key.toString()}
                                onRefresh={() => this._onRefresh()}
                                refreshing={isFetching}
                                style={{ marginBottom: 20 }}
                                // ListFooterComponent={this.renderFooter}  
                            />
                                {/* <Fab
                                    onPress={() => Actions.login()}
                                    active={false}
                                    style={{ backgroundColor: Styles.theme.backgroundColor, position: "absolute", marginBottom: 20 }}
                                >
                                    <Icon name="add" />
                                </Fab> */}
                        </View>
                </Drawer>
            </View>
        );
    };
};

export default Home;
