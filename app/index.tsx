import React from 'react';
import { useRouter } from 'expo-router';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  Animated, 
  StatusBar,
  Dimensions 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function LoginPage() {
  // Animação para os botões
  const router = useRouter();
  const buttonScale = new Animated.Value(1);

  const handlePressIn = (name: string) => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
    router.push(`/dashboard/${name}`);
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
       <StatusBar hidden />
      {/* Cabeçalho Premium */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image
            source={require('../assets/images/Logo-Colson.png')}
            style={[styles.logo]}
            resizeMode="contain"
          />
          <View style={styles.divider} />
          <Image
            source={require('../assets/images/Logo-Casterine.png')}
            style={[styles.logoCasterine]}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Botões com Ícones e Efeitos */}
      <View style={styles.buttonsContainer}>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={[styles.button, styles.button2]}
            onPressIn={() => handlePressIn('representante')}
            onPressOut={handlePressOut}
            activeOpacity={0.9}
          >
            <View style={styles.buttonContent}>
              <MaterialCommunityIcons name="phone-in-talk-outline" size={screenWidth * 0.15} color="white" />
              <View style={styles.textContainer}>
                <Text style={styles.buttonText}>Contato de Representante</Text>
                <Text style={styles.buttonTextLabel}>Receber contato de um representante</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={[styles.button, styles.button2]}
            onPressIn={() => handlePressIn('map')}
            onPressOut={handlePressOut}
            activeOpacity={0.9}
          >
            <View style={styles.buttonContent}>
              <Ionicons name="person-outline" size={screenWidth * 0.14} color="white" />
              <View style={styles.textContainer}>
                <Text style={styles.buttonText}>Encontrar Representante</Text>
                <Text style={styles.buttonTextLabel}>Localizar um representante na minha região</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={[styles.button, styles.button2]}
            onPressIn={() => handlePressIn('roleta')}
            onPressOut={handlePressOut}
            activeOpacity={0.9}
          >
            <View style={styles.buttonContent}>
              <Feather name="gift" size={screenWidth * 0.13} color="white" />
              <View style={styles.textContainer}>
                <Text style={styles.buttonText}>Ganhar prêmios incríveis</Text>
                <Text style={styles.buttonTextLabel}>Rode a roleta ganhe prêmios incríveis</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: screenHeight * 0.05,
  },
  button: {
    height: screenHeight * 0.12,
    borderRadius: screenWidth * 0.05,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: screenHeight * 0.015,
    paddingHorizontal: screenWidth * 0.06,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonContent: {
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: screenWidth * 0.04,
  },
  buttonText: {
    marginVertical: screenHeight * 0.003,
    color: '#FFFFFF',
    fontSize: screenWidth * 0.04,
    fontWeight: '800',
  },
  buttonTextLabel: {
    color: '#FFFFFF',
    fontSize: screenWidth * 0.025,
  },
  button1: {
    backgroundColor: '#FA7D55',
    shadowColor: '#FA7D55',
  },
  button2: {
    backgroundColor: '#EA1C2F',
    shadowColor: '#EA1C2F',
  },
  button3: {
    backgroundColor: '#2F2F10',
    shadowColor: '#2F2F10',
  },
});