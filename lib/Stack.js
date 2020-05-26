import React, { useState, createContext,  useRef } from 'react'
import { Animated, useWindowDimensions, View, ViewPropTypes } from 'react-native'
import { node, object, bool, string, func } from 'prop-types'
import { withRouter } from 'react-router-native'
import { SLIDE_HORIZONTAL } from './animationTypes'
import styles from './styles'
import useRouteAnimator from './hooks/useRouteAnimator'
import usePanResponder from './hooks/usePanResponder'
import usePrevious from './utils/usePrevious'

import StackAnimator from './StackAnimator'

export const StackContext = createContext()

const Stack = ({
  children,
  history,
  location,
  animationType,
  gestureEnabled,
  isAnimating,
}) => {
  const { width, height } = useWindowDimensions()
  const [transition, setTransition] = useState(null)
  const animatedValue = useRef(new Animated.Value(0)).current

  const previousLocation = usePrevious(location)

  const {
    decoratedRoutes,
    animateRoute,
  } = useRouteAnimator({
    location,
    history,
    animationType,
    width,
    height,
    stackViewStyle: styles.stackView,
    children,
    previousLocation,
    transition,
    setTransition,
    animatedValue,
  })

  const panResponder = usePanResponder({
    history,
    animatedValue,
    animationType,
    previousLocation,
    gestureEnabled,
    width,
    height,
    setTransition,
  })

  return (
    <StackContext.Provider value={{ animateRoute, setTransition }}>
      <View
        style={styles.transitionContainer}
        {...panResponder.panHandlers}>
        <StackAnimator clones={decoratedRoutes} />
      </View>
    </StackContext.Provider>
  )
}

Stack.defaultProps = {
  animationType: SLIDE_HORIZONTAL,
  gestureEnabled: true,
  isAnimating: () => null,
}

Stack.propTypes = {
  children: node,
  history: object,
  location: object,
  animationType: string,
  gestureEnabled: bool,
  stackViewStyle: ViewPropTypes.style,
  isAnimating: func,
}

export default withRouter(Stack)
