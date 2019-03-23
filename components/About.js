import React from 'react'
import globalstyle from '../Style'
import {View, Text ,Image, ImageBackground} from 'react-native'


export default class About extends React.Component {
    
    static navigationOptions = {
        tabBarIcon : () => {
            return <Image source={require('./png/home.jpg')} style={{width : 20, height: 20}}/>
        }
    }
  
    render () {
        return (
            <View>
                <ImageBackground source={require('./background/Blood.jpg')} style={{width: '100%',height:'100%'}}>
                    <View style={globalstyle.container}>
                        <Text style={globalstyle.title}>
                            Météo
                        </Text>
                        <Text style={{margin : 20, fontSize: 16, color: '#FFF'}}>
                        Voici ma première application react-native
                        </Text>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}
