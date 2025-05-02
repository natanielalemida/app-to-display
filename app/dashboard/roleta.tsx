import React, { useRef, useState } from 'react';
import {
	View,
	TouchableOpacity,
	StyleSheet,
	Animated,
	Easing,
	Text as RNText,
	Dimensions,
	Image,
} from 'react-native';
import Svg, {
	G,
	Path,
	Image as SvgImage,
	Text as SvgText,
  TSpan,
} from 'react-native-svg';
import {
	Feather,
	MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Cores e assets
const COLORS = {
	CASTERINE: '#EA1C2F',
	COLSON: '#FA7D55',
	BACKGROUND: '#FFFFFF',
	TEXT: 'black',
	NEUTRAL: '#919396',
};

// Assets
const casterineLogo = require('../../assets/images/Logo-Casterine-branco.png');
const colsonLogo = require('../../assets/images/Logo-Colson-branco.png');


const casterineLogoNoWhite = require('../../assets/images/Logo-Casterine.png');
const colsonLogoNoWhite = require('../../assets/images/Logo-Colson.png');

const sectors = [
	{
		type: 'logo',
		content: casterineLogo,
		color:  COLORS.COLSON,
		textColor: '#FFFFFF',
	},
	{
		type: 'text',
		content: 'NÃO FOI DESSA VEZ',
		color: COLORS.NEUTRAL,
		textColor: '#FFFFFF',
	},
	{
		type: 'logo',
		content: colsonLogo,
		color:  COLORS.CASTERINE,
		textColor: '#FFFFFF',
	},
	{
		type: 'text',
		content: 'NÃO FOI DESSA VEZ',
		color: COLORS.NEUTRAL,
		textColor: '#FFFFFF',
	},
	{
		type: 'logo',
		content: casterineLogo,
		color: COLORS.COLSON,
		textColor: '#FFFFFF',
	},
	{
		type: 'text',
		content: 'NÃO FOI DESSA VEZ',
		color: COLORS.NEUTRAL,
		textColor: '#FFFFFF',
	},
	{
		type: 'logo',
		content: colsonLogo,
		color:  COLORS.CASTERINE,
		textColor: '#FFFFFF',
	},
	{
		type: 'text',
		content: 'NÃO FOI DESSA VEZ',
		color: COLORS.NEUTRAL,
		textColor: '#FFFFFF',
	},
];

const { width, height } = Dimensions.get('window');
const WHEEL_SIZE = Math.min(width * 0.9, height * 0.7);
const CENTER = WHEEL_SIZE / 2;
const RADIUS = CENTER - 10;
const anglePerSector = 360 / sectors.length;

export default function Roleta() {
	const navigation = useNavigation();
	const rotation = useRef(new Animated.Value(0)).current;
	const [result, setResult] = useState<{ type: string; content: any } | null>(
		null
	);
	const [isSpinning, setIsSpinning] = useState(false);

	const rotateInterpolation = rotation.interpolate({
		inputRange: [0, 360],
		outputRange: ['0deg', '360deg'],
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
			const sectorIndex =
				Math.floor(((360 - finalAngle + 90) % 360) / anglePerSector) %
				sectors.length;
			setResult(sectors[sectorIndex]);
		});
	};

	const renderSectorContent = (index: number) => {
		const sector = sectors[index];
		const centerAngle =
			((index * anglePerSector + anglePerSector / 2) * Math.PI) / 180;
		const contentRadius = RADIUS * 0.65;

		if (sector.type === 'logo') {
			const isCasterineLogo = sector.content === casterineLogo;

			const logoWidth = isCasterineLogo ? WHEEL_SIZE * 0.25 : WHEEL_SIZE * 0.18;
			const logoHeight = isCasterineLogo ? WHEEL_SIZE * 0.11 : WHEEL_SIZE * 0.09;
			const x = CENTER + contentRadius * Math.cos(centerAngle) - logoWidth / 2;
			const y = CENTER + contentRadius * Math.sin(centerAngle) - logoHeight / 2;

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
	fontSize={WHEEL_SIZE * 0.03}
	fontWeight="bold"
	textAnchor="middle"
>
	<TSpan x={x} dy="-0.5em">NÃO FOI</TSpan>
	<TSpan x={x} dy="1em">DESSA VEZ</TSpan>
</SvgText>


			);
		}
	};

	return (
		<View style={styles.container}>
			{!result && !isSpinning && (
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => navigation.goBack()}
				>
					<Feather name="x" size={20} color={COLORS.TEXT} />
				</TouchableOpacity>
			)}

			<RNText></RNText>

			{result && (
				<View style={[styles.resultContainer]}>
					{result.type === 'logo' ? (
						<>
							<RNText style={styles.titleAfter}>VOCÊ GANHOU!</RNText>
							<RNText style={styles.titleLabel}>
								Retire seu brinde com a nossa equipe. Obrigado por participar!
							</RNText>
						</>
					) : (
						<>
							<RNText style={styles.titleAfter}>NÃO FOI DESSA VEZ!</RNText>
							<RNText style={styles.titleLabel}>
								Parece que não foi dessa vez. Obrigado por participar!
							</RNText>
						</>
					)}

					<View style={styles.resultContainerButton}>
						<TouchableOpacity
							style={[styles.spinButton]}
							onPress={spinWheel}
							disabled={isSpinning}
						>
							<RNText style={styles.spinButtonText}>Nova Jogada</RNText>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.backMenuButton]}
							onPress={() => navigation.goBack()}
							disabled={isSpinning}
						>
							<RNText
								style={[styles.spinButtonText, { color: COLORS.CASTERINE }]}
							>
								Voltar para o início
							</RNText>
						</TouchableOpacity>
					</View>
				</View>
			)}

			{!result && (
				<View style={styles.wheelContainer}>
					<Animated.View
						style={{ transform: [{ rotate: rotateInterpolation }] }}
					>
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
									const x1 =
										CENTER + RADIUS * Math.cos((Math.PI * angle) / 180);
									const y1 =
										CENTER + RADIUS * Math.sin((Math.PI * angle) / 180);

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
			)}
			{!result && !isSpinning && (
				<TouchableOpacity
					style={[styles.spinButton]}
					onPress={spinWheel}
					disabled={isSpinning}
				>
					<MaterialCommunityIcons
						name="rotate-3d-variant"
						size={24}
						color="white"
						style={{ marginLeft: 10 }}
					/>
					<RNText style={styles.spinButtonText}>Girar Roleta</RNText>
				</TouchableOpacity>
			)}
			<View style={styles.logoContainer}>
				<Image source={colsonLogoNoWhite} style={styles.logo} resizeMode="contain" />
				<View style={styles.divider} />
				<Image
					source={casterineLogoNoWhite}
					style={styles.logoCasterien}
					resizeMode="contain"
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: height * 0.05,
		padding: width * 0.04,
		paddingBottom: height * 0.03,
	},
	backButton: {
		position: 'absolute',
		top: height * 0.05,
		right: width * 0.05,
		padding: 3,
		borderRadius: 0.5,
		borderColor: '#E0E0E0',
		borderWidth: 1,
		zIndex: 10,
	},
	title: {
		fontSize: width * 0.12,
		fontWeight: '800',
		color: COLORS.TEXT,
		textAlign: 'center',
		marginBottom: height * 0.02,
	},
	titleAfter: {
		fontSize: width * 0.1,
		fontWeight: '800',
		color: COLORS.TEXT,
		textAlign: 'center',
		marginBottom: height * 0.02,
	},
	titleLabel: {
		fontSize: width * 0.035,
		color: COLORS.TEXT,
		textAlign: 'center',
		marginHorizontal: width * 0.1,
	},
	wheelContainer: {
		position: 'relative',
		marginBottom: height * 0.04,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: width * 0.03 },
		shadowOpacity: 0.25,
		shadowRadius: width * 0.05,
		elevation: 10,
		borderRadius: WHEEL_SIZE / 2,
		backgroundColor: 'white',
	},
	pointer: {
		position: 'absolute',
		top: -width * 0.04,
		left: '50%',
		width: 0,
		height: 0,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderLeftWidth: width * 0.04,
		borderRightWidth: width * 0.04,
		borderTopWidth: width * 0.04,
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		borderTopColor: 'black',
		marginLeft: -width * 0.04,
		zIndex: 10,
	},
	spinButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.CASTERINE,
		paddingHorizontal: width * 0.1,
		paddingVertical: height * 0.02,
		borderRadius: 8,
		marginBottom: height * 0.02,
		width: width * 0.8,
	},
	spinButtonText: {
		marginHorizontal: width * 0.02,
		color: 'white',
		fontSize: width * 0.04,
		fontWeight: 'bold',
	},
	logoContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: height * 0.02,
	},
	logo: {
		width: width * 0.2,
		height: width * 0.14,
	},
	logoCasterien: {
		width: width * 0.28,
		height: width * 0.14,
	},
	divider: {
		width: 1,
		height: width * 0.1,
		backgroundColor: '#E0E0E0',
		marginHorizontal: width * 0.04,
	},
	backMenuButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		borderColor: COLORS.CASTERINE,
		borderWidth: 1,
		paddingHorizontal: width * 0.1,
		paddingVertical: height * 0.02,
		borderRadius: 8,
		marginBottom: height * 0.02,
		width: width * 0.8,
	},
	resultContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '90%',
	},
	resultContainerButton: {
		marginVertical: height * 0.03,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
});