import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import Card from "../components/Card";
import Colors from "../constants/color";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState(""); //def is string for all input
  const [confirmed, setConfirmed] = useState("false");
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHanlder = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, "")); //replacing globally anthing not a number in entire text
    //and replace it with a string
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHanlder = () => {
    const choosenNumber = parseInt(enteredValue);

    if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }

    setConfirmed(true);
    setSelectedNumber(parseInt(enteredValue)); //store value lai
    setEnteredValue(""); //xoa input
    Keyboard.dismiss();
  };

  let confirmOutput;

  if (confirmed) {
    confirmOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button title="START GAME" onPress={() => props.onStartGame(selectedNumber)}/>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View styles={styles.screen}>
        <View style={styles.title}>
          <Text>Start a new game</Text>
        </View>
        <Card style={styles.inputContainer}>
          <Text>Miền Đông team plz select a number kkkkk</Text>

          <Input
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHanlder}
            value={enteredValue}
          />

          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={resetInputHandler}
                color={Colors.accent}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmInputHanlder}
                color={Colors.primary}
              />
            </View>
          </View>
        </Card>
        {confirmOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    alignItems: "center",
    marginVertical: 10, //marginbottom and margin top
  },
  inputContainer: {
    width: 400,
    maxWidth: "90%",
    margin: 20,
    alignItems: "center", //default la flex box column nen center no vo giua column
  },
  buttonContainer: {
    flexDirection: "row", // mac dinh la column
    width: "100%", //the parent
    justifyContent: "space-between", //space and all available between them,
    paddingHorizontal: 15,
  },
  button: {
    width: 100,
    alignItems: "center",
  },
  input: {
    width: 100,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center'

  },
});

export default StartGameScreen;
