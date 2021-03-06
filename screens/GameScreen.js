import React, { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Alert } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rdnNumber = Math.floor(Math.random() * (max - min)) + min;
    if (rdnNumber === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rdnNumber;
    }
}

const GameScreen = (props) => {
    const [ currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice)); //initial state thooi ko lo lam

    const [ rounds, setRounds ] = useState(0);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(rounds);
        }
    }, [currentGuess, userChoice]);

    const nextGuessHanlder = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice)
                || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie!!', 'You know that this is wrong...', [{text: 'Sorry', style: 'cancel'}]);
            return;
        }

        if (direction === 'lower') {
            // generateRandomBetween()
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(currentRound => currentRound + 1);
    };

    return ( 
        <View style={styles.screen}>
            <Text>Opponent's guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title={"LOWER"} onPress={nextGuessHanlder.bind(this, 'lower')}/>
                <Button title={"GREATER"} onPress={nextGuessHanlder.bind(this, 'greater')} />
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
})

export default GameScreen;