import React, { useState, useEffect } from "react";
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

export default function App() {
  const [users, setUsers] = useState([]);
  const [positive, setPositive] = useState(0);
  const [volunteers, setVolunteers] = useState(0);

  useEffect(() => {
    firebase.default
      .database()
      .ref(`users`)
      .once("value", (success) => {
        let array = [];
        let positive = 0;
        let volunteers = 0;
        success.forEach((s) => {
          if (s.val().email.toLowerCase() !== "admin@gmail.com") {
            let obj = s.val();
            obj.id = s.key;
            array.push(obj);

            if (obj.report === "positive") {
              positive = positive + 1;
            }

            if (obj.report !== "") {
              volunteers = volunteers + 1;
            }
          }
        });
        setUsers(array);
        setPositive(positive);
        setVolunteers(volunteers);
      });
  }, []);

  return (
    <ScrollView
      style={{
        backgroundColor:
          "white                                                                                                                                                                                                                                                                ",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: 10,
          //   marginTop: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            style={{ height: 100, width: 100 }}
            source={require("./assets/download.png")}
          />
          <Text style={{ fontSize: 40 }}>Results</Text>
        </View>
        <View style={{ marginTop: 30,marginBottom:30, display: "flex", justifyContent: "center", width:'100%' }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Statistics</Text>
          <View>
            <View>
              <Text>
                Volunteers:
                <Text style={{ fontWeight: "bold" }}>{volunteers}</Text>
              </Text>
            </View>

            <View>
              <Text>
                Positive:
                <Text style={{ fontWeight: "bold" }}>{positive} </Text>
              </Text>
            </View>
          </View>
        </View>

        {users && users.length > 0
          ? users.map((val, key) => {
              return (
                <View key={key} style={{ marginTop: 10 }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Text style={{ fontSize: 15, fontWeight: "600" }}>
                          Name:
                        </Text>
                        <Text style={{ left: 10 }}>{val.name}</Text>
                      </View>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Text style={{ fontSize: 15, fontWeight: "600" }}>
                          Email:
                        </Text>
                        <Text style={{ left: 10 }}>
                          {val.email && val.email.length > 10
                            ? val.email.slice(0, 10) + "..."
                            : val.email}
                        </Text>
                      </View>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Text style={{ fontSize: 15, fontWeight: "600" }}>
                          DOB:
                        </Text>
                        <Text style={{ left: 10 }}>{val.DOB}</Text>
                      </View>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Text style={{ fontSize: 15, fontWeight: "600" }}>
                          Gender:
                        </Text>
                        <Text style={{ left: 10 }}>{val.gender}</Text>
                      </View>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Text style={{ fontSize: 15, fontWeight: "600" }}>
                          Address:
                        </Text>
                        <Text style={{ left: 10 }}>{val.address}</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        // backgroundColor: "green",
                        marginTop: 10,
                        width: 150,
                      }}
                    >
                      <Text>
                        Report:{" "}
                        <Text style={{ color: "red" }}>
                          {val.report ? val.report : "inconclusive"}
                        </Text>
                      </Text>
                      <Text>Dose: {val.dose ? val.dose : "-"}</Text>
                      <Text>VaccineGroup: {val.group ? val.group : "-"}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      borderBottomColor: "lightgray",
                      width: "100%",
                      borderBottomWidth: 1,
                      marginTop: 10,
                    }}
                  />
                </View>
              );
            })
          : null}
      </View>
    </ScrollView>
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
