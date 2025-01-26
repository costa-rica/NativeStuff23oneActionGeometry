import { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import ViewTemplate from "../screens_core/components/ViewTemplate";
import ButtonKv from "../screens_core/components/ButtonKv";
import SwipePadGeoFunc03 from "./components/SwipePadGeoFunc03";

export default function Test11({ navigation }) {
  const [padVisible, setPadVisible] = useState(false);
  const [padPositionCenter, setPadPositionCenter] = useState({ x: 0, y: 0 });
  const [actionList, setActionList] = useState([]);
  const [tapDetails, setTapDetails] = useState(null);
  const [tapIsActive, setTapIsActive] = useState(true);
  const [currentActionType, setCurrentActionType] = useState(null);

  const circleRadiusMiddle = 50;
  const circleRadiusInner = 25; // this can change no problem
  const circleRadiusOuter = 175; // this needs to be twice the circleRadiusMiddle
  const numTrianglesMiddle = 5;
  const numTrianglesOuter = 10;

  const defaultColors = {
    1: "rgba(125, 150, 100, 0.5)", // right
    2: "rgba(150, 100, 125, 0.25)", // bottom
    3: "rgba(150, 100, 125, 0.25)", // bottombottomleft
    4: "rgba(125, 100, 150, 0.25)",
    5: "rgba(150, 100, 125, 0.25)", // bottombottomleft
    6: "rgba(125, 100, 150, 0.25)",
    7: "rgba(150, 100, 125, 0.25)", // bottombottomleft
    8: "rgba(125, 100, 150, 0.25)",
    9: "rgba(150, 100, 125, 0.25)", // bottombottomleft
    10: "rgba(125, 100, 150, 0.25)",
    11: "rgba(150, 100, 125, 0.25)", // bottombottomleft
    12: "rgba(125, 100, 150, 0.25)",
    13: "rgba(150, 100, 125, 0.25)", // bottombottomleft
    14: "rgba(125, 100, 150, 0.25)",
    15: "rgba(150, 100, 125, 0.25)", // bottombottomleft
    16: "rgba(125, 100, 150, 0.25)",
    center: "gray",
  };
  const [swipeColorDict, setSwipeColorDict] = useState(defaultColors);

  const calculateDistanceFromCenter = (swipePosX, swipePosY) => {
    return Math.sqrt(
      Math.pow(swipePosX - tapDetails.padPosCenterX, 2) +
        Math.pow(swipePosY - tapDetails.padPosCenterY, 2)
    );
  };

  const addAction = (direction) => {
    if (direction === null) return;
    if (actionList?.length > 0) {
      setActionList([...actionList, direction]);
    } else {
      setActionList([direction]);
    }
  };

  // Function to temporarily change color
  const handleSwipeColorChange = (direction, outerDirection = false) => {
    setSwipeColorDict(defaultColors);
    const brightColors = {
      1: "rgba(255, 255, 175, 1)", // right
      2: "rgba(255, 175, 255, 1)", //bottom
      3: "rgba(255, 200, 225, 1)", //bottombottomleft
      4: "rgba(255, 175, 255, 1)",
      5: "rgba(255, 200, 225, 1)", //bottombottomleft
      6: "rgba(255, 175, 255, 1)",
      7: "rgba(255, 200, 225, 1)", //bottombottomleft
      8: "rgba(255, 175, 255, 1)",
      9: "rgba(255, 200, 225, 1)", //bottombottomleft
      10: "rgba(255, 175, 255, 1)",
      11: "rgba(255, 200, 225, 1)", //bottombottomleft
      12: "rgba(255, 175, 255, 1)",
      13: "rgba(255, 200, 225, 1)", //bottombottomleft
      14: "rgba(255, 175, 255, 1)",
      15: "rgba(255, 200, 225, 1)", //bottombottomleft
      16: "rgba(255, 175, 255, 1)",
      center: "white",
    };

    if (!outerDirection) {
      setSwipeColorDict((prevColors) => ({
        ...prevColors,
        [direction]: brightColors[direction],
      }));
    } else {
      setSwipeColorDict((prevColors) => ({
        ...prevColors,
        [direction]: brightColors[direction],
        [outerDirection]: brightColors[outerDirection],
      }));
    }
  };

  const calculatePadPositionCenter = (x, y) => {
    const centeredX = x - circleRadiusOuter;
    const centeredY = y - circleRadiusOuter;
    return { x: centeredX, y: centeredY };
  };

  const gestureTapBegin = Gesture.Tap().onBegin((event) => {
    if (tapIsActive) {
      const timestamp = new Date().toISOString();
      const { x, y, absoluteX, absoluteY } = event;

      setPadPositionCenter({
        x: calculatePadPositionCenter(x, y).x,
        y: calculatePadPositionCenter(x, y).y,
      });
      setPadVisible(true);
      setTapDetails({
        timestamp,
        padPosCenterX: calculatePadPositionCenter(x, y).x,
        padPosCenterY: calculatePadPositionCenter(x, y).y,
      });
      setTapIsActive(false);
      handleSwipeColorChange("center");
    }
  });
  const gestureTapOnEnd = Gesture.Tap()
    .maxDuration(2000)
    .onEnd((event) => {
      console.log("- tap on end");
      const { x, y, absoluteX, absoluteY } = event;

      const swipePosX = calculatePadPositionCenter(x, y).x;
      const swipePosY = calculatePadPositionCenter(x, y).y;

      const distanceFromCenter = Math.sqrt(
        Math.pow(swipePosX - tapDetails.padPosCenterX, 2) +
          Math.pow(swipePosY - tapDetails.padPosCenterY, 2)
      );

      if (distanceFromCenter < circleRadiusInner) {
        // setPadVisible(false);
        setTapIsActive(true);
      }
    });

  const gestureSwipeOnChange = Gesture.Pan().onChange((event) => {
    const { x, y, translationX, translationY, absoluteX, absoluteY } = event;

    const swipePosX = calculatePadPositionCenter(x, y).x;
    const swipePosY = calculatePadPositionCenter(x, y).y;

    const distanceFromCenter = calculateDistanceFromCenter(
      swipePosX,
      swipePosY
    );

    const relativeToPadCenterX = swipePosX - tapDetails.padPosCenterX;
    const relativeToPadCenterY = swipePosY - tapDetails.padPosCenterY;

    const inInnerCircle = distanceFromCenter < circleRadiusInner;

    // Y dependent
    const boundary15Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 15); // ? parts to circle, 15 degrees
    const boundary21Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 21); // ? parts to circle, 15 degrees
    const boundary30Y =
      relativeToPadCenterX * Math.tan((Math.PI / 180) * (360 / 12)); // 12 parts to circle
    const boundary45Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 45); // 8 parts to circle 45 = 360/8
    const boundary60Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 60); // ? 60 degrees
    const boundary72Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 72); // 5 parts to circle 72 = 360/5
    // 5 circle rotated -15 degrees ==> 72-15 = 57
    const boundary50Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 50); // ? 60 degrees
    const boundary57Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 57); // ? 60 degrees

    // X dependent
    const boundary15X =
      relativeToPadCenterY * (1 / Math.tan((Math.PI / 180) * 15));
    const boundary30X =
      relativeToPadCenterY * (1 / Math.tan((Math.PI / 180) * 30));
    const boundary39X =
      relativeToPadCenterY * (1 / Math.tan((Math.PI / 180) * 39));
    const boundary45X =
      relativeToPadCenterY * (1 / Math.tan((Math.PI / 180) * 45));
    const boundary57X =
      relativeToPadCenterY * (1 / Math.tan((Math.PI / 180) * 57));
    const boundary60X =
      relativeToPadCenterY * (1 / Math.tan((Math.PI / 180) * 60));
    const boundary75X =
      relativeToPadCenterY * (1 / Math.tan((Math.PI / 180) * 75));
    const boundary129X =
      relativeToPadCenterY * (1 / Math.tan((Math.PI / 180) * 129));

    if (inInnerCircle) {
      handleSwipeColorChange("center");
      setCurrentActionType(null);
    } else {
      // console.log(`relativeToPadCenterX: ${relativeToPadCenterX}`);
      // console.log(
      //   `,b50: ${boundary50Y},b15: ${boundary15Y}, when y: ${relativeToPadCenterY}`
      // );
      console.log(
        `b39X: ${boundary39X},b57X: ${boundary57X}, b60X: ${boundary60X}, b129X: ${boundary129X}  when x: ${relativeToPadCenterX}`
      );

      if (
        relativeToPadCenterY > -boundary15Y &&
        relativeToPadCenterY < boundary57Y
      ) {
        // Right (bottom) side
        handleSwipeColorChange(1);
        setCurrentActionType(1);

        if (relativeToPadCenterY < boundary21Y) {
          handleSwipeColorChange(1, 6);
          setCurrentActionType(6);
        } else {
          handleSwipeColorChange(1, 7);
          setCurrentActionType(7);
        }
      } else if (Math.abs(relativeToPadCenterX) < boundary57X) {
        // Bottom left
        handleSwipeColorChange(2);
        setCurrentActionType(2);
        if (relativeToPadCenterX > 0) {
          handleSwipeColorChange(2, 8);
          setCurrentActionType(8);
        } else {
          handleSwipeColorChange(2, 9);
          setCurrentActionType(9);
        }
      } else if (
        relativeToPadCenterY < Math.abs(boundary50Y) &&
        relativeToPadCenterY > boundary15Y
      ) {
        // LEFT
        handleSwipeColorChange(3);
        setCurrentActionType(3);
        if (relativeToPadCenterY > Math.abs(boundary15Y)) {
          handleSwipeColorChange(3, 10);
          setCurrentActionType(10);
        } else {
          handleSwipeColorChange(3, 11);
          setCurrentActionType(11);
        }
      }
      // NOTE: This part is not complete --> it has turned into a bit of guess an check because we are alternative the dependent variabeles for the boundaries
      else if (relativeToPadCenterY > Math.abs(boundary15Y)) {
        handleSwipeColorChange(4);
        setCurrentActionType(4);
      }
      //  else if (relativeToPadCenterY > Math.abs(boundary45Y)) {
      //   // Bottom
      //   handleSwipeColorChange(2);
      //   setCurrentActionType(2);

      //   if (relativeToPadCenterX > boundary75X) {
      //     handleSwipeColorChange(2, 7);
      //     setCurrentActionType(7);
      //   } else if (Math.abs(relativeToPadCenterX) < boundary75X) {
      //     handleSwipeColorChange(2, 8);
      //     setCurrentActionType(8);
      //   } else {
      //     handleSwipeColorChange(2, 9);
      //     setCurrentActionType(9);
      //   }
      // } else if (relativeToPadCenterY > boundary45Y) {
      //   // Left
      //   handleSwipeColorChange(3);
      //   setCurrentActionType(3);

      //   if (relativeToPadCenterY > Math.abs(boundary15Y)) {
      //     // setSwipeColorDict(defaultColors);
      //     handleSwipeColorChange(3, 10);
      //     setCurrentActionType(10);
      //   } else if (relativeToPadCenterY > boundary15Y) {
      //     // setSwipeColorDict(defaultColors);
      //     handleSwipeColorChange(3, 11);
      //     setCurrentActionType(11);
      //   } else {
      //     handleSwipeColorChange(3, 12);
      //     setCurrentActionType(12);
      //   }
      // } else if (relativeToPadCenterY < boundary45Y) {
      //   // Top
      //   handleSwipeColorChange(4);
      //   setCurrentActionType(4);

      //   if (relativeToPadCenterX < boundary75X) {
      //     handleSwipeColorChange(4, 13);
      //     setCurrentActionType(13);
      //   } else if (relativeToPadCenterX < Math.abs(boundary75X)) {
      //     handleSwipeColorChange(4, 14);
      //     setCurrentActionType(14);
      //   } else {
      //     handleSwipeColorChange(4, 15);
      //     setCurrentActionType(15);
      //   }
      // }
      else {
        // handleSwipeColorChange(4);
        // setCurrentActionType(4);
        setSwipeColorDict(defaultColors);
      }
    }
  });

  const gestureSwipeOnEnd = Gesture.Pan().onEnd((event) => {
    const { x, y, translationX, translationY, absoluteX, absoluteY } = event;

    const swipePosX = calculatePadPositionCenter(x, y).x;
    const swipePosY = calculatePadPositionCenter(x, y).y;

    const distanceFromCenter = Math.sqrt(
      Math.pow(swipePosX - tapDetails.padPosCenterX, 2) +
        Math.pow(swipePosY - tapDetails.padPosCenterY, 2)
    );

    if (distanceFromCenter > circleRadiusInner) {
      addAction(currentActionType);
    }
    setPadVisible(false);
    setTapIsActive(true);
  });

  // Combine swipe and tap gestures
  const combinedGestures = Gesture.Simultaneous(
    gestureTapBegin,
    gestureTapOnEnd,
    gestureSwipeOnEnd,
    gestureSwipeOnChange
  );

  // Dynamic Styles
  const styleVwMainPosition = {
    position: "absolute",
    left: padPositionCenter.x, // Center modal horizontally
    top: padPositionCenter.y, // Center modal vertically
  };

  return (
    <ViewTemplate navigation={navigation}>
      <GestureHandlerRootView style={styles.container}>
        <GestureDetector gesture={combinedGestures}>
          <View style={styles.tapArea}>
            <View style={styles.vwRegisterTaps}>
              {tapDetails && (
                <View>
                  <Text>Time: {tapDetails.timestamp}</Text>
                  <Text>
                    Coordinates: X:{tapDetails.padPosCenterX}, Y:
                    {tapDetails.padPosCenterY}
                  </Text>
                </View>
              )}
              {actionList.length > 0 &&
                actionList.map((elem, index) => {
                  return (
                    <View key={index}>
                      <Text style={styles.txtAction}>Action: {elem}</Text>
                    </View>
                  );
                })}
            </View>
            <Text style={styles.tapText}>Tap anywhere inside this view</Text>

            {padVisible && (
              <SwipePadGeoFunc03
                circleRadiusInner={circleRadiusInner}
                circleRadiusMiddle={circleRadiusMiddle}
                styleVwMainPosition={styleVwMainPosition}
                swipeColorDict={swipeColorDict}
                circleRadiusOuter={circleRadiusOuter}
                numTrianglesMiddle={numTrianglesMiddle}
                numTrianglesOuter={numTrianglesOuter}
              />
            )}
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
      <View
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          width: Dimensions.get("window").width,
          alignItems: "flex-end",
          // padding: 20,
        }}
      >
        <ButtonKv
          colorBackground={"blue"}
          width={150}
          onPress={() => setActionList([])}
        >
          Send Action
        </ButtonKv>
      </View>
    </ViewTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  tapArea: {
    width: "80%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 10,
  },
  tapText: {
    fontSize: 16,
    color: "#333",
  },
  vwRegisterTaps: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 3,
    borderRadius: 5,
  },
  // ---- MOdal ---
  modalOverlay: {
    flex: 1,
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    alignItems: "center",
    position: "absolute",
    // backgroundColor: "purple",
  },
  txtAction: {
    backgroundColor: "gray",
    alignSelf: "center",
    margin: 1,
  },
});
