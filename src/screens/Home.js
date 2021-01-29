import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Albums, Button } from '../components'
import { getUsers } from '../store/actions/users'
import { getAlbums } from '../store/actions/albums'
import PickerModal from 'react-native-picker-modal-view'
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native'

const Home = ({ navigation }) => {
  const dispatch = useDispatch()
  const reduxUsers = useSelector(({ users }) => users)
  const reduxAlbums = useSelector(({ albums }) => albums)
  const { data: users } = reduxUsers
  const { data: albums, isFetching, fetchError } = reduxAlbums

  const [filter, setFilter] = React.useState(null)
  const [firstLoad, setFirstLoad] = React.useState(true)

  React.useEffect(() => {
    ;(async () => {
      dispatch(getAlbums())

      if (!users && users.length < 1) {
        dispatch(getUsers())
      }

      setFirstLoad(false)
    })()
  }, [])

  React.useEffect(() => {
    ;(async () => {
      if (!firstLoad) {
        if (filter) dispatch(getAlbums({ userId: filter }))
        else dispatch(getAlbums())
      }
    })()
  }, [filter])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterBox}>
        <View style={{ flex: 1 }}>
          <PickerModal
            autoSort={false}
            selected={filter}
            showToTopButton={true}
            requireSelection={false}
            showAlphabeticalIndex={true}
            autoGenerateAlphabeticalIndex={true}
            onSelected={user => setFilter(user.id)}
            searchPlaceholderText={'Search user...'}
            selectPlaceholderText={'Filter by user...'}
            items={users.map(user => ({ ...user, Value: user.id, Name: user.name }))}
            renderSelectView={(disabled, selected, showModal) => (
              <TextInput
                disabled={disabled}
                onFocus={showModal}
                style={[styles.filterInput, { borderColor: !!filter ? 'black' : '#CCC' }]}
                placeholder="Filter by user ..."
                value={filter ? selected.name : null}
              />
            )}
          />
        </View>
        {!!filter && (
          <Button
            text="Reset"
            color="secondary"
            style={styles.resetButton}
            onPress={() => setFilter(null)}
          />
        )}
      </View>
      <Albums
        isLoading={isFetching}
        items={isFetching ? [] : albums}
        onItemViewPress={data => {
          navigation.navigate('Detail', { album: data })
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterBox: {
    marginTop: 20,
    marginBottom: 30,
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  resetButton: {
    marginLeft: 8,
    paddingHorizontal: 25,
  },
  filterInput: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
})

export default Home