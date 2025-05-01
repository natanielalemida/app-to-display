import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  Animated, 
  StatusBar,
  Dimensions,
  TextInput,
  Modal,
  Alert
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function LoginPage() {
  const router = useRouter();
  const buttonScale = new Animated.Value(1);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [lastCheckedTime, setLastCheckedTime] = useState(new Date());

  const generatePassword = () => {
    const now = new Date();
    const offsetBrasilia = -3; // UTC-3
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const dateBrasilia = new Date(utc + (3600000 * offsetBrasilia));
    
    const day = dateBrasilia.getDate();
    const month = dateBrasilia.getMonth() + 1; // Meses são 0-indexados
    const year = dateBrasilia.getFullYear();
    const hours = dateBrasilia.getHours();
    
    const rawPassword = day * month * year * hours;
    return String(rawPassword).substring(0, 4);
};

  // Check password periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getHours() !== lastCheckedTime.getHours()) {
        setIsAuthenticated(false);
        setCurrentPassword(generatePassword());
      }
      setLastCheckedTime(now);
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [lastCheckedTime]);

  // Set initial password
  useEffect(() => {
    setCurrentPassword(generatePassword());
  }, []);

  const handleLogin = () => {
    if (password === currentPassword) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      Alert.alert('Erro', 'Senha incorreta');
    }
  };

  const handlePressIn = (name: string) => {
    if (!isAuthenticated) return;
    
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

  if (!isAuthenticated) {
    return (
      <View style={styles.authContainer}>
        <StatusBar hidden />
        <Image
          source={require('../assets/images/Logo-Colson.png')}
          style={styles.authLogo}
          resizeMode="contain"
        />
        <Text style={styles.authTitle}>Acesso Restrito</Text>
        <TextInput
          style={styles.passwordInput}
          placeholder="Digite a senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={handleLogin}
          autoFocus
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Acessar</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  authLogo: {
    width: screenWidth * 0.5,
    height: screenHeight * 0.15,
    marginBottom: 30,
  },
  authTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#EA1C2F',
  },
  passwordInput: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#EA1C2F',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#EA1C2F',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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