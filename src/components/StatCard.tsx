import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base'
import React from 'react';
import { StyleSheet } from 'react-native';


export interface IStatCardProps {
    title: String,
    number: number,
    increment: number
    textColor: string
}
const StatCard: React.FC<IStatCardProps> = (props) => {
    return (
        <Card >
            <CardItem header>
                <Text style={styles(props.textColor).text}>{props.title}</Text>
            </CardItem>
            <CardItem>
                <Body>
                    <Text style={styles(props.textColor).text}>
                        {props.number}
                    </Text>
                </Body>
            </CardItem>
            <CardItem footer>
                <Text style={styles(props.textColor).text}>{props.increment}</Text>
            </CardItem>
        </Card>
    )
}
const styles = (textColor: string) => StyleSheet.create({
    text: {
        color: textColor
    }
})