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
import * as firebase from "firebase";

export default function App({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTrue, setIsTrue] = useState(false);

  const login = () => {
    setIsTrue(true);
    firebase.default
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((s) => {
        setIsTrue(false);
        email.toLocaleLowerCase() === "admin@gmail.com"
          ? navigation.navigate("Results")
          : navigation.navigate("Submit");
      })
      .catch((e) => {
        alert(e.message);
        setIsTrue(false);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: 10,
          backgroundColor: "white",
        }}
      >
        <Image
          style={{ height: 100, width: 100 }}
          source={require("./assets/download.png")}
        />
        <Text style={{ fontSize: 40 }}>LogIn</Text>
        <View style={{ width: "100%" }}>
          <View>
            <TextInput
              style={styles.input}
              placeholder={"Email"}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
          </View>

          <View>
            <TextInput
              style={styles.input}
              placeholder={"Password"}
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
          </View>
        </View>
        {!isTrue ? (
          <View
            style={{ backgroundColor: "#e74038", width: "100%", marginTop: 15 }}
          >
            <Button title="Login" color="blue" onPress={() => login()} />
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
          <Text>Don't have an account? </Text>
          <Button
            onPress={() => navigation.navigate("SignUp")}
            title="Signup"
            style={{ right: 10 }}
          />
        </View>
      </View>
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
