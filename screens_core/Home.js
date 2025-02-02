import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import BtnHomNav from "./components/BtnHomeNav";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.vwTitle}>
        <Text style={styles.txtTitle}>Home Screen</Text>
      </View>
      <ScrollView>
        <View style={styles.vwButtons}>
          <BtnHomNav
            goTo={"Test12"}
            title={"Test12"}
            description={
              "5-10 trianlges: Relying on one axis as dependent var for boundaries "
            }
            navigation={navigation}
          />
          <BtnHomNav
            goTo={"Test11"}
            title={"Test11"}
            description={"5-10 trianlges: Geometric functions "}
            navigation={navigation}
          />
          <BtnHomNav
            goTo={"Test10"}
            title={"Test10"}
            description={"4-12 trianlges: Geometric functions "}
            navigation={navigation}
          />
          <BtnHomNav
            goTo={"Test09"}
            title={"Test09 "}
            description={
              "4 triangles Mid 8 Outer: Geometric functions to test boundaries "
            }
            navigation={navigation}
          />
          <BtnHomNav
            goTo={"Test08"}
            title={"Test08 from NativeStuff22"}
            description={"taken from NativeStuff22 Test08"}
            navigation={navigation}
          />
          <BtnHomNav
            goTo={"WelcomeScreen"}
            title={"Welcome Screen"}
            description={"How this works"}
            navigation={navigation}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.2)",
    alignItems: "center",
  },
  vwTitle: {
    paddingTop: 50,
    paddingBottom: 100,
  },
  txtTitle: { fontSize: 30 },
  vwButtons: {
    gap: 5,
  },
});
