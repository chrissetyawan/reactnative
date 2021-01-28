import * as React from 'react'
import PropTypes from 'prop-types'
import colorHelper from 'tinycolor2'
import { useTheme } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export const Button = ({
  text,
  color,
  style,
  iconName,
  disabled,
  textProps,
  iconPosition,
  ...restProps
}) => {
  const theme = useTheme()

  const backgroundColor = !disabled
    ? Object.prototype.hasOwnProperty.call(theme.colors, color)
      ? theme.colors[color]
      : color
    : '#CCC'

  const textColor = colorHelper(backgroundColor).isLight()
    ? theme.colors.text
    : theme.colors.textLight

  const renderIcon = () => (!iconName ? null : <Icon size={18} color={textColor} name={iconName} />)

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      disabled={disabled}
      {...restProps}
      style={[
        styles.touchable,
        {
          backgroundColor,
        },
        style,
      ]}>
      {iconPosition === 'start' && renderIcon()}
      <Text
        style={{
          color: textColor,
          [`margin${iconPosition === 'start' ? 'Right' : 'Left'}`]: !iconName ? 0 : 8,
        }}
        {...textProps}>
        {text}
      </Text>
      {iconPosition === 'end' && renderIcon()}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  touchable: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

Button.propTypes = {
  ...TouchableOpacity.propTypes,
  text: PropTypes.string,
  textProps: PropTypes.shape(Text.propTypes),
  color: PropTypes.string,
  iconName: PropTypes.string,
  iconPosition: PropTypes.oneOf(['start', 'end']),
}

Button.defaultProps = {
  text: '',
  textProps: {},
  color: 'primary',
  iconName: null,
  iconPosition: 'end',
  disabled: false,
}

export default Button
