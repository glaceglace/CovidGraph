import React from "react";
import { Data } from "../httpclients/models/Data";
import { View, Text } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import StatCard, { IStatCardProps } from "./StatCard";
import { RFValue } from "react-native-responsive-fontsize";

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
    let caseProps: IStatCardProps = { title: "cas confirmés", number: 123456, increment: 123, textColor: "orange" }
    let criticProps: IStatCardProps = { title: "en réanimation", number: 123456, increment: 123, textColor: "#53657D" }
    let deceasedProps: IStatCardProps = { title: "décès", number: 123456, increment: 123, textColor: "red" }
    let curedProps: IStatCardProps = { title: "guéris", number: 123456, increment: 123, textColor: "green" }
    return (
      <View style={{ flex: 1 }}>
        <Grid style={{ backgroundColor: "grey" }}>
          <Row size={5} >
          <Text style={{fontSize:RFValue(20), margin:RFValue(5), color:"white"}}>Données au {}</Text>
          </Row>
          <Row size={25}  >
            <Col style={{ padding: RFValue(5) }}>
              <StatCard {...caseProps}></StatCard>
            </Col>
            <Col style={{ padding: RFValue(5) }}>
              <StatCard {...deceasedProps}></StatCard>
            </Col>
          </Row>
          <Row size={25} >
            <Col style={{ padding: RFValue(5) }}>
              <StatCard {...criticProps}></StatCard>
            </Col>
            <Col style={{ padding: RFValue(5) }}>
              <StatCard {...curedProps}></StatCard>
            </Col>
          </Row>
        </Grid>
      </View>
    )
  }
  // handleData(data:Data[]){
  //   data.


  // }


}
