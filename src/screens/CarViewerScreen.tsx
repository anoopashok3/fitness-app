import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import CarViewer from '../components/CarViewer';

// This is a sample URL. You'll need to replace it with actual 3D model URLs for different cars
const SAMPLE_CAR_MODEL = 'https://example.com/models/car.glb';

const CarViewerScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CarViewer
        modelUrl={SAMPLE_CAR_MODEL}
        carName="Maruti Suzuki Swift"
        manufacturer="Maruti Suzuki"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default CarViewerScreen; 