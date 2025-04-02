import { VehicleMake } from '../types/vehicle';

export const VEHICLE_MAKES: VehicleMake[] = [
  {
    id: 'maruti',
    name: 'Maruti Suzuki',
    logo: 'https://example.com/maruti-logo.png',
    models: [
      {
        id: 'swift',
        makeId: 'maruti',
        name: 'Swift',
        variants: [
          {
            id: 'swift-lxi',
            modelId: 'swift',
            name: 'LXI',
            price: 599000,
            features: ['Power Steering', 'Air Conditioning', 'Manual Transmission']
          },
          {
            id: 'swift-vxi',
            modelId: 'swift',
            name: 'VXI',
            price: 699000,
            features: ['Power Steering', 'Air Conditioning', 'Manual Transmission', 'Power Windows']
          }
        ]
      },
      {
        id: 'baleno',
        makeId: 'maruti',
        name: 'Baleno',
        variants: [
          {
            id: 'baleno-sigma',
            modelId: 'baleno',
            name: 'Sigma',
            price: 699000,
            features: ['Power Steering', 'Air Conditioning', 'Manual Transmission']
          }
        ]
      }
    ]
  },
  {
    id: 'hyundai',
    name: 'Hyundai',
    logo: 'https://example.com/hyundai-logo.png',
    models: [
      {
        id: 'i20',
        makeId: 'hyundai',
        name: 'i20',
        variants: [
          {
            id: 'i20-sportz',
            modelId: 'i20',
            name: 'Sportz',
            price: 799000,
            features: ['Power Steering', 'Air Conditioning', 'Manual Transmission', 'Power Windows']
          }
        ]
      }
    ]
  },
  {
    id: 'tata',
    name: 'Tata Motors',
    logo: 'https://example.com/tata-logo.png',
    models: [
      {
        id: 'nexon',
        makeId: 'tata',
        name: 'Nexon',
        variants: [
          {
            id: 'nexon-xm',
            modelId: 'nexon',
            name: 'XM',
            price: 799000,
            features: ['Power Steering', 'Air Conditioning', 'Manual Transmission', 'Power Windows']
          }
        ]
      }
    ]
  }
];

export const PDI_CATEGORIES = [
  {
    id: 'exterior',
    name: 'Exterior Inspection',
    description: 'Check the vehicle\'s exterior condition',
    items: [
      {
        id: 'body-panels',
        categoryId: 'exterior',
        name: 'Body Panels',
        description: 'Check for dents, scratches, or paint issues',
        isRequired: true,
        requiresImage: true,
        requiresNotes: true
      },
      {
        id: 'glass',
        categoryId: 'exterior',
        name: 'Glass and Windows',
        description: 'Check for cracks or damage',
        isRequired: true,
        requiresImage: true,
        requiresNotes: true
      }
    ]
  },
  {
    id: 'interior',
    name: 'Interior Inspection',
    description: 'Check the vehicle\'s interior condition',
    items: [
      {
        id: 'seats',
        categoryId: 'interior',
        name: 'Seats and Upholstery',
        description: 'Check for damage or stains',
        isRequired: true,
        requiresImage: true,
        requiresNotes: true
      },
      {
        id: 'dashboard',
        categoryId: 'interior',
        name: 'Dashboard and Controls',
        description: 'Check functionality of all controls',
        isRequired: true,
        requiresImage: false,
        requiresNotes: true
      }
    ]
  },
  {
    id: 'mechanical',
    name: 'Mechanical Inspection',
    description: 'Check the vehicle\'s mechanical components',
    items: [
      {
        id: 'engine',
        categoryId: 'mechanical',
        name: 'Engine',
        description: 'Check for leaks and proper operation',
        isRequired: true,
        requiresImage: true,
        requiresNotes: true
      },
      {
        id: 'brakes',
        categoryId: 'mechanical',
        name: 'Brakes',
        description: 'Check brake system operation',
        isRequired: true,
        requiresImage: false,
        requiresNotes: true
      }
    ]
  }
]; 