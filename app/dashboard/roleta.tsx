import React, { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Text as RNText,
  Dimensions,
  Image
} from "react-native";
import Svg, { G, Path, Image as SvgImage, Text as SvgText } from "react-native-svg";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Cores e assets
const COLORS = {
  CASTERINE: '#EA1C2F',
  COLSON: '#FA7D55', 
  BACKGROUND: '#FFFFFF',
  TEXT: '#0F191E',
  NEUTRAL: '#919396'
};

// Assets
const casterineLogo = require('../../assets/images/Logo-Casterine.png');
const colsonLogo = require('../../assets/images/Logo-Colson.png');

const sectors = [
  { type: "logo", content: casterineLogo, color: COLORS.CASTERINE, textColor: '#FFFFFF' },
  { type: "text", content: "Não foi dessa vez", color: COLORS.NEUTRAL, textColor: '#FFFFFF' },
  { type: "logo", content: colsonLogo, color: COLORS.COLSON, textColor: '#FFFFFF' },
  { type: "text", content: "Não foi dessa vez", color: COLORS.NEUTRAL, textColor: '#FFFFFF' },
  { type: "logo", content: casterineLogo, color: COLORS.CASTERINE, textColor: '#FFFFFF' },
  { type: "text", content: "Não foi dessa vez", color: COLORS.NEUTRAL, textColor: '#FFFFFF' },
  { type: "logo", content: colsonLogo, color: COLORS.COLSON, textColor: '#FFFFFF' },
  { type: "text", content: "Não foi dessa vez", color: COLORS.NEUTRAL, textColor: '#FFFFFF' }
];

const { width } = Dimensions.get('window');
const WHEEL_SIZE = Math.min(width * 0.9, 400);
const CENTER = WHEEL_SIZE / 2;
const RADIUS = CENTER - 10;
const anglePerSector = 360 / sectors.length;

export default function Roleta() {
  const navigation = useNavigation();
  const rotation = useRef(new Animated.Value(0)).current;
  const [result, setResult] = useState<{type: string, content: any} | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  const createPath = (startAngle: number, endAngle: number) => {
    const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
    const x1 = CENTER + RADIUS * Math.cos((Math.PI * startAngle) / 180);
    const y1 = CENTER + RADIUS * Math.sin((Math.PI * startAngle) / 180);
    const x2 = CENTER + RADIUS * Math.cos((Math.PI * endAngle) / 180);
    const y2 = CENTER + RADIUS * Math.sin((Math.PI * endAngle) / 180);

    return `M${CENTER},${CENTER} L${x1},${y1} A${RADIUS},${RADIUS} 0 ${largeArc},1 ${x2},${y2} Z`;
  };

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setShowThankYou(false);
    const extraSpins = 5;
    const randomAngle = Math.floor(Math.random() * 360);
    const spinValue = extraSpins * 360 + randomAngle;
  
    rotation.setValue(0);
    setResult(null);
  
    Animated.timing(rotation, {
      toValue: spinValue,
      duration: 5000,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start(() => {
      setIsSpinning(false);
      const finalAngle = spinValue % 360;
      const sectorIndex = Math.floor(((360 - finalAngle + 90) % 360) / anglePerSector) % sectors.length;
      setResult(sectors[sectorIndex]);
      setTimeout(() => setShowThankYou(true), 1500);
    });
  };
  
  const renderSectorContent = (index: number) => {
    const sector = sectors[index];
    const centerAngle = (index * anglePerSector + anglePerSector / 2) * Math.PI / 180;
    const contentRadius = RADIUS * 0.65;
  
    if (sector.type === "logo") {
      const logoWidth = 70;
      const logoHeight = 35;
      const x = CENTER + contentRadius * Math.cos(centerAngle) - logoWidth/2;
      const y = CENTER + contentRadius * Math.sin(centerAngle) - logoHeight/2;
      
      return (
        <SvgImage
          href={sector.content}
          x={x}
          y={y}
          width={logoWidth}
          height={logoHeight}
          preserveAspectRatio="xMidYMid meet"
        />
      );
    } else {
      const x = CENTER + contentRadius * Math.cos(centerAngle);
      const y = CENTER + contentRadius * Math.sin(centerAngle);
      
      return (
        <SvgText
          x={x}
          y={y}
          fill={sector.textColor}
          fontSize="14"
          fontWeight="bold"
          textAnchor="middle"
        >
          {sector.content}
        </SvgText>
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={24} color={COLORS.TEXT} />
      </TouchableOpacity>
      
      <RNText style={styles.title}>Roleta de Prêmios</RNText>
      
      <View style={styles.wheelContainer}>
        <Animated.View style={{ transform: [{ rotate: rotateInterpolation }] }}>
          <Svg width={WHEEL_SIZE} height={WHEEL_SIZE}>
            <G origin={`${CENTER},${CENTER}`}>
              {sectors.map((sector, index) => {
                const startAngle = index * anglePerSector;
                const endAngle = startAngle + anglePerSector;
                const path = createPath(startAngle, endAngle);
                
                return (
                  <G key={index}>
                    <Path 
                      d={path} 
                      fill={sector.color}
                      stroke="#FFF"
                      strokeWidth={2}
                    />
                    {renderSectorContent(index)}
                  </G>
                );
              })}
              
              {/* Linhas divisórias */}
              {sectors.map((_, index) => {
                const angle = index * anglePerSector;
                const x1 = CENTER + RADIUS * Math.cos((Math.PI * angle) / 180);
                const y1 = CENTER + RADIUS * Math.sin((Math.PI * angle) / 180);
                
                return (
                  <Path
                    key={`divider-${index}`}
                    d={`M${CENTER},${CENTER} L${x1},${y1}`}
                    stroke="#FFFFFF"
                    strokeWidth={3}
                  />
                );
              })}
            </G>
          </Svg>
        </Animated.View>

        <View style={styles.pointer} />
      </View>

      <TouchableOpacity 
        style={[styles.spinButton, isSpinning && styles.disabledButton]}
        onPress={spinWheel}
        disabled={isSpinning}
      >
        <RNText style={styles.spinButtonText}>
          {isSpinning ? "Girando..." : "Girar Roleta"}
        </RNText>
        <MaterialIcons 
          name={isSpinning ? "autorenew" : "play-arrow"} 
          size={24} 
          color="white" 
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>

      {result && (
        <View style={[
          styles.resultContainer,
          result.type === "logo" ? styles.logoResult : styles.textResult
        ]}>
          {result.type === "logo" ? (
            <Image 
              source={result.content} 
              style={styles.resultLogo} 
              resizeMode="contain"
            />
          ) : (
            <RNText style={styles.resultText}>{result.content}</RNText>
          )}
        </View>
      )}

      {showThankYou && (
        <View style={styles.thankYouContainer}>
          <RNText style={styles.thankYouText}>
            Agradecemos sua visita em nosso estande!
          </RNText>
          <RNText style={styles.thankYouSubtext}>Boa feira!</RNText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white', // Fundo mais suave
        alignItems: "center",
        paddingTop: 30, // Mais espaço no topo
        paddingHorizontal: 16, // Padding lateral
      },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '800', // Mais negrito
    color: COLORS.TEXT,
    marginBottom: 30,
    textAlign: 'center',
    textTransform: 'uppercase', // Tudo em maiúsculas
    letterSpacing: 1.2, // Espaçamento entre letras
    textShadowColor: 'rgba(0,0,0,0.1)', // Sombra sutil
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  wheelContainer: {
    position: 'relative',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
    borderRadius: WHEEL_SIZE/2, // Garante que a sombra siga o formato circular
    backgroundColor: 'white', // Necessário para a sombra funcionar corretamente
  },
  centerPin: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -16,
    marginTop: -16,
    zIndex: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  pointer: {
    position: 'absolute',
    top: -20,
    left: '50%',
    marginLeft: -20,
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderColor: COLORS.COLSON,
    borderWidth: 4,
    borderRadius: 20,
    zIndex: 10,
    transform: [{ rotate: '45deg' }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  spinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.COLSON,
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 30,
    marginBottom: 18,
    shadowColor: COLORS.COLSON,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    minWidth: 220,
    // Efeito de gradiente (simulado)
    borderWidth: 2,
    borderColor: '#FF9A7D', // Cor mais clara para borda
  },
  spinButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  disabledButton: {
    opacity: 0.7,
  },
  resultContainer: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    padding: 25,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: '90%', // Largura maior
  },
  logoResult: {
    backgroundColor: COLORS.BACKGROUND,
  },
  textResult: {
    backgroundColor: COLORS.NEUTRAL,
  },
  resultLogo: {
    width: 180,
    height: 80,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  thankYouContainer: {
    backgroundColor: COLORS.CASTERINE,
    padding: 10,
    borderRadius: 15,
    width: '90%',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  thankYouText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  thankYouSubtext: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});