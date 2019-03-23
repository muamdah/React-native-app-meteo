import React  from 'react'
import {View, Text, Image,} from 'react-native'
import PropTypes from 'prop-types'
import moment from 'moment'
import kelvinToCelsius from 'kelvin-to-celsius'
import 'moment/locale/fr'
import globalstyle from '../../Style'
import { Card, CardItem } from 'native-base';
import { ModalExample } from './NextRow'
 


moment.locale('fr')

export default class WeatherRow extends React.Component{

    constructor(props){
        super(props)
        }

    static propTypes = {
        day : PropTypes.object.isRequired,
        index : PropTypes.number,
        data_complete : PropTypes.array.isRequired,
    }
    
    time(data){
        if(moment(data.dt * 1000).format('LT') === '01:00' || moment(data.dt * 1000).format('LT') === '04:00' || moment(data.dt * 1000).format('LT') === '22:00')
        {
          return true
        }
      }

      icon(size =50){
     
        const type = this.props.day.weather[0].main.toLowerCase()
      
        if(this.time(this.props.day)){
          switch(type){
  
            case 'clouds': 
            image = require('./icons/cloud_night.png')
            break
            case 'rain':
            image = require('./icons/rain_night.png')
            break
            default :
            image = require('./icons/clear_night.png')
        }
      }
      else {
        switch(type){
            case 'clouds': 
            image = require('./icons/cloud.png')
            break
            case 'rain':
            image = require('./icons/rain.png')
            break
            default :
            image = require('./icons/clear.png')
        }
    }
    return <Image source={image} style={{width: size ,height: size}}/>
  }

  dayFirst(){
    let day = moment(this.props.day.dt * 1000).format('LL').toUpperCase()
    return(
        <Text>{day}</Text>
    )
}
day(){
    let day = moment(this.props.day.dt * 1000).format('dddd').toUpperCase()
    return(
        <Text>{day}</Text>
    )
}


date(){
  
    let day = moment(this.props.day.dt * 1000).format('ll')
    return(
        <Text >{day}</Text>
    )
    
}
dates(){
  
    let day = moment(this.props.day.dt * 1000).format('ll')
    return(
        day
    )
    
}

    render(){
        if(this.props.index === 0){
            return(
                
                    <Card>
                        <CardItem style={globalstyle.CardFirst}>
                        <View style={globalstyle.ViewFirst2}>
                            <View>   
                                        <Text style={globalstyle.toDay}>Aujourd'hui</Text>
                                        <Text style={globalstyle.dayFirst}>{this.date()}</Text>
                            </View>
                            <View style={globalstyle.ViewFirst}>
                                                
                                {this.icon(140)}
                                    
                                        <Text style={globalstyle.tempFirst}>
                                        {Math.round(kelvinToCelsius(this.props.day.main.temp))}°C
                                        </Text>
                        
                            </View>
                        </View>
                        </CardItem>
                    </Card>
                )
        }
        else {
            return(
                
                <Card >
               <CardItem style={globalstyle.Card}>
                    <View style={globalstyle.View}>
                        <View> 
                            <Text  style={globalstyle.temp}>{this.day()}</Text>
                            <Text style={globalstyle.day}>{this.date()}</Text>
                        <ModalExample date={this.dates()} data_complete={this.props.data_complete}/>
                        </View>
                        <View>
                            <View>{this.icon()}</View>
                        
                            <Text style={globalstyle.temp}>
                            {Math.round(kelvinToCelsius(this.props.day.main.temp))}°C
                            </Text>
                        </View>
                    </View>
                    
                </CardItem>

            </Card>
                )
            } 
        }
    }