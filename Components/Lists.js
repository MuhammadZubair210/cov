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

  useEffect(() => {
    firebase.default
      .database()
      .ref(`users`)
      .once("value", (success) => {
        let array = [];
        success.forEach((s) => {
          if (s.val().email.toLowerCase() !== "admin@gmail.com") {
            let obj = s.val();
            obj.id = s.key;
            array.push(obj);

            console.log(s.val());
          }
        });
        setUsers(array);
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
