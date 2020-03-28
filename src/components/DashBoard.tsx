import React from "react";
import { Data } from "../httpclients/models/Data";
import { View, Text } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

export interface DashBoardProps {
}
export interface DashBoardState {
  data: Data[]
  isLoading: boolean
}


export default class DashBoard extends React.Component<DashBoardProps, DashBoardState>{
  componentWillMount() {
    this.setState({ data: [], isLoading: true })
  }
  componentDidMount() {
    fetch('https://raw.githubusercontent.com/opencovid19-fr/data/master/dist/chiffres-cles.json', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((res) => res.json())
      .then((resData: Data[]) => {
        this.setState({ data: resData })
        console.log(resData[0].code)
      })
      .catch((error) => console.error(error))
      .finally(() => this.setState({ isLoading: false }))
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Grid>
          <Row>
            <Col style={{ backgroundColor: "red" }}></Col>
            <Col style={{ backgroundColor: "blue" }}></Col>
          </Row>
          <Row>
            <Col style={{ backgroundColor: "yellow" }}></Col>
            <Col style={{ backgroundColor: "green" }}></Col>
          </Row>
        </Grid>
      </View>
    )
  }
  // handleData(data:Data[]){
  //   data.


  // }


}
