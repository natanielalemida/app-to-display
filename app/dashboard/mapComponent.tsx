import * as React from "react";
import { useWindowDimensions } from "react-native";
import Svg, { G, Path, Text } from "react-native-svg";
import { estado } from "./brasil";
import { useRouter } from "expo-router";

function SvgComponent(props: any) {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const svgWidth = width * 1.1; 
  const svgHeight = (svgWidth * 460) / 450; 

  const handlePress = (estadoId: string) => {
    console.log('chegou aqui', estadoId)
    router.push({
      pathname: "/dashboard/[id]",
      params: { id: estadoId },
    });
  }

  return (
    <Svg
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
  onPressIn={() => handlePress(estado.name)}
/>

            ))
          ) : (
            <Path
              d={estado.d}
               pointerEvents="auto"
              stroke="#FFF"
              strokeWidth={1.0404}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={estado.defaultColor}
              onPressIn={() => handlePress(estado.name)}
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