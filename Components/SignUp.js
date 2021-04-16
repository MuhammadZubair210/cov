import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  ActivityIndicator,
  TextInput,
  Button,
} from "react-native";
import { Dimensions } from "react-native";
import * as firebase from "firebase";
import DateTimePicker from "@react-native-community/datetimepicker";
import RadioButtonRN from "radio-buttons-react-native";

const data = [
  {
    label: "male",
    accessibilityLabel: "male",
  },
  {
    label: "female",
    accessibilityLabel: "female",
  },
];

export default function App({ navigation }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [DOB, setDOB] = useState(new Date().toLocaleDateString());
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("male");

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [isTrue, setIsTrue] = useState(false);

  const save = () => {
    setIsTrue(true);
    firebase.default
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((s) => {
        firebase.default
          .database()
          .ref(`users/${s.user.uid}`)
          .set({
            name: name,
            email: email,
            DOB: DOB,
            gender: gender,
            address: address,
          })
          .then(() => {
            setIsTrue(false);

            navigation.navigate("Login");
          })
          .catch((e) => setIsTrue(false));
        setIsTrue(false);
      })
      .catch((e) => {
        setIsTrue(false);
        alert(e.message);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{
          height: Dimensions.get("screen").height,
        }}
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          backgroundColor: "white",
          paddingBottom: 40,
        }}
      >
        <Image
          style={{ height: 100, width: 100 }}
          source={require("./assets/download.png")}
        />
        <Text style={{ fontSize: 40 }}>Sign Up</Text>

        <View style={{ width: "100%" }}>
          <View>
            <TextInput
              style={styles.input}
              placeholder={"Name"}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder={"Email"}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder={"Password"}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View>
            <Text style={styles.input} onPress={() => setShow(true)}>
              {DOB}
            </Text>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={(e) => {
                  setShow(false);
                  setDOB(
                    new Date(e.nativeEvent.timestamp).toLocaleDateString()
                  );
                }}
              />
            )}
          </View>
          <View>
            {/* <TextInput
              style={styles.input}
              placeholder={"Gender"}
              onChangeText={(text) => setGender(text)}
            /> */}

            <Text style={[styles.input, { borderWidth: 0, marginBottom: -15 }]}>
              Gender
            </Text>

            <RadioButtonRN
              initial={1}
              data={data}
              selectedBtn={(e) => setGender(e.label)}
            />

            {/* <Picker
  // selectedValue={selectedLanguage}
  onValueChange={(itemValue, itemIndex) =>
    // setSelectedLanguage(itemValue)
console.log(itemValue)
    // (text) => setGender(text)
  }>
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
</Picker> */}
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder={"Address"}
              onChangeText={(text) => setAddress(text)}
            />
          </View>
        </View>
        {/* <View
          style={{ backgroundColor: "#e74038", width: "100%", marginTop: 10 }}
        >
          <Button title="Sign Up" color="blue" onPress={() => save()} />
        </View> */}

        {!isTrue ? (
          <View
            style={{ backgroundColor: "#e74038", width: "100%", marginTop: 15 }}
          >
            <Button title="Sign Up" color="blue" onPress={() => save()} />
          </View>
        ) : (
          <View style={{ width: "100%", marginTop: 15 }}>
            <ActivityIndicator
              color="#bc2b78"
              size="large"
              //  style = {styles.activityIndicator}
            />
          </View>
        )}

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            margin: 10,
          }}
        >
          <Text>Already have an account? </Text>
          <Button
            onPress={() => navigation.navigate("Login")}
            title="Login"
            style={{ right: 10 }}
          />
        </View>
        {/* </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    width: "100%",
    marginTop: 10,
    padding: 10,
  },
});
