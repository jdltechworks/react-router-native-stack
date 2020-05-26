import { useEffect, useState } from 'react'
import { Animated } from 'react-native'
import { PUSH } from '../transitionTypes'
import getTransforms from '../getTransforms'
import getEasing from '../getEasing'
import getDimension from '../getDimension'
import pickRoute from '../pickRoute'

const useRouteAnimator = ({
  location,
  history,
  animationType,
  width,
  height,
  stackViewStyle,
  children,
  previousLocation,
  transition,
  setTransition,
  animatedValue,
}) => {
  const [animating, setAnimating] = useState(false)
  const [previousChildren, setPreviousChildren] = useState(null)
  const [currentChildren, setCurrentChildren] = useState(
    pickRoute(children, location),
  )
  const getRouteAnimation = index => {
    return [
      stackViewStyle,
      getTransforms(
        width,
        height,
        animatedValue,
        animationType,
        transition,
        index,
      ),
    ]
  }
  const attachRoutes = ({ prevLocation }) => {
    if (prevLocation) {
      setPreviousChildren(pickRoute(children, prevLocation))
    }
    setCurrentChildren(pickRoute(children, location))
  }

  useEffect(() => {
    const { action } = history
    if (animating && action === PUSH) {
      attachRoutes({ prevLocation: previousLocation })
    }
  }, [location])
  const animateRoute = async () => {
    const { action } = history
    // Eager loader
    await setAnimating(true)
    setTransition(action)
    animatedValue.setValue(0)
    const dimension = getDimension(animationType, width, height)

    Animated.timing(animatedValue, {
      duration: 500,
      toValue: action === PUSH ? -dimension : dimension,
      easing: getEasing(animationType),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setAnimating(false)
      }
    })
  }

  let decoratedRoutes = [
    previousChildren && {
      component: previousChildren,
      styles: getRouteAnimation(0),
    },
    currentChildren && {
      component: currentChildren,
      styles: getRouteAnimation(1),
    },
  ].filter(Boolean)
  return {
    transition,
    animatedValue,
    decoratedRoutes,
    animateRoute,
    setTransition,
  }
}

export default useRouteAnimator
