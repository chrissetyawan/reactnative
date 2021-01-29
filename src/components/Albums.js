import * as React from 'react'
import Button from './Button'
import PropTypes from 'prop-types'
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@react-navigation/native'

export const AlbumItem = ({ data, onViewPress, ...restProps }) => {
  const { title } = data

  return (
    <View>
      <Text ellipsizeMode="tail" numberOfLines={2} style={styles.item.title}>
        {title}
      </Text>
      <View style={styles.item.container} {...restProps}>
        <Image style={styles.item.thumbnail} source={{ uri: data.photos[0].thumbnailUrl }} />
        <View style={styles.item.content}>
          {!!data.user && (
            <View style={styles.item.description}>
              <Text style={styles.item.descriptionText}>Album Owner: {data.user.name}</Text>
              <Text style={styles.item.descriptionText}>Email: {data.user.email}</Text>
              <Text style={styles.item.descriptionText}>Website: {data.user.website}</Text>
            </View>
          )}
          <Button text="View Album" style={styles.item.button} onPress={event => onViewPress(data, event)} />
        </View>
      </View>
    </View>
  )
}

export const Albums = ({ items, onItemViewPress, isLoading, ...restProps }) => {
  const theme = useTheme()

  return (
    <FlatList
      data={items}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.albums.container}
      renderItem={({ item }) => <AlbumItem data={item} onViewPress={onItemViewPress} />}
      ListFooterComponent={() => {
        return isLoading ? <ActivityIndicator size="large" color={theme.colors.primary} /> : null
      }}
      {...restProps}
    />
  )
}

const styles = {
  albums: StyleSheet.create({
    container: {
      paddingHorizontal: 12,
    },
  }),
  item: StyleSheet.create({
    container: {
      marginBottom: 20,
      paddingBottom: 20,
      flexDirection: 'row',
      alignItems: 'flex-start',
      borderBottomColor: '#CCC',
      borderBottomWidth: 1,
    },
    thumbnail: {
      height: 140,
      width: 140,
      borderRadius: 8,
      backgroundColor: '#CCC',
    },
    content: {
      flex: 1,
      paddingLeft: 16,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingVertical: 5,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      textTransform: 'capitalize',
      paddingBottom: 20,
      color: '#525252'
    },
    description: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    descriptionText: {
      fontSize: 15,
      marginBottom: 4,
      color: '#676767'
    },
    button: {
      width: '100%',
      paddingVertical: 10,
      color: '#fff',
      backgroundColor: '#158A24'
    }
  }),
}

AlbumItem.propTypes = {
  ...View.propTypes,
  data: PropTypes.object,
  onViewPress: PropTypes.func,
}

AlbumItem.defaultProps = {
  data: {},
  onViewPress: () => {},
}

Albums.propTypes = {
  ...FlatList.propTypes,
  items: PropTypes.array,
  isLoading: PropTypes.bool,
  onItemViewPress: AlbumItem.propTypes.onViewPress,
}

Albums.defaultProps = {
  items: [],
  isLoading: true,
  onItemViewPress: () => {},
}

export default Albums
