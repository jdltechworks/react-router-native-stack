import React from 'react'
import { matchPath } from 'react-router-native'

const pickRoute = (children, location) => {
  let match, child
  React.Children.forEach(children, element => {
    if (!React.isValidElement(element)) return

    const { path: pathProp, exact, strict, sensitive, from } = element.props
    const path = pathProp || from

    if (match == null) {
      child = element
      match =
        path == null
          ? {}
          : matchPath(location.pathname, { path, exact, strict, sensitive })
    }
  })

  return match
    ? React.cloneElement(child, {
        location,
        computedMatch: match,
        key: child.key || location.key,
      })
    : null
}


export default pickRoute
