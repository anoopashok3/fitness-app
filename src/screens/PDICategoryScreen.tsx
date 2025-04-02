import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, TextInput, RadioButton, IconButton } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { PDI_CATEGORIES } from '../constants/vehicles';
import { PDICategoryItem } from '../types/vehicle';

type PDICategoryScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PDICategory'>;
  route: RouteProp<RootStackParamList, 'PDICategory'>;
};

const PDICategoryScreen: React.FC<PDICategoryScreenProps> = ({ navigation, route }) => {
  const { vehicleId, categoryId } = route.params;
  const [items, setItems] = useState<Record<string, PDICategoryItem>>({});

  const category = PDI_CATEGORIES.find((c) => c.id === categoryId);
  if (!category) {
    return (
      <View style={styles.container}>
        <Text>Category not found</Text>
      </View>
    );
  }

  const handleItemStatusChange = (itemId: string, status: 'pass' | 'fail' | 'na') => {
    setItems((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        status,
      },
    }));
  };

  const handleNotesChange = (itemId: string, notes: string) => {
    setItems((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        notes,
      },
    }));
  };

  const handleAddImage = (itemId: string) => {
    // TODO: Implement image picker and storage
  };

  const handleSaveCategory = () => {
    // TODO: Save category inspection data
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Card style={styles.headerCard}>
          <Card.Content>
            <Text style={styles.categoryTitle}>{category.name}</Text>
            <Text style={styles.categoryDescription}>
              {category.description}
            </Text>
          </Card.Content>
        </Card>

        {category.items.map((item) => (
          <Card key={item.id} style={styles.itemCard}>
            <Card.Content>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>

              <RadioButton.Group
                onValueChange={(value) =>
                  handleItemStatusChange(item.id, value as 'pass' | 'fail' | 'na')
                }
                value={items[item.id]?.status || 'na'}>
                <View style={styles.radioGroup}>
                  <RadioButton.Item label="Pass" value="pass" />
                  <RadioButton.Item label="Fail" value="fail" />
                  <RadioButton.Item label="N/A" value="na" />
                </View>
              </RadioButton.Group>

              {item.requiresNotes && (
                <TextInput
                  label="Notes"
                  value={items[item.id]?.notes || ''}
                  onChangeText={(text) => handleNotesChange(item.id, text)}
                  multiline
                  style={styles.notesInput}
                />
              )}

              {item.requiresImage && (
                <View style={styles.imageSection}>
                  <Button
                    mode="outlined"
                    onPress={() => handleAddImage(item.id)}
                    icon="camera">
                    Add Photo
                  </Button>
                  {/* TODO: Display added images */}
                </View>
              )}
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      <Button
        mode="contained"
        onPress={handleSaveCategory}
        style={styles.saveButton}>
        Save Category
      </Button>
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
  headerCard: {
    margin: 10,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  categoryDescription: {
    color: '#666',
  },
  itemCard: {
    margin: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    color: '#666',
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  notesInput: {
    marginTop: 10,
  },
  imageSection: {
    marginTop: 10,
  },
  saveButton: {
    margin: 10,
  },
});

export default PDICategoryScreen; 