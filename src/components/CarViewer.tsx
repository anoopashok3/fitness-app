import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { ModelViewer } from 'react-native-3d-model-viewer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface CarViewerProps {
  modelUrl: string;
  carName: string;
  manufacturer: string;
}

const CarViewer: React.FC<CarViewerProps> = ({ modelUrl, carName, manufacturer }) => {
  const rotation = useSharedValue(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleRotation = (event: any) => {
    rotation.value = withSpring(event.nativeEvent.rotation);
  };


  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${rotation.value}deg` }],
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.carName}>{carName}</Text>
        <Text style={styles.manufacturer}>{manufacturer}</Text>
      </View>
      
      <View style={styles.modelContainer}>
        <ModelViewer
          source={{ uri: modelUrl }}
          style={styles.model}
          autoPlay
          cameraControls
          onLoad={() => setIsLoading(false)}
          onError={(error) => console.error('Model loading error:', error)}
        />
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => rotation.value = withSpring(rotation.value - 90)}
        >
          <Text style={styles.controlButtonText}>←</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => rotation.value = withSpring(rotation.value + 90)}
        >
          <Text style={styles.controlButtonText}>→</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  carName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  manufacturer: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  modelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  model: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CarViewer; 