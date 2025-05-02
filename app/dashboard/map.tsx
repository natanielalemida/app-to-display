import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Svg from "react-native-svg";
import SvgComponent from "./mapComponent";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const COLORS = {
  CASTERINE: '#FA7D55',
  COLSON: '#EA1C2F',
  BACKGROUND: '#FFFFFF',
  TEXT: '#000000',
};


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function Map() {
   const navigation = useNavigation();
  const casterineLogo = require('../../assets/images/Logo-Casterine.png');
  const colsonLogo = require('../../assets/images/Logo-Colson.png');
  const { width, height } = useWindowDimensions();
  const responsiveWidth = (percentage) => (width * percentage) / 100;
  const responsiveHeight = (percentage) => (height * percentage) / 100;
  const responsiveFontSize = (percentage) => Math.min(width, height) * percentage / 100;

  return (
    <View style={styles.container}>
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

      <Animated.View style={[styles.svgContainer, {
        width: responsiveWidth(100),
        height: responsiveHeight(60),
      }]}>
        <Svg width={responsiveWidth(100)} height={responsiveHeight(60)} viewBox="0 0 500 500">
          <SvgComponent />
        </Svg>
      </Animated.View>
      <View style={{ marginBottom: responsiveHeight(15) }}>
        <Text style={[styles.text, { fontSize: responsiveFontSize(4) }]}>Buscar Representante</Text>
        <Text style={[styles.subtext, { fontSize: responsiveFontSize(2) }]}>
        Clique no estado desejado no mapa para localizar o representante disponível em sua região.
        </Text>
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
    justifyContent: "space-between",
    backgroundColor: 'white',
    alignItems: "center",
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
  homeButton: {
    position: 'absolute',
    backgroundColor: COLORS.COLSON,
    elevation: 6,
  },
  svgContainer: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginLeft: 20
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 3,
  },
  subtext: {
    textAlign: "center",
  },
});