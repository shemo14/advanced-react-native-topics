import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Font, Permissions } from 'expo';
import Logo from '../components/Logo';

const FONT_PATH = '../../assets/fonts/Montserrat-Bold.ttf';

class SplashScreen extends Component {
    
    constructor(props) {
        super(props);
        this.loadFontAsync();
        this.state = {
            fontLoaded: false
        };
    }

    async loadFontAsync() {
        try {
            await Font.loadAsync({ montserratBold: require(FONT_PATH) });
            this.setState({ fontLoaded: true });

            const { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
                console.log('Permission denied');
            }
        } catch (e) {
            console.log(e);
        }
    }

    startApp = async () => {
        const token = await AsyncStorage.getItem('fb_token');
        if (token) {
            this.props.navigation.navigate('App');
        } else {
            this.props.navigation.navigate('Auth');
        }
    }

    render() {
        if (!this.state.fontLoaded) {
            return <View />;
        }
        return (
            <View style={styles.container}>
                <Logo startApp={this.startApp.bind(this)} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoStyle: {
        width: 150,
        height: 150
    }
});

export default SplashScreen;
