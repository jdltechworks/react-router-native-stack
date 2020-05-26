import { PUSH, POP } from './transitionTypes';
import { SLIDE_HORIZONTAL, SLIDE_VERTICAL, FADE_VERTICAL, CUBE } from './animationTypes';
import { slideHorizontal, slideVertical } from './transformConditions'

export default (
  width,
  height,
  animation,
  animationType,
  transitionType,
  screenIndex
) => {
  switch(animationType) {
    case SLIDE_HORIZONTAL: {
      return slideHorizontal(transitionType, screenIndex, width, animation)
    }
    case SLIDE_VERTICAL: {
      return slideVertical(transitionType, screenIndex, width, animation)
    }
    default: return null
  }
}
