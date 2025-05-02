import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, useWindowDimensions, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import * as Font from 'expo-font';

// Cores e assets
const COLORS = {
  CASTERINE: '#FA7D55',
  COLSON: '#EA1C2F',
  BACKGROUND: '#FFFFFF',
  TEXT: '#000000',
};


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const casterineLogo = require('../../assets/images/Logo-Casterine.png');
const colsonLogo = require('../../assets/images/Logo-Colson.png');

export default function Representante() {
  const navigation = useNavigation();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'RedHatText-Variable': require('../../assets/fonts/RedHatText-VariableFont_wght.ttf'),
      });
      setFontsLoaded(true);
    }
    
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <View />;
  }

  // Funções para calcular dimensões responsivas
  const responsiveWidth = (percentage) => (width * percentage) / 100;
  const responsiveHeight = (percentage) => (height * percentage) / 100;
  const responsiveFontSize = (percentage) => Math.min(width, height) * percentage / 100;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
              <View style={styles.logoRow}>
                <Image
                  source={colsonLogo}
                  style={[styles.logo]}
                  resizeMode="contain"
                />
                <View style={styles.divider} />
                <Image
                  source={casterineLogo}
                  style={[styles.logoCasterine]}
                  resizeMode="contain"
                />
              </View>
            </View>

      {/* Conteúdo */}
      <View style={[styles.content, { padding: responsiveWidth(4) }]}>
        <Text style={[styles.title, { fontSize: responsiveFontSize(10.5) }]}>
          Receber contato de representante
        </Text>
        <Text style={[styles.subtitle, { 
          fontSize: responsiveFontSize(3), 
          marginBottom: responsiveHeight(5) 
        }]}>
          Use o QR code abaixo para solicitar o contato de um representante.
        </Text>

        <View style={[styles.qrCodeWrapper, { 
          padding: responsiveWidth(2.5), 
          borderRadius: responsiveWidth(4) 
        }]}>
          <QRCode
            value="https://docs.google.com/forms/d/e/1FAIpQLSeEQnnogVAgVYoWPQ_ieWtIts0-gA_WuuV3g7ee4tHkT842dg/viewform?usp=send_form"
            size={responsiveWidth(55)}
            color={COLORS.TEXT}
            backgroundColor={COLORS.BACKGROUND}
            logoBackgroundColor="transparent"
          />
        </View>
      </View>

      {/* Botão home flutuante */}
      <TouchableOpacity 
        style={[styles.homeButton, { 
          right: responsiveWidth(5), 
          bottom: responsiveHeight(6), 
          padding: responsiveWidth(4),
          borderRadius: responsiveWidth(50),
        }]} 
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="home-outline" size={responsiveFontSize(6.2)} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: screenWidth * 0.06,
    paddingTop: screenHeight * 0.02,
  },
  header: {
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: screenWidth * 0.25,
    height: screenHeight * 0.08,
  },
  logoCasterine: {
    width: screenWidth * 0.4,
    height: screenHeight * 0.1,
  },
  divider: {
    width: 1,
    height: screenHeight * 0.05,
    backgroundColor: '#919396',
    marginHorizontal: screenWidth * 0.05,
    opacity: 0.5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: '10%',
  },
  title: {
    fontFamily: 'RedHatText-Variable',
    fontWeight: '700', 
    color: COLORS.TEXT,
    textAlign: 'left',
    marginBottom: '2%',
  },
  subtitle: {
    fontFamily: 'RedHatText-Variable',
    color: COLORS.TEXT,
    textAlign: 'center',
  },
  qrCodeWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFF',
  },
  homeButton: {
    position: 'absolute',
    backgroundColor: COLORS.COLSON,
    elevation: 6,
  },
});