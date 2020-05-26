import React, { useContext, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-native'
import { StackContext } from './Stack'
import {
  TouchableOpacity,
  Text as Span,
} from 'react-native'

const StackLink = ({ to, title }) => {
  const history = useHistory()
  const { animateRoute } = useContext(StackContext)
  const navigateStack = async () => {
    history.push(to)
    animateRoute()
  }
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#333333',
        alignItems: 'center',
        padding: 10,
        width: '85%',
      }}
      onPress={() => navigateStack()}>
      <Span style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
        {title}
      </Span>
    </TouchableOpacity>
  )
}


export default StackLink
