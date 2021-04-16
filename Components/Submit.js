import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import * as firebase from "firebase";

export default function App({ navigation }) {
  const [text, onChangeText] = React.useState("");
  const [report, setReport] = React.useState("negative");
  const [group, setVaccineGroup] = React.useState('');
  const [dose, setDose] = React.useState(null);

  useEffect(() => {
    firebase.default
      .database()
      .ref(`users/${firebase.default.auth().currentUser.uid}`)
      .once("value", (success) => {
        // let array = [];
        // success.forEach((s) => {
        //   if (s.val().email.toLowerCase() !== "admin@gmail.com") {
        //     let obj = s.val();
        //     obj.id = s.key;
        //     array.push(obj);
let s = success.val();
        setReport(s.report ? s.report:'negative')
        setVaccineGroup(s.group ? s.group:'')
        setDose(s.dose ? s.dose:'')

            console.log(success.val());
        //   }
        // });
        // setUsers(array);
      });
  }, []);

  const update = () => {
    firebase.default
      .database()
      .ref(`users/${firebase.default.auth().currentUser.uid}`)
      .update({
        dose: dose,
        group: group,
        report: report,
      })
      .then(() => {
        alert("Status updated successfully")
        // navigation.navigate("Lists");
      })
      .catch((e) => {
        console.log("===", e);
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
          style={{ height: 100, width: 100, marginBottom:25, marginTop:-30 }}
          source={require("./assets/download.png")}
        />
        <View style={{ width: "100%" }}>
          <View>
            <TextInput
              style={styles.input}
              placeholder={"Vaccine group"}
              value={group}
              onChangeText={(text) => setVaccineGroup(text)}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder={"Dose"}
              value={dose}
              onChangeText={(text) => {
                setDose(text);
              }}
            />
          </View>
          {/* <View>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={number}
              keyboardType="numeric"
              placeholder={"Cnic Number "}
            />
          </View>
          <View>
            <TextInput style={styles.input} placeholder={"Age"} />
          </View> */}
        </View>
        <View
          style={{
            width: "100%",
            marginTop: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* <View style={{ backgroundColor: "green", width: 100 }}> */}
          <TouchableOpacity
            onPress={() => setReport("positive")}
            style={[
              styles.reportpositive,
              report === "positive"
                ? { borderWidth: 5, borderColor: "blue" }
                : {},
            ]}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Report Positive
            </Text>
          </TouchableOpacity>
          {/* </View> */}
          <TouchableOpacity
            onPress={() => setReport("negative")}
            style={[
              styles.reportnegative,
              report === "negative"
                ? { borderWidth: 5, borderColor: "blue" }
                : {},
            ]}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Report Negative
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setReport("inconclusive")}
            style={[
              styles.reportinconclusive,
              report === "inconclusive"
                ? { borderWidth: 5, borderColor: "blue" }
                : {},
            ]}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Report Inconclusive
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ backgroundColor: "#e74038", width: "100%", marginTop: 20 }}
        >
          <Button title="Confirm" color="blue" onPress={() => update()} />
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
  reportpositive: {
    backgroundColor: "red",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    width: 100,
  },
  reportnegative: {
    backgroundColor: "green",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    width: 100,
  },
  reportinconclusive: {
    backgroundColor: "gray",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    width: 100,
  },
});
