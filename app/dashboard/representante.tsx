import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

// Cores e assets
const COLORS = {
  CASTERINE: '#FA7D55',
  COLSON: '#EA1C2F',
  BACKGROUND: '#FFFFFF',
  TEXT: '#0F191E'
};

// Supondo que você tenha esses assets
const casterineLogo = require('../../assets/images/Logo-Casterine.png');
const colsonLogo = require('../../assets/images/Logo-Colson.png');

export default function Representante() {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Header com botão de voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.TEXT} />
        </TouchableOpacity>
      </View>

      {/* Logos das empresas */}
      <View style={styles.logoContainer}>
        <Image 
          source={casterineLogo} 
          style={[styles.logo, { tintColor: COLORS.CASTERINE }]} 
          resizeMode="contain"
        />
        <View style={styles.divider} />
        <Image 
          source={colsonLogo} 
          style={[styles.logo, { tintColor: COLORS.COLSON }]} 
          resizeMode="contain"
        />
      </View>

      {/* QR Code */}
      <View style={styles.qrContainer}>
        <Text style={styles.qrTitle}>Aponte sua câmera</Text>
        <Text style={styles.qrSubtitle}>para acessar nosso site</Text>
        
        <View style={styles.qrCodeWrapper}>
          <QRCode
            value="https://www.google.com"
            size={200}
            color={COLORS.TEXT}
            backgroundColor={COLORS.BACKGROUND}
            logoSize={60}
            logoMargin={10}
            logoBorderRadius={10}
          />
        </View>
        
        <Text style={styles.qrHelp}>Ou visite: www.google.com</Text>
      </View>

      {/* Rodapé minimalista */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2023 Casterine & Colson</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
    alignSelf: 'flex-start',
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  logo: {
    width: 120,
    height: 60,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 20,
  },
  qrContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  qrTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.TEXT,
    marginBottom: 8,
  },
  qrSubtitle: {
    fontSize: 16,
    color: COLORS.TEXT,
    opacity: 0.7,
    marginBottom: 30,
  },
  qrCodeWrapper: {
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 30,
  },
  qrHelp: {
    fontSize: 14,
    color: COLORS.TEXT,
    opacity: 0.6,
    marginTop: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: COLORS.TEXT,
    opacity: 0.5,
  },
});