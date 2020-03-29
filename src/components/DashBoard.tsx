import React from "react";
import { Data } from "../httpclients/models/Data";
import { View, Text, Dimensions } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import StatCard, { IStatCardProps } from "./StatCard";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import _ from 'lodash';
import { Header, CardItem, Card } from "native-base";

export interface DashBoardProps {
}
export interface DashBoardState {
  data: Data[]
  fraData: any[]
  frDetailData: any[]
  graphData: any
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
        let fraDataRes = _.chain(resData).groupBy("code").value()["FRA"]
        let frData = _.chain(fraDataRes)
          .filter(data => data.casConfirmes !== null && data.casConfirmes !== undefined && data.deces !== null && data.deces !== undefined)
          .uniqBy(data => data.date)
          .map(data => {
            return {
              x: data.date,
              y: {
                case: data.casConfirmes,
                deces: data.deces,
                date:data.date
              }
            }
          })
          .value()
          let frDetailData = _.chain(fraDataRes)
          .filter(data => data.reanimation !== null && data.reanimation !== undefined && data.gueris !== null && data.gueris !== undefined)
          .uniqBy(data => data.date)
          .map(data => {
            return {
              x: data.date,
              y: {
                critic: data.reanimation,
                recovered: data.gueris,
                date:data.date
              }
            }
          })
          .value()
        console.log(frData)
        this.setState({ data: resData, fraData: fraDataRes, graphData: frData , frDetailData:frDetailData})
      })
      .catch((error) => console.error(error))
      .finally(() => this.setState({ isLoading: false }))
  }
  render() {
    let isLoading: boolean = this.state.isLoading
    let graphData=this.state.graphData
    let detailData=this.state.frDetailData
    let caseProps: IStatCardProps = { 
      title: "cas confirmés", 
      number: isLoading ? "Loading..." : graphData[graphData.length - 1].y.case, 
      increment: isLoading ? 0 : graphData[graphData.length - 1].y.case - graphData[graphData.length - 2].y.case,
       textColor: "orange" }
    let deceasedProps: IStatCardProps = { 
      title: "décès", 
      number: isLoading ? "Loading..." : graphData[graphData.length - 1].y.deces,
       increment: isLoading ? 0 : graphData[graphData.length - 1].y.deces - graphData[graphData.length - 2].y.deces,
        textColor: "red" }

    let criticProps: IStatCardProps = {
       title: "en réanimation", 
       number: isLoading ? "Loading..." : detailData[detailData.length - 1].y.critic, 
       increment: isLoading ? 0 : detailData[detailData.length - 1].y.critic-detailData[detailData.length - 2].y.critic, 
       textColor: "#53657D" }
    let curedProps: IStatCardProps = { 
      title: "guéris", 
      number: isLoading ? "Loading..." : detailData[detailData.length - 1].y.recovered, 
      increment: isLoading ? 0 : detailData[detailData.length - 1].y.recovered-detailData[detailData.length - 2].y.recovered, 
      textColor: "green" }

    return (
      <View style={{ flex: 1 }}>
        <Grid style={{ backgroundColor: "grey" }}>
          <Row size={8} >
            <Text style={{ fontSize: RFValue(20), marginTop: RFValue(20), margin: RFValue(5), color: "white" }}>Données au {isLoading?"":graphData[graphData.length - 1].y.date}</Text>
          </Row>
          <Row size={35} >
            <LineChart
              data={{
                labels: this.state.isLoading ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : _.chain(this.state.graphData).map(data => data.x).value(),
                datasets: [
                  {
                    data: this.state.isLoading ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : _.chain(this.state.graphData).map(graphData => graphData.y.case).value()
                  }
                ]
              }}
              width={Dimensions.get("window").width} // from react-native
              height={RFValue(280)}
              yAxisLabel=""
              yAxisInterval={10} // optional, defaults to 1
              formatYLabel={(yLabel) => yLabel.replace(".00", "")}
              formatXLabel={(xLabel) => (xLabel && xLabel.includes("-15")) ? xLabel : ""}
              chartConfig={{
                backgroundColor: "grey",
                backgroundGradientFrom: "grey",
                backgroundGradientTo: "grey",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 3
                },
                propsForDots: {
                  r: "3",
                  strokeWidth: "1",
                  stroke: "grey"
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
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
