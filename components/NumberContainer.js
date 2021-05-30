import React from "react";
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../constants/color';
const NumberContainer = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        borderColor: Colors.accent,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10, //top and bottom
        alignItems: 'center', //center intem in container
        justifyContent: 'center',  //center container deu to the main screen flex box
        borderWidth: 2
    },

    number: {
        color: Colors.accent,
        fontSize: 22,
    }
});

export default NumberContainer;