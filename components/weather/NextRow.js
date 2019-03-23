import React from 'react'
import {View, Text,TouchableHighlight,ListView, Modal, Button, Image} from 'react-native'
import kelvinToCelsius from 'kelvin-to-celsius'
import PropTypes from 'prop-types'
//import FadeInView from './animation/FadeInView'
import { Card, CardItem } from 'native-base';
import moment from 'moment'
import globalstyle from '../../Style'
//import { withTheme } from 'react-native-elements';


export class ModalExample extends React.Component {
  constructor(props){
      super(props)
    this.state = {
        modalVisible: false,
      };
    }

    static propTypes = {
        date : PropTypes.string,
        data_complete : PropTypes.array
    }
      
      setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    time(data){
      if(moment(data.dt * 1000).format('LT') === '01:00' || moment(data.dt * 1000).format('LT') === '04:00' || moment(data.dt * 1000).format('LT') === '22:00')
      {
        return true
      }
    }
    icon(size =50, data){
   
      const type = data.weather[0].main.toLowerCase()
    
      
      if(this.time(data)){
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
      else{
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

      filterData(data){
        data_day = data.filter((item) => moment(item.dt * 1000).format('ll') === this.props.date);
        return (data_day)
      }
      render (){
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          return(
        <View style={{marginTop: 22}}>

        <Modal 
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>

          <View style={globalstyle.ModalStyle}>
            <View style={globalstyle.ModalStyle1}>
              <Text style={globalstyle.TitleModal}>Météo de la journée</Text></View>
              <View style={{margin : 30, height: 300 }}>          
              <ListView
               dataSource={ds.cloneWithRows(this.filterData(this.props.data_complete))}
               renderRow={(row, a, b) =>  
               <View>
                 <Card>
                   <CardItem style={{backgroundColor : '#37474f'}}>
                    <View style ={globalstyle.CardModal}>
                      <Text style ={{fontSize : 20, color: '#FFF'}}>{moment(this.filterData(this.props.data_complete)[parseInt(b, 10)].dt * 1000).format('LT')}</Text>
                        {this.icon(50, this.filterData(this.props.data_complete)[parseInt(b, 10)])}
                      <Text style ={{fontSize : 30, color: '#FFF'}}>{Math.round(kelvinToCelsius(this.filterData(this.props.data_complete)[parseInt(b, 10)].main.temp))}°C</Text>
                    </View>
                   </CardItem>
                </Card>
              </View>}
              />       
            </View>
            <View style={globalstyle.ModalStyle}>
              
              <Button
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
                title="Retour"
                color="#62727b"
                accessibilityLabel="Météo de la semaine"
              />
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          underlayColor='transparent'
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Détails</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
  