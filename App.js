import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Submit from "./Components/Submit";
import Lists from "./Components/Lists";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCeY7SkgJ8fhqTCFLWk9lYlYHl3D7TLkQ0",
  authDomain: "covid-cb5b5.firebaseapp.com",
  databaseURL: "https://covid-cb5b5-default-rtdb.firebaseio.com",
  projectId: "covid-cb5b5",
  storageBucket: "covid-cb5b5.appspot.com",
  messagingSenderId: "91099582166",
  appId: "1:91099582166:web:153af45c86dfacfe584377",
  measurementId: "G-V5RZY49T2V",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

export default function App() {
  return (
    // <View style={styles.container}>

    // <Lists />
    // {/* <Submit /> */}
    // {/* <Login /> */}
    // {/* <SignUp /> */}
    // </View>

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Submit" component={Submit} />
        <Stack.Screen name="Results" component={Lists} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
});
