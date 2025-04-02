import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import VehicleSelectionScreen from './src/screens/VehicleSelectionScreen';
import PDIChecklistScreen from './src/screens/PDIChecklistScreen';
import PDICategoryScreen from './src/screens/PDICategoryScreen';
import PDISummaryScreen from './src/screens/PDISummaryScreen';

export type RootStackParamList = {
  Home: undefined;
  VehicleSelection: undefined;
  PDIChecklist: { vehicleId: string };
  PDICategory: { vehicleId: string; categoryId: string };
  PDISummary: { checklistId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#2196F3',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{ title: 'Vehicle PDI' }}
            />
            <Stack.Screen 
              name="VehicleSelection" 
              component={VehicleSelectionScreen}
              options={{ title: 'Select Vehicle' }}
            />
            <Stack.Screen 
              name="PDIChecklist" 
              component={PDIChecklistScreen}
              options={{ title: 'PDI Checklist' }}
            />
            <Stack.Screen 
              name="PDICategory" 
              component={PDICategoryScreen}
              options={{ title: 'Category Inspection' }}
            />
            <Stack.Screen 
              name="PDISummary" 
              component={PDISummaryScreen}
              options={{ title: 'PDI Summary' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default App; 