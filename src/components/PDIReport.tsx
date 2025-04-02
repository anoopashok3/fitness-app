import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Linking } from 'react-native';
import { Text, Card, Button, List, Divider, Portal, Modal, ActivityIndicator } from 'react-native-paper';
import { PDI_CATEGORIES } from '../constants/vehicles';
import { PDIChecklist } from '../types/vehicle';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

interface PDIReportProps {
  checklist: PDIChecklist;
  onClose: () => void;
}

const PDIReport: React.FC<PDIReportProps> = ({ checklist, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [pdfPath, setPdfPath] = useState<string | null>(null);

  const generatePDF = async () => {
    setLoading(true);
    try {
      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; }
              .header { text-align: center; margin-bottom: 20px; }
              .section { margin-bottom: 20px; }
              .item { margin-bottom: 10px; }
              .status-pass { color: green; }
              .status-fail { color: red; }
              .status-na { color: gray; }
              .contact-info { margin-top: 30px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Vehicle Pre-Delivery Inspection Report</h1>
              <p>Date: ${new Date(checklist.date).toLocaleDateString()}</p>
              <p>Inspector: ${checklist.inspector}</p>
            </div>

            <div class="section">
              <h2>Vehicle Information</h2>
              <p>Make: ${checklist.vehicle.make}</p>
              <p>Model: ${checklist.vehicle.model}</p>
              <p>Variant: ${checklist.vehicle.variant}</p>
              <p>VIN: ${checklist.vehicle.vin}</p>
              <p>Engine Number: ${checklist.vehicle.engineNumber}</p>
              <p>Color: ${checklist.vehicle.color}</p>
            </div>

            <div class="section">
              <h2>Inspection Summary</h2>
              ${checklist.items.map(item => `
                <div class="item">
                  <h3>${item.name}</h3>
                  <p>Status: <span class="status-${item.status}">${item.status.toUpperCase()}</span></p>
                  ${item.notes ? `<p>Notes: ${item.notes}</p>` : ''}
                </div>
              `).join('')}
            </div>

            <div class="contact-info">
              <h2>Contact Information</h2>
              <p>For any queries or modifications, please contact:</p>
              <p>Phone: +91 98765 43210</p>
              <p>Email: support@vehiclepdi.com</p>
            </div>
          </body>
        </html>
      `;

      const options = {
        html: htmlContent,
        fileName: `PDI_Report_${checklist.vehicle.vin}`,
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);
      setPdfPath(file.filePath);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!pdfPath) return;

    try {
      await Share.open({
        url: `file://${pdfPath}`,
        type: 'application/pdf',
        title: 'Share PDI Report',
      });
    } catch (error) {
      console.error('Error sharing PDF:', error);
    }
  };

  const handleContact = () => {
    Linking.openURL('tel:+919876543210');
  };

  return (
    <Portal>
      <Modal visible={true} onDismiss={onClose} contentContainerStyle={styles.modal}>
        <ScrollView style={styles.container}>
          <Card style={styles.section}>
            <Card.Title title="Vehicle Information" />
            <Card.Content>
              <List.Item
                title="Make"
                description={checklist.vehicle.make}
                left={props => <List.Icon {...props} icon="car" />}
              />
              <List.Item
                title="Model"
                description={checklist.vehicle.model}
                left={props => <List.Icon {...props} icon="car" />}
              />
              <List.Item
                title="VIN"
                description={checklist.vehicle.vin}
                left={props => <List.Icon {...props} icon="barcode" />}
              />
            </Card.Content>
          </Card>

          <Card style={styles.section}>
            <Card.Title title="Inspection Summary" />
            <Card.Content>
              {checklist.items.map(item => (
                <View key={item.id}>
                  <List.Item
                    title={item.name}
                    description={item.notes}
                    left={props => (
                      <List.Icon
                        {...props}
                        icon={item.status === 'pass' ? 'check-circle' : 'close-circle'}
                      />
                    )}
                  />
                  <Divider />
                </View>
              ))}
            </Card.Content>
          </Card>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={generatePDF}
              style={styles.button}
              icon="file-pdf-box"
              loading={loading}>
              Generate PDF Report
            </Button>
            {pdfPath && (
              <Button
                mode="outlined"
                onPress={handleShare}
                style={styles.button}
                icon="share">
                Share Report
              </Button>
            )}
            <Button
              mode="outlined"
              onPress={handleContact}
              style={styles.button}
              icon="phone">
              Contact Support
            </Button>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    maxHeight: '80%',
  },
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    marginBottom: 10,
  },
});

export default PDIReport; 