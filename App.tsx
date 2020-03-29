import React from 'react';
import { StyleSheet, Text, View, TimePickerAndroid } from 'react-native';
import DashBoard from './src/components/DashBoard';
import { Row, Grid } from 'react-native-easy-grid';

export default function App() {

  return (
    <Grid>
    <Row size={45}></Row>
    <Row size={55} >
    <DashBoard ></DashBoard>
    </Row>
  
    </Grid>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
