import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base'
import React from 'react';
import { StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export interface IStatCardProps {
    title: string,
    number: number,
    increment: number,
    textColor: string
}
const StatCard: React.FC<IStatCardProps> = (props) => {
    return (
        <Card style={{flex:1, alignItems:"center"}}>
            <CardItem header >
                <Text style={{color:props.textColor, fontSize:RFValue(15)}}>{props.title}</Text>
            </CardItem>
            <CardItem  style={{...zeroPadding}}>
                    <Text style={{color:props.textColor, fontSize:RFValue(25), fontWeight:"bold"}}>
                        {props.number}
                    </Text>
            </CardItem>
            <CardItem footer  style={{...zeroPadding, paddingTop:0}} >
                <Text style={{color:props.textColor, fontSize:RFValue(15)}}>{props.increment>=0?"+":"-"}{props.increment}</Text>
            </CardItem>
        </Card>
    )
}
const zeroPadding ={ paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0}

export default StatCard