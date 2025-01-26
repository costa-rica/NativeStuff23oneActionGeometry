# React Native Stuff 23 One Action Geometry

## Description

React Native app using gestures and svg with logic using geometry to implement visual boundaries and gesture boundaries

## Installations

### 1. Navigation

```
yarn add @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
```

### 2. Gesture

`react-native-gesture-handler`

### 3. svg

`react-native-svg`

## Key geometric formulas used

- From center of circle (origin/ (0,0)) a line of 0 degrees is equal to `y = 0` given any x
- General formula to calculate the y value given any x and the degrees from the center origin you wan to extend the line `y_value = x_value × tan((π / 180) × degrees)`
  - For boundaries of 30 degrees I used `y_value = x_value × tan((π / 180) × degrees)`
- General formula to calculate the x value given any y and the degrees from the center origin you wan to extend the line `x_value = y_value / tan((π / 180) × degrees)`
  - For boundaries of 30 degrees I used `y_value = x_value / tan((π / 180) × degrees)`

## Screens / Prototypes

### Test09.js (Prototype 4-8)

- wheel used SwipePadGeoFunc01.js
- This version uses geometric functions logic

- uses SwipePadGeoFunc01.js

#### Configure of SwipePadGeoFunc01

- styleVwMiddleCircle is transformed `transform: [{ rotate: "-45deg" }],`

### Test10.js (Prototype 4-12)

- wheel used SwipePadGeoFunc02.js
- This version uses geometric functions logic

- 4 sectors in the middle circle
- 12 sectors in the outer circle
- boundaries on gesture align with visual boundaries.

#### Key geometric transformations and formulas

- style outer circle: `transform: [{ rotate: "-15deg" }],`
- style middle circel: `transform: [{ rotate: "-30deg" }],`
- boundaries for gesture limits

  - `const boundary15Y = relativeToPadCenterX _ Math.tan((Math.PI / 180) _ 15);`
  - `const boundary45Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 45); // 8 parts to circle 45 = 360/8`

  - Used in determining top boundaries: `const boundary75X = relativeToPadCenterY * (1 / Math.tan((Math.PI / 180) * 75));`

### Test11.js (Prototype 5-10)

- This version alternated between using X and Y as the dependent variable for the boundaries
- It ends up being a bit of guess and check
- This version uses geometric functions logic
- 5 sectors in the middle circle
- 10 sectors in the outer circle
- boundaries on gesture align with visual boundaries.

### Test12.js (Prototype 5-10)

This version will try to start with one boundary on the right an use the axis to determine all the following boundaries based on the expected degress calcualtions

## Geometry / JavaScript SVG Background and Calculations

To identify the boundaries it helps to understand the gemoetry of the circle an how to calculate it

- see Test12.js for implementation and guides.

### Help determining boundary with a visual guide

- once the center of the circle is found you can draw a line based on any of the 360 degrees a circle is composed of
- Get the x point on a circle perimeter on X degrees:
  `radius_of_circle + radius_of_circle * Math.cos((Math.PI/180) * x_degrees))`
- Get the y point on a circle perimeter on X degrees:
  `radius_of_circle + radius_of_circle * Math.sin((Math.PI/180) * x_degrees))`

Implement that in the SVG below once the Svg is super-imposed on the circle so that

```js
<Svg
  height={circleRadiusOuter * 2}
  width={circleRadiusOuter * 2}
  style={styleSvgBoundary}
>
  <Polygon
    points={`${circleRadiusOuter},${circleRadiusOuter} ${
      circleRadiusOuter + circleRadiusOuter * Math.cos((Math.PI / 180) * 345)
    },${
      circleRadiusOuter + circleRadiusOuter * Math.sin((Math.PI / 180) * 345)
    }`}
    stroke="black" // Stroke color
    strokeWidth="2" // Thickness of the stroke
  />
</Svg>
```

### Boundary implementation

- use tangent
- to determine the Y value of any x along the boundary you'll need the slope
- use this formula:
  `const boundary_x_degrees_where_y_coord_is_dependent_variable = relativeToPadCenterX * Math.tan((Math.PI / 180) * x_degrees); `
  - where `relativeToPadCenterX` is any x value in the circle.
  - the result (i.e. `boundary_x_degrees_where_y_coord_is_dependent_variable`) is the corresponding y coordinates of any x along the line that satisfies the x_degrees.
