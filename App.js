import {
  setStatusBarNetworkActivityIndicatorVisible,
  StatusBar,
} from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
} from "react-native";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";
  //setLoading(true);

  function loadBusStopStopData() {
    fetch(BUSSTOP_URL)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
        const myBus = responseData.services.filter(
          (item) => item.no === "155"
        )[0];
        setArrival(myBus.next.time);
        //setStatusBarNetworkActivityIndicatorVisible(myBus.next.time);
        console.log("My Bus:", myBus)
        setLoading(false);
      });
  }

  useEffect(() => {
    const interval = setInterval(loadBusStopStopData, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Bus Arrival Time</Text>
      <Text style={styles.arrivalTime}>
        {loading ? <ActivityIndicator size="large" /> : arrival}
      </Text>
      <br></br>

      <br></br>
      <Button title="Refresh!" color="blue"></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
