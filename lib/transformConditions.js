import { PUSH, POP } from './transitionTypes';



export const slideHorizontal = (transitionType, screenIndex, width, animation) => {

  const baseStyle = {
    elevation: 1,
    transform: [{ translateX: animation }],
  };

  if (transitionType === PUSH && screenIndex === 1) {
    return {
      left: width,
      right: -width,
      ...baseStyle,
    };
  } else if (transitionType === POP && screenIndex === 1) {
    return baseStyle;
  }

  return null;
}


export const slideVertical = (transitionType, screenIndex, width, animation) => {
  const baseStyle = {
    elevation: 1,
    transform: [{ translateY: animation }],
  };
  if (transitionType === PUSH && screenIndex === 1) {
    return {
      top: height,
      bottom: -height,
      ...baseStyle,
    };
  } else if (transitionType === POP && screenIndex === 1) {
    return baseStyle;
  }

  return null;
}
