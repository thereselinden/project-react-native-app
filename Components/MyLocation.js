import React, { useState, useEffect } from 'react'
import { Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
//import MapView from 'react-native-maps';
import styled from 'styled-components/native' //added
//import { requireNativeComponent } from 'react-native';

const MyLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  
  
  useEffect(() => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      setErrorMsg(
        'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      );
    } else {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }
  },[]);
  
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  
  return (
    <Container>
      {/* <TopContainer>
        <MainText>Find out distance to...</MainText>  
      </TopContainer>  */}
      {/* <MapView
      initialRegion={location}
      showsUserLocation={true}
      showsCompass={true}
      style={{flex:1}}
      /> */}
      <BottomContainer>
        <Paragraph>{text}</Paragraph>
      </BottomContainer>
    </Container>
  );
}

//added
const Container = styled.View`
flex: 1;
justify-content: center;
align-items: center;
`
const TopContainer = styled.View`
  background-color: #000000;
`

const BottomContainer = styled.View`
  background-color: #000567;
`


const MainText = styled.Text`
  font-size: 24px;
  padding: 40px;
  color: #ffffff;
  flex: 1;
`
const Paragraph = styled.Text`
  flex: 3;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #ffffff;
`

export default MyLocation