import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, ProgressBar } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { PDI_CATEGORIES } from '../constants/vehicles';

type PDIChecklistScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PDIChecklist'>;
  route: RouteProp<RootStackParamList, 'PDIChecklist'>;
};

const PDIChecklistScreen: React.FC<PDIChecklistScreenProps> = ({ navigation, route }) => {
  const { vehicleId } = route.params;

  // TODO: Fetch checklist data from storage/API
  const checklistProgress = 0; // This should be calculated based on completed items

  const handleCategoryPress = (categoryId: string) => {
    navigation.navigate('PDICategory', {
      vehicleId,
      categoryId,
    });
  };

  const handleCompleteInspection = () => {
    // TODO: Save checklist and generate report
    navigation.navigate('PDISummary', {
      checklistId: 'temp-id', // This should be the actual checklist ID
    });
  };

  return (
    <View style={styles.container}>
      <Card style={styles.progressCard}>
        <Card.Content>
          <Text style={styles.progressTitle}>Inspection Progress</Text>
          <ProgressBar
            progress={checklistProgress}
            color="#2196F3"
            style={styles.progressBar}
          />
          <Text style={styles.progressText}>
            {Math.round(checklistProgress * 100)}% Complete
          </Text>
        </Card.Content>
      </Card>

      <ScrollView style={styles.categoriesContainer}>
        {PDI_CATEGORIES.map((category) => (
          <Card
            key={category.id}
            style={styles.categoryCard}
            onPress={() => handleCategoryPress(category.id)}>
            <Card.Content>
              <Text style={styles.categoryTitle}>{category.name}</Text>
              <Text style={styles.categoryDescription}>
                {category.description}
              </Text>
              <Text style={styles.itemCount}>
                {category.items.length} items to check
              </Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      <Button
        mode="contained"
        onPress={handleCompleteInspection}
        style={styles.completeButton}
        disabled={checklistProgress < 1}>
        Complete Inspection
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  progressCard: {
    margin: 10,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  progressText: {
    marginTop: 5,
    textAlign: 'center',
    color: '#666',
  },
  categoriesContainer: {
    flex: 1,
  },
  categoryCard: {
    margin: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  categoryDescription: {
    color: '#666',
    marginBottom: 5,
  },
  itemCount: {
    color: '#2196F3',
    fontSize: 12,
  },
  completeButton: {
    margin: 10,
  },
});

export default PDIChecklistScreen; 