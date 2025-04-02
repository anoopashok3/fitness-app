import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Surface } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Surface style={styles.header} elevation={4}>
        <Text style={styles.title}>Vehicle Pre-Delivery Inspection</Text>
        <Text style={styles.subtitle}>Comprehensive vehicle inspection app</Text>
      </Surface>

      <View style={styles.content}>
        <Text style={styles.description}>
          This app helps you perform thorough pre-delivery inspections for new vehicles.
          Select a vehicle to begin the inspection process.
        </Text>

        <Button
          mode="contained"
          onPress={() => navigation.navigate('VehicleSelection')}
          style={styles.button}>
          Start New Inspection
        </Button>

        <Button
          mode="outlined"
          onPress={() => {/* TODO: Implement recent inspections */}}
          style={styles.button}>
          View Recent Inspections
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 30,
    lineHeight: 24,
  },
  button: {
    marginBottom: 15,
  },
});

export default HomeScreen; 