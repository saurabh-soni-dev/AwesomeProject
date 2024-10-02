import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';

const Bizolution = () => {
  const API_URL = 'https://api.restful-api.dev/objects';
  const [list, setList] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setList(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback(
    value => {
      setSearchItem(value);
      const filteredList = list.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase()),
      );
      setList(filteredList);
    },
    [list],
  );

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View style={styles.maincontainer}>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Search here..."
            placeholderTextColor={'black'}
            value={searchItem}
            onChangeText={handleSearch}
          />
        </View>
        <View style={styles.listView}>
          {!loading && refreshing ? (
            <View style={styles.loadingView}>
              <ActivityIndicator size={'large'} color={'black'} />
            </View>
          ) : (
            <FlatList
              data={list}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={{flexGrow: 1}}
              renderItem={({item}) => (
                <View
                  style={{
                    paddingVertical: 15,
                    borderBottomWidth: 0.5,
                  }}>
                  {item?.name && (
                    <Text style={styles.nameText}>{item?.name}</Text>
                  )}
                  <View>
                    {item?.data?.color && (
                      <Text style={styles.colorText}>
                        Color: {item?.data?.color}
                      </Text>
                    )}
                    {item?.data?.capacity && (
                      <Text style={styles.colorText}>
                        Capacity: {item?.data?.capacity}
                      </Text>
                    )}
                  </View>
                </View>
              )}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              }
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default Bizolution;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maincontainer: {
    flex: 1,
    margin: 20,
  },
  textInput: {
    height: 50,
    borderWidth: 0.8,
    borderRadius: 10,
    paddingHorizontal: 15,
    color: 'black',
    fontSize: 14,
  },
  listView: {
    flex: 1,
    marginTop: 20,
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    textTransform: 'capitalize',
    fontSize: 16,
  },
  colorText: {
    fontSize: 14,
  },
});
