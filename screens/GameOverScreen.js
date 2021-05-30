import React from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";


const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>The Game is Over!</Text>
      <Image source={require('../assets/success.png')} style={styles.image} resizeMode='cover'/>
      <Text>Number of rounds: {props.roundNumbers}</Text>
      <Text>Number was: {props.userNumber}</Text>
      <Button title="New Game" onPress={props.onRestart}/>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
      width: '80%',
      height: 300,
      borderRadius: 300
  }
});

export default GameOverScreen;
