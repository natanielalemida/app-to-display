import * as React from "react";
import { useWindowDimensions } from "react-native";
import Svg, { G, Path, Text } from "react-native-svg";
import { estado } from "./brasil";
import { useRouter } from "expo-router";

function SvgComponent(props: any) {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  // Defina um tamanho proporcional baseado na largura da tela
  const svgWidth = width * 1.1; // 90% da largura da tela
  const svgHeight = (svgWidth * 460) / 450; // Mantém a proporção original

  const handlePress = (estadoId: string) => {
    console.log('chgou aqui', estadoId)
    router.push({
      pathname: "/dashboard/[id]",
      params: { id: estadoId },
    });
  }

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={svgWidth}
      height={svgHeight}
      viewBox="0 0 450 440"
      xmlSpace="preserve"
      {...props}
    >
      {estado.map((estado) => (
        <G key={estado.id} className="estado">
          {Array.isArray(estado.d) ? (
            estado.d.map((pathD, idx) => (
              <Path
                key={idx}
                d={pathD}
                stroke="#FFF"
                strokeWidth={2.1404}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={estado.defaultColor}
                onPress={() => handlePress(estado.id)}
              />
            ))
          ) : (
            <Path
              d={estado.d}
              stroke="#FFF"
              strokeWidth={1.0404}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={estado.defaultColor}
              onPress={() => handlePress(estado.name)}
            />
          )}

          <Text
            transform={`translate(${estado.position.x} ${estado.position.y})`}
            fill="#FFF"
          >
            {estado.id}
          </Text>
        </G>
      ))}
    </Svg>
  );
}

export default SvgComponent;