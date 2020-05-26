import { Animated } from 'react-native'
import React from 'react'

const StackRoutes = ({ clones }) => clones.map((clone, key) => {
  return (
  <Animated.View key={key} style={clone.styles}>
    {clone.component}
  </Animated.View>
)}
)


export default StackRoutes
