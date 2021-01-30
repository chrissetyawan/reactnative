import * as React from 'react'
import { connect } from 'react-redux'
import { Button } from '../components'
import { bindActionCreators } from 'redux'
import { getPhotos } from '../store/actions/photos'
import { useTheme } from '@react-navigation/native'
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

const dimens = Dimensions.get('window')

const Detail = ({ route, photos, isFetching, fetchPhotos }) => {
  const theme = useTheme()
  const marginThumb = 3.275
  const measureThumb = (dimens.width - 8) / 4 - marginThumb * 2
  const { album } = route.params

  const [photoActive, setPhotoActive] = React.useState({ data: null, index: 0 })

  React.useState(() => {
    ;(async () => {
      if (album.id) {
        const data = await fetchPhotos(album.id)
        if (data.length > 0) setPhotoActive({ data: data[0], index: 0 })
      }
    })()
  }, [])

  const handleNext = () => {
    const index = photoActive.index + 1

    setPhotoActive({ index, data: photos[index] })
  }

  const handlePrev = () => {
    const index = photoActive.index - 1

    setPhotoActive({ index, data: photos[index] })
  }

  return photoActive.data && !isFetching ? (
    <SafeAreaView style={styles.container}>
      <Text ellipsizeMode="tail" numberOfLines={2} style={styles.albumTitle}>
        {album.title}
      </Text>
      <View style={styles.viewerContainer}>
        <View style={styles.viewerNavigationBox}>
          <Button
            text="Prev"
            onPress={handlePrev}
            iconPosition="start"
            iconName="chevron-back"
            disabled={photoActive.index <= 0}
          />
        </View>
        <View style={{ width: dimens.width / 2, height: dimens.width / 2, position: 'relative' }}>
          <Image style={styles.photo} source={{ uri: photoActive.data.url }} />
        </View>
        <View style={styles.viewerNavigationBox}>
          <Button
            text="Next"
            iconPosition="end"
            onPress={handleNext}
            iconName="chevron-forward"
            disabled={photoActive.index >= photos.length - 1}
          />
        </View>
      </View>
      <View style={styles.photoTitle}>
        <Text style={styles.photoTitleText}>{photoActive.data.title}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.galleryBox}>
        {photos.map((photo, index) => (
          <TouchableOpacity
            key={photo.id}
            activeOpacity={0.4}
            onPress={() => setPhotoActive({ data: photo, index })}
            style={[
              styles.galleryItem,
              {
                width: measureThumb,
                height: measureThumb,
                margin: marginThumb,
              },
              photoActive.data.id === photo.id && {
                borderWidth: 4,
                borderStyle: 'solid',
                borderColor: theme.colors.primary,
              },
            ]}>
            <Image style={styles.galleryThumbnail} source={{ uri: photo.thumbnailUrl }} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  ) : (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator color={theme.colors.primary} size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  albumTitle: {
    fontSize: 22,
    marginTop: 12,
    fontWeight: '600',
    paddingHorizontal: 12,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  viewerContainer: {
    marginTop: 15,
    flexWrap: 'wrap',
    marginBottom: 6,
    flexDirection: 'row',
  },
  viewerNavigationBox: {
    flex: 1,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  photo: {
    zIndex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#CCC',
  },
  photoTitle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 80,
    zIndex: 2,
  },
  photoTitleText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'capitalize',
    borderWidth: 1,
    borderColor: '#2200',
  },
  galleryBox: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: 4,
    paddingBottom: 6
  },
  galleryItem: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#CCC',
  },
  galleryThumbnail: {
    width: '100%',
    height: '100%',
  },
})

const mapStateToProps = ({ photos }) => ({
  isFetching: photos.isFetching,
  fetchError: photos.fetchError,
  photos: photos.data,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPhotos: getPhotos,
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
