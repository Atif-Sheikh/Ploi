import React, { Component } from 'react';
import { Platform, StatusBar, FlatList, View, Image, Dimensions, BackHandler, DeviceEventManager, Alert, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import {
    Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text,
    Item, Input, Label, Form, Tab, Tabs, TabHeading, Fab, Card, CardItem, Spinner, Badge
} from 'native-base';
// import { sendNewMessageNotification } from './notifications';
import { Drawer } from 'native-base';
import { Actions } from 'react-native-router-flux';
import SideBar from '../sidebar';
import Loader from "../loader";

const { height, width, fontScale } = Dimensions.get("window");


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

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
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this._handlePress)
    };

    render() {
        Platform.OS === 'android' && StatusBar.setBarStyle('light-content', true);
        Platform.OS === 'android' && StatusBar.setBackgroundColor('#62a6a6');

        return (
            <View style={{ height: height }}>
                <Drawer
                    type="displace" //:overlay:static
                    ref={(ref) => { this.drawer = ref; }}
                    panOpenMask={20}
                    content={<SideBar user={this.props.user} />}
                    onClose={() => this.closeDrawer()} >
                        <Header style={{ display: 'flex', backgroundColor: '#ef8626', flexDirection: 'row', alignItems: "center" }} hasTabs>
                            <View style={{ flex: 1 }}>
                                <Button onPress={this.openDrawer} transparent>
                                    <Icon style={{ fontSize: fontScale * 30, width: 30, color: '#fff' }} name="menu" />
                                </Button>
                            </View>
                            <View style={{ flex: 4 }}>
                                {/* <Item style={{ height: height / 13 }}>
                                    <Input returnKeyType='search' onChangeText={(text) => this._onSearch(text)}
                                        style={{ color: Styles.theme.headerTextColor, fontFamily: Styles.fonts.Normal }} placeholderTextColor={Styles.theme.headerTextColor}
                                        placeholder="Search"
                                    // onSubmitEditing={() => this._focusNextField('pass')}
                                    />
                                    <Icon size={Styles.fonts.small} style={{ color: Styles.theme.headerTextColor }} name='search' />
                                </Item> */}
                            </View>
                        </Header>
                        <View>
                            {/* <FlatList
                                data={this.state.filteredPost.length ? this.state.filteredPost : this.state.posts}
                                renderItem={({ item, index }) => <CardsItem Uid={this.props.user.Uid} pushKey={item.key} item={item} />}
                                keyExtractor={(item, key) => key.toString()}
                                onRefresh={() => this._onRefresh()}
                                refreshing={this.state.isFetching}
                                style={{ marginBottom: 20 }}
                                // ListFooterComponent={this.renderFooter}  
                            />
                                <Fab
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
