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

const casterineLogo = require('../../assets/images/Logo-Casterine.png');
const colsonLogo = require('../../assets/images/Logo-Colson.png');

export default function Representante() {
  const navigation = useNavigation();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { width, height } = useWindowDimensions();
  const screen = Dimensions.get('screen');

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
      <View style={[styles.header, { height: responsiveHeight(10) }]}>
        <Text style={[styles.headerText, { fontSize: responsiveFontSize(4) }]}>Contato</Text>
        <View style={styles.logoContainer}>
          <Image 
            source={colsonLogo} 
            style={[styles.logo, { 
              width: responsiveWidth(18), 
              height: responsiveHeight(6) 
            }]} 
            resizeMode="contain" 
          />
          <View style={[styles.divider, { 
            height: responsiveHeight(5), 
            marginHorizontal: responsiveWidth(5) 
          }]} />
          <Image 
            source={casterineLogo} 
            style={[styles.logoCasterien, { 
              width: responsiveWidth(25), 
              height: responsiveHeight(6) 
            }]} 
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
          padding: responsiveWidth(3),
          borderRadius: responsiveWidth(50),
        }]} 
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="home-outline" size={responsiveFontSize(4.2)} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    backgroundColor: COLORS.BACKGROUND,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,
  },
  headerText: {
    fontFamily: 'RedHatText-Variable',
    fontWeight: '700',
    color: COLORS.TEXT,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
  },
  logo: {},
  logoCasterien: {},
  divider: {
    width: 1,
    backgroundColor: '#E0E0E0',
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