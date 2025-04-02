import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, List, Divider } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { PDI_CATEGORIES } from '../constants/vehicles';

type PDISummaryScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PDISummary'>;
  route: RouteProp<RootStackParamList, 'PDISummary'>;
};

const PDISummaryScreen: React.FC<PDISummaryScreenProps> = ({ navigation, route }) => {
  const { checklistId } = route.params;

  // TODO: Fetch checklist data from storage/API
  const checklistData = {
    vehicle: {
      make: 'Maruti Suzuki',
      model: 'Swift',
      variant: 'VXI',
      vin: 'ABC123XYZ',
      engineNumber: 'ENG123456',
      color: 'Red',
    },
    date: new Date().toISOString(),
    inspector: 'John Doe',
    status: 'completed' as const,
    categories: PDI_CATEGORIES.map((category) => ({
      id: category.id,
      name: category.name,
      items: category.items.map((item) => ({
        id: item.id,
        name: item.name,
        status: 'pass' as const,
        notes: 'All good',
      })),
    })),
  };

  const handleGenerateReport = () => {
    // TODO: Generate and save PDF report
  };

  const handleShareReport = () => {
    // TODO: Implement report sharing
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Card style={styles.section}>
          <Card.Title title="Vehicle Information" />
          <Card.Content>
            <List.Item
              title="Make"
              description={checklistData.vehicle.make}
              left={(props) => <List.Icon {...props} icon="car" />}
            />
            <List.Item
              title="Model"
              description={checklistData.vehicle.model}
              left={(props) => <List.Icon {...props} icon="car" />}
            />
            <List.Item
              title="Variant"
              description={checklistData.vehicle.variant}
              left={(props) => <List.Icon {...props} icon="car" />}
            />
            <List.Item
              title="VIN"
              description={checklistData.vehicle.vin}
              left={(props) => <List.Icon {...props} icon="barcode" />}
            />
            <List.Item
              title="Engine Number"
              description={checklistData.vehicle.engineNumber}
              left={(props) => <List.Icon {...props} icon="engine" />}
            />
            <List.Item
              title="Color"
              description={checklistData.vehicle.color}
              left={(props) => <List.Icon {...props} icon="palette" />}
            />
          </Card.Content>
        </Card>

        <Card style={styles.section}>
          <Card.Title title="Inspection Summary" />
          <Card.Content>
            {checklistData.categories.map((category) => (
              <View key={category.id}>
                <Text style={styles.categoryTitle}>{category.name}</Text>
                {category.items.map((item) => (
                  <List.Item
                    key={item.id}
                    title={item.name}
                    description={item.notes}
                    left={(props) => (
                      <List.Icon
                        {...props}
                        icon={item.status === 'pass' ? 'check-circle' : 'close-circle'}
                      />
                    )}
                  />
                ))}
                <Divider style={styles.divider} />
              </View>
            ))}
          </Card.Content>
        </Card>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleGenerateReport}
          style={styles.button}
          icon="file-pdf-box">
          Generate Report
        </Button>
        <Button
          mode="outlined"
          onPress={handleShareReport}
          style={styles.button}
          icon="share">
          Share Report
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
  content: {
    flex: 1,
  },
  section: {
    margin: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  divider: {
    marginVertical: 10,
  },
  buttonContainer: {
    padding: 10,
  },
  button: {
    marginBottom: 10,
  },
});

export default PDISummaryScreen; 