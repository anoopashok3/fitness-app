import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, TextInput, HelperText } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { VEHICLE_MAKES } from '../constants/vehicles';
import { VehicleMake, VehicleModel, VehicleVariant } from '../types/vehicle';

type VehicleSelectionScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'VehicleSelection'>;
};

const VehicleSelectionScreen: React.FC<VehicleSelectionScreenProps> = ({ navigation }) => {
  const [selectedMake, setSelectedMake] = useState<VehicleMake | null>(null);
  const [selectedModel, setSelectedModel] = useState<VehicleModel | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<VehicleVariant | null>(null);
  const [vin, setVin] = useState('');
  const [engineNumber, setEngineNumber] = useState('');
  const [color, setColor] = useState('');

  const handleStartInspection = () => {
    if (!selectedMake || !selectedModel || !selectedVariant || !vin || !engineNumber || !color) {
      return;
    }

    // TODO: Create a new PDI checklist and navigate to it
    navigation.navigate('PDIChecklist', {
      vehicleId: 'temp-id', // This should be generated when saving the vehicle
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.section}>
        <Card.Title title="Select Vehicle Make" />
        <Card.Content>
          <View style={styles.makeGrid}>
            {VEHICLE_MAKES.map((make) => (
              <Button
                key={make.id}
                mode={selectedMake?.id === make.id ? 'contained' : 'outlined'}
                onPress={() => {
                  setSelectedMake(make);
                  setSelectedModel(null);
                  setSelectedVariant(null);
                }}
                style={styles.makeButton}>
                {make.name}
              </Button>
            ))}
          </View>
        </Card.Content>
      </Card>

      {selectedMake && (
        <Card style={styles.section}>
          <Card.Title title="Select Model" />
          <Card.Content>
            <View style={styles.modelGrid}>
              {selectedMake.models.map((model) => (
                <Button
                  key={model.id}
                  mode={selectedModel?.id === model.id ? 'contained' : 'outlined'}
                  onPress={() => {
                    setSelectedModel(model);
                    setSelectedVariant(null);
                  }}
                  style={styles.modelButton}>
                  {model.name}
                </Button>
              ))}
            </View>
          </Card.Content>
        </Card>
      )}

      {selectedModel && (
        <Card style={styles.section}>
          <Card.Title title="Select Variant" />
          <Card.Content>
            <View style={styles.variantGrid}>
              {selectedModel.variants.map((variant) => (
                <Button
                  key={variant.id}
                  mode={selectedVariant?.id === variant.id ? 'contained' : 'outlined'}
                  onPress={() => setSelectedVariant(variant)}
                  style={styles.variantButton}>
                  {variant.name}
                </Button>
              ))}
            </View>
          </Card.Content>
        </Card>
      )}

      <Card style={styles.section}>
        <Card.Title title="Vehicle Details" />
        <Card.Content>
          <TextInput
            label="VIN"
            value={vin}
            onChangeText={setVin}
            style={styles.input}
          />
          <TextInput
            label="Engine Number"
            value={engineNumber}
            onChangeText={setEngineNumber}
            style={styles.input}
          />
          <TextInput
            label="Color"
            value={color}
            onChangeText={setColor}
            style={styles.input}
          />
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handleStartInspection}
        style={styles.startButton}
        disabled={!selectedMake || !selectedModel || !selectedVariant || !vin || !engineNumber || !color}>
        Start Inspection
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    margin: 10,
  },
  makeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  makeButton: {
    flex: 1,
    minWidth: '45%',
  },
  modelGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  modelButton: {
    flex: 1,
    minWidth: '45%',
  },
  variantGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  variantButton: {
    flex: 1,
    minWidth: '45%',
  },
  input: {
    marginBottom: 10,
  },
  startButton: {
    margin: 10,
  },
});

export default VehicleSelectionScreen; 