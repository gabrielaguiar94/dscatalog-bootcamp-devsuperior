import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Routes from "./src/routes";
import Toast from 'react-native-toast-message'

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Routes />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  )
}

export default App;