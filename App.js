import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens_core/Home";
import WelcomeScreen from "./screens/WelcomeScreen";
import Test08 from "./screens/Test08";
import Test09 from "./screens/Test09";
import Test10 from "./screens/Test10";
import Test11 from "./screens/Test11";
import Test12 from "./screens/Test12";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="Test08" component={Test08} />
        <Stack.Screen name="Test09" component={Test09} />
        <Stack.Screen name="Test10" component={Test10} />
        <Stack.Screen name="Test11" component={Test11} />
        <Stack.Screen name="Test12" component={Test12} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
