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
      pointerEvents="box-none"
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
              <G key={idx} onPress={() => handlePress(estado.id)} pointerEvents="box-only">
              <Path
                key={idx}
                d={pathD}
                stroke="#FFF"
                 pointerEvents="auto"
                strokeWidth={2.1404}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={estado.defaultColor}
                onPress={() => handlePress(estado.id)}
              />
              </G>
            ))
          ) : (
            <G key={estado.id} onPress={() => handlePress(estado.id)} pointerEvents="box-only">
            <Path
              d={estado.d}
               pointerEvents="auto"
              stroke="#FFF"
              strokeWidth={1.0404}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={estado.defaultColor}
              onPress={() => handlePress(estado.name)}
            />
            </G>
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