import { useLocalSearchParams, useNavigation } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Image, useWindowDimensions } from 'react-native';
import { representacaoSet } from './representanteDados';
import { MaterialIcons, FontAwesome, Feather, Ionicons } from '@expo/vector-icons';

const COLORS = {
  CASTERINE: '#FA7D55',
  COLSON: '#EA1C2F',
  BACKGROUND: '#FFFFFF',
  TEXT: '#000000',
};
export default function DetalhesDoEstado() {
  const navigation = useNavigation()
  const { id } = useLocalSearchParams();
  const estadoDetalhes = representacaoSet.filter(estado => estado.estado_id === id);

  const casterineLogoNoWhite = require('../../assets/images/Logo-Casterine.png');
const colsonLogoNoWhite = require('../../assets/images/Logo-Colson.png');
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
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name='chevron-back-outline' size={28} color={'black'} onPress={() => navigation.goBack()}/>
              <Text style={[styles.headerText, { fontSize: responsiveFontSize(4), marginLeft: 5, marginBottom: 3}]}>{id}</Text>
              </View>
              <View style={styles.logoContainer}>
                <Image 
                  source={colsonLogoNoWhite} 
                  style={[styles.logo, { 
                    width: responsiveWidth(17), 
                    height: responsiveHeight(6) 
                  }]} 
                  resizeMode="contain" 
                />
                <View style={[styles.divider, { 
                  height: responsiveHeight(5), 
                  marginHorizontal: responsiveWidth(2) 
                }]} />
                <Image 
                  source={casterineLogoNoWhite} 
                  style={[styles.logoCasterien, { 
                    width: responsiveWidth(24), 
                    height: responsiveHeight(6) 
                  }]} 
                  resizeMode="contain" 
                />
              </View>
            </View>
      <ScrollView contentContainerStyle={{padding: 20, marginTop: 5}}>
        {estadoDetalhes.length > 0 ? (
          estadoDetalhes.map((estado, index) => (
            <View key={index} style={styles.card}>
                <Text style={styles.cardTitle}>{estado.representacao}</Text>
                <View style={{borderBottomColor: 'black', borderBottomWidth: 1.2, borderStyle: 'dashed', width: '100%', marginVertical: 5
                }} />
              <View style={styles.infoRow}>
                <Feather name="phone" size={20} color="black" />
                <Text 
                  style={styles.cardContent}
                > {estado.telefone ? estado.telefone : 'Não disponível'}
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <MaterialIcons 
                  name={estado.email ? "email" : "email"} 
                  size={20} 
                  color={estado.email ? "black" : "black"} 
                />
                <Text 
                  style={[styles.cardContent]}
                >
                  {estado.email ? estado.email : 'Não disponível'}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <FontAwesome name="exclamation-circle" size={30} color="#ccc" />
            <Text style={styles.content}>Nenhuma representação encontrada para este estado.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    flexShrink: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  cardContent: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
  },
  disabledText: {
    color: '#aaa',
  },
  content: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});