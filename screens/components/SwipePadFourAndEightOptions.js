import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Polygon, Svg, Circle } from "react-native-svg";

export default function SwipePadFourAndEightOptions(props) {
  const circleRadius = props.circleRadiusOuter; // Radius of the circle
  const cx = circleRadius; // Center x-coordinate
  const cy = circleRadius; // Center y-coordinate
  const numTriangles = 8; // Number of triangles
  const extensionFactor = 1.5; // Extend triangle base 10% beyond the circle
  // Generate triangle points for each triangle
  const triangles = Array.from({ length: numTriangles }).map((_, index) => {
    // if (index == 0) {
    //   console.log("There is a 0");
    // }
    const angle = (index * 360) / numTriangles; // Divide circle into 8 parts
    const rad = (Math.PI / 180) * angle; // Convert to radians

    // Extended base points beyond the circle
    const base1X = cx + circleRadius * extensionFactor * Math.cos(rad);
    const base1Y = cy + circleRadius * extensionFactor * Math.sin(rad);

    const base2X =
      cx +
      circleRadius *
        extensionFactor *
        Math.cos(rad + Math.PI / (numTriangles / 2)); // x degrees in radians
    const base2Y =
      cy +
      circleRadius *
        extensionFactor *
        Math.sin(rad + Math.PI / (numTriangles / 2));

    // Apex point in the center
    const apexX = cx;
    const apexY = cy;

    // Create points string for Polygon
    return `${apexX},${apexY} ${base1X},${base1Y} ${base2X},${base2Y}`;
  });

  // Dynamic Styles
  const styleVwOuter = {
    width: props.circleRadiusOuter * 2,
    height: props.circleRadiusOuter * 2,
    borderRadius: props.circleRadiusOuter,
    backgroundColor: "rgba(70,130,180,.4)",
    overflow: "hidden",
  };

  const styleTopTopLeftTriangle = {
    position: "absolute",
    top: -(props.circleRadiusOuter * (Math.sqrt(2) - 1)) / 2,
    left: props.circleRadiusOuter / 2,
    transform: [{ rotate: "-45deg" }],
    // backgroundColor: props.swipeColorDict["toptop"],
    backgroundColor: "transparent",
  };
  const styleTopTopRightTriangle = {
    position: "absolute",
    top: -(props.circleRadiusOuter * (Math.sqrt(2) - 1)) / 2,
    left: props.circleRadiusOuter / 2,
    transform: [{ rotate: "135deg" }],
    // backgroundColor: props.swipeColorDict["toptop"],
    backgroundColor: "transparent",
  };
  const styleRightRightTopTriangle = {
    position: "absolute",
    top: props.circleRadiusOuter / 2,
    right: -(props.circleRadiusOuter * (Math.sqrt(2) - 1)) / 2, // <--- Key Algo: This places the corner of a rotated in the middle of the parent square.
    // backgroundColor: props.swipeColorDict["rightright"],
    backgroundColor: "transparent",
    transform: [{ rotate: "45deg" }],
  };

  const styleBottomBottomTriangle = {
    position: "absolute",
    top:
      props.circleRadiusOuter +
      (props.circleRadiusOuter * (Math.sqrt(2) - 1)) / 2,
    left: props.circleRadiusOuter / 2,
    transform: [{ rotate: "-45deg" }],
    backgroundColor: props.swipeColorDict["bottombottom"],
  };
  const styleLeftLeftTriangle = {
    position: "absolute",
    top: props.circleRadiusOuter / 2,
    left: -(props.circleRadiusOuter * (Math.sqrt(2) - 1)) / 2, // <--- Key Algo: This places the corner of a rotated in the middle of the parent square.
    backgroundColor: props.swipeColorDict["leftleft"],
    transform: [{ rotate: "45deg" }],
    // zIndex: 1,
  };
  // ------ Middle Circle ------
  const styleVwMiddleCircle = {
    position: "absolute",
    width: props.circleRadiusMiddle * 2,
    height: props.circleRadiusMiddle * 2,
    // top: props.circleRadiusOuter / 2,
    // left: props.circleRadiusOuter / 2,
    top: props.circleRadiusOuter - props.circleRadiusMiddle,
    left: props.circleRadiusOuter - props.circleRadiusMiddle,
    borderRadius: props.circleRadiusMiddle,
    backgroundColor: "rgba(70,130,180,.4)",
    overflow: "hidden",
  };
  const styleCircleInner = {
    position: "absolute",
    top: props.circleRadiusMiddle - props.circleRadiusInner,
    left: props.circleRadiusMiddle - props.circleRadiusInner,
    height: props.circleRadiusInner * 2,
    width: props.circleRadiusInner * 2,
    // zIndex: 3,
  };
  const styleTopTriangle = {
    position: "absolute",
    top: -(props.circleRadiusMiddle * (Math.sqrt(2) - 1)) / 2,
    left: props.circleRadiusMiddle / 2,
    transform: [{ rotate: "-45deg" }],
    backgroundColor: props.swipeColorDict["top"],
  };
  const styleRightTriangle = {
    position: "absolute",
    top: props.circleRadiusMiddle / 2,
    right: -(props.circleRadiusMiddle * (Math.sqrt(2) - 1)) / 2, // <--- Key Algo: This places the corner of a rotated in the middle of the parent square.
    backgroundColor: props.swipeColorDict["right"],
    transform: [{ rotate: "45deg" }],
  };
  const styleBottomTriangle = {
    position: "absolute",
    top:
      props.circleRadiusMiddle +
      (props.circleRadiusMiddle * (Math.sqrt(2) - 1)) / 2,
    left: props.circleRadiusMiddle / 2,
    transform: [{ rotate: "-45deg" }],
    backgroundColor: props.swipeColorDict["bottom"],
  };
  const styleLeftTriangle = {
    position: "absolute",
    top: props.circleRadiusMiddle / 2,
    left: -(props.circleRadiusMiddle * (Math.sqrt(2) - 1)) / 2, // <--- Key Algo: This places the corner of a rotated in the middle of the parent square.
    backgroundColor: props.swipeColorDict["left"],
    transform: [{ rotate: "45deg" }],
    // zIndex: 1,
  };

  return (
    <View style={[props.styleVwMainPosition, styleVwOuter]}>
      <Svg height={circleRadius * 2} width={circleRadius * 2}>
        {triangles.map((points, index) => (
          <Polygon
            key={index}
            points={points}
            fill={props.swipeColorDict[index + 1]} // 50% transparent blue
            stroke="black" // Stroke color
            strokeWidth="2" // Thickness of the stroke
          />
        ))}
      </Svg>
      {/* <Svg
        height={`${props.circleRadiusOuter}`}
        width={`${props.circleRadiusOuter}`}
        style={styleTopTopLeftTriangle}
      >
        <Polygon
          points={`0,0 0,${props.circleRadiusOuter} ${props.circleRadiusOuter},0`}
          fill={props.swipeColorDict["toptopleft"]}
        />
      </Svg>
      <Svg
        height={`${props.circleRadiusOuter}`}
        width={`${props.circleRadiusOuter}`}
        style={styleTopTopRightTriangle}
      >
        <Polygon
          points={`0,0 0,${props.circleRadiusOuter} ${props.circleRadiusOuter},0`}
          fill={props.swipeColorDict["toptopright"]}
        />
      </Svg>
      <Svg
        height={`${props.circleRadiusOuter}`}
        width={`${props.circleRadiusOuter}`}
        style={styleRightRightTopTriangle}
      >
        <Polygon
          points={`0,0 0,${props.circleRadiusOuter} ${props.circleRadiusOuter},0`}
          fill={props.swipeColorDict["rightrighttop"]}
        />
      </Svg>
      <Svg
        height={`${props.circleRadiusOuter}`}
        width={`${props.circleRadiusOuter}`}
        style={styleBottomBottomTriangle}
      >
        <Polygon
          points={`0,0 0,${props.circleRadiusOuter} ${props.circleRadiusOuter},${props.circleRadiusOuter}`}
          fill={"transparent"}
        />
      </Svg>
      <Svg
        height={`${props.circleRadiusOuter}`}
        width={`${props.circleRadiusOuter}`}
        style={styleLeftLeftTriangle}
      >
        <Polygon
          points={`0,0 0,${props.circleRadiusOuter} ${props.circleRadiusOuter},${props.circleRadiusOuter}`}
          fill={"transparent"}
        />
      </Svg> */}

      {/* ---- Middle Circle ---- */}
      <View style={styleVwMiddleCircle}>
        <Svg
          height={`${props.circleRadiusMiddle}`}
          width={`${props.circleRadiusMiddle}`}
          style={styleTopTriangle}
        >
          <Polygon
            points={`0,0 0,${props.circleRadiusMiddle} ${props.circleRadiusMiddle},${props.circleRadiusMiddle}`}
            fill={"transparent"}
          />
        </Svg>
        <Svg
          height={`${props.circleRadiusMiddle}`}
          width={`${props.circleRadiusMiddle}`}
          style={styleRightTriangle}
        >
          <Polygon
            points={`0,0 0,${props.circleRadiusMiddle} ${props.circleRadiusMiddle},${props.circleRadiusMiddle}`}
            fill={"transparent"}
          />
        </Svg>
        <Svg
          height={`${props.circleRadiusMiddle}`}
          width={`${props.circleRadiusMiddle}`}
          style={styleBottomTriangle}
        >
          <Polygon
            points={`0,0 0,${props.circleRadiusMiddle} ${props.circleRadiusMiddle},${props.circleRadiusMiddle}`}
            fill={"transparent"}
          />
        </Svg>
        <Svg
          height={`${props.circleRadiusMiddle}`}
          width={`${props.circleRadiusMiddle}`}
          style={styleLeftTriangle}
        >
          <Polygon
            points={`0,0 0,${props.circleRadiusMiddle} ${props.circleRadiusMiddle},${props.circleRadiusMiddle}`}
            fill={"transparent"}
          />
        </Svg>
        {/* ---- Inner circle ---- */}
        <Svg
          height={props.circleRadiusInner * 2}
          width={props.circleRadiusInner * 2}
          style={styleCircleInner}
        >
          <Circle
            cx={props.circleRadiusInner} // Centering horizontally (x coords w/ respect to parent <Svg/>)
            cy={props.circleRadiusInner} // Centering vertically (y coords w/ respect to parent <Svg/>)
            r={props.circleRadiusInner}
            // stroke="black"
            // strokeWidth="1"
            fill={props.swipeColorDict["center"]}
          />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     backgroundColor: "#f5f5f5",
  //   },
  //   tapArea: {
  //     width: "80%",
  //     height: "80%",
  //     // width: Dimensions.get("window").width,
  //     // height: Dimensions.get("window").height,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     backgroundColor: "#ddd",
  //     borderRadius: 10,
  //   },
  //   tapText: {
  //     fontSize: 16,
  //     color: "#333",
  //   },
  //   vwRegisterTaps: {
  //     position: "absolute",
  //     top: 0,
  //     right: 0,
  //     // width: 100,
  //     // height: 100,
  //     // backgroundColor: "tan",
  //     padding: 3,
  //     borderRadius: 5,
  //   },
  //   // ---- MOdal ---
  //   modalOverlay: {
  //     flex: 1,
  //     // backgroundColor: "rgba(0, 0, 0, 0.5)",
  //   },
  //   modalContent: {
  //     alignItems: "center",
  //     position: "absolute",
  //     // backgroundColor: "purple",
  //   },
  //   txtAction: {
  //     backgroundColor: "gray",
  //     alignSelf: "center",
  //     margin: 1,
  //   },
});
