import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import BuyScreen from '../screens/BuyScreen';
import DatabaseScreen from '../screens/DatabaseScreen';
import ReportScreen from '../screens/ReportScreen';

export type RootStackParamList = {
  Home: undefined;
  Buy: undefined;
  Database: undefined;
  Report: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Buy" component={BuyScreen} options={{ title: 'Comprar' }} />
        <Stack.Screen name="Database" component={DatabaseScreen} options={{ title: 'Base de datos' }} />
        <Stack.Screen name="Report" component={ReportScreen} options={{ title: 'Informe' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
