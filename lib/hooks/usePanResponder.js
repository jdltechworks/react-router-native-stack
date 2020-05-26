import { Animated, PanResponder } from 'react-native'
import getDimension from '../getDimension'

const ANIMATION_DURATION = 500
const POSITION_THRESHOLD = 1 / 2

isHorizontal = animationType =>
  animationType.indexOf('horizontal') > -1 || animationType === 'cube'

const usePanResponder = ({
  history,
  animatedValue,
  animationType,
  previousLocation,
  gestureEnabled,
  width,
  height,
  setTransition,
}) => {
  const dimension = getDimension(animationType, width, height)

  const cancelNavigation = (duration) => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        history.push(previousLocation.pathname)
      }
    })
  }

  const finishNavigation = (duration) => {
    Animated.timing(animatedValue, {
      toValue: dimension,
      duration,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        // setTransition(history.action)
      }
    })
  }
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder(event, gesture) {
      return (
        gestureEnabled &&
        isHorizontal(animationType) && history.canGo(-1)
      )
    },
    onPanResponderGrant(event, { moveX }) {
      history.goBack()
      setTransition(history.action)
    },
    onPanResponderMove(event, { moveX }) {
      animatedValue.setValue(moveX)
    },
    onPanResponderRelease(event, { dx, vx }) {
      const defaultVelocity = dimension / ANIMATION_DURATION
      const velocity = Math.max(Math.abs(vx), defaultVelocity)
      const resetDuration = dx / velocity;
      const goBackDuration = (dimension - dx) / velocity

      // first check velocity to decide whether to cancel or not
      if (vx < -0.5) {
        cancelNavigation(resetDuration)
      }

      if (vx > 0.5) {
        finishNavigation(goBackDuration)
      }

      if (dx / dimension < POSITION_THRESHOLD) {
        cancelNavigation(resetDuration);
      } else {
        finishNavigation(goBackDuration);
      }
    },
  })
  return panResponder
}

export default usePanResponder
