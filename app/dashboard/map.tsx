import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  useWindowDimensions,
  Image,
  TouchableOpacity,
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
      <View style={[styles.header, { 
        height: responsiveHeight(10),
        paddingHorizontal: responsiveWidth(5),
        shadowOffset: {
          width: 0,
          height: responsiveHeight(0.2),
        },
        shadowRadius: responsiveWidth(1),
        elevation: responsiveWidth(3.75),
      }]}>
        <Text style={[styles.headerText, { fontSize: responsiveFontSize(4) }]}>Representantes</Text>
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
    justifyContent: "space-between",
    backgroundColor: 'white',
    alignItems: "center",
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.BACKGROUND,
    shadowColor: "#000",
    shadowOpacity: 0.25,
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
  },
  logo: {},
  logoCasterien: {},
  divider: {
    width: 1,
    backgroundColor: '#E0E0E0',
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