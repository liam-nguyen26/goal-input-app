import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo-app-loading';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

// const fetchFonts = () => {
//   return Font.loadAsync({
//     'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
//     'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
//   });
// }


export default function App() {
  const [ userNumber, setUserNumber ] = useState();
  const [guessRound, setGuessRound] = useState(0);
  // const [dataLoaded, setDateLoaded] = useState(false);
   
  
  // if (!dataLoaded) {
  //   return <AppLoading startAsync={fetchFonts} 
  //                       onFinish={() => setDateLoaded(true)}
  //                       onError={err => console.log(err)}/>
  // }

  const configNewGameHandler = () => {
    setGuessRound(0);
    setUserNumber(null);
  }
 
  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRound(numOfRounds);
  }

  let content = <StartGameScreen onStartGame={startGameHandler}/>;

  if (userNumber && guessRound <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>;
  } else if (guessRound > 0) {
    content = <GameOverScreen roundNumbers={guessRound} userNumber={userNumber} onRestart={configNewGameHandler}/>
  }

  return (
    <View style={styles.container}>
      <View><Header tilte="A number"/></View>
      {content}
      
    </View>
  );
}

const styles = StyleSheet.create({
});
