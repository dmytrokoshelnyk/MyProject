import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  ListRenderItem,
  Image,
} from 'react-native';
import {CategoryMenuType, HomeScreenProps, ItemType} from './Home.types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CategoryMenuItems} from './menu';
import {useDeviceOrientation, useDimensions} from '@react-native-community/hooks';

export const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {landscape} = useDeviceOrientation();
  const {width} = useDimensions().window;

  const imageStyle = {
    width: width / 2,
    height: undefined,
    aspectRatio: 2.0,
  };

  const handleItemPress = (item: CategoryMenuType) => {
    navigation.push('List', {category: item});
  };

  const renderItem: ListRenderItem<CategoryMenuType> = ({item}) => (
    <TouchableOpacity style={styles.itemTouchable} onPress={() => handleItemPress(item)}>
      <View style={styles.item}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Image
          style={[styles.image, landscape ? imageStyle : {}]}
          source={{uri: item.previewUrl}}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={CategoryMenuItems}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
  itemContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
    padding: '2%',
    backgroundColor: 'black',
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    position: 'relative',
  },
  itemTouchable: {
    margin: 1,
    height: 200,
    width: '50%',
    backgroundColor: 'black',
  },
  image: {
    // width: '100%',
    // height: undefined,
    width: undefined,
    height: '100%',
    aspectRatio: 1.0,
  },
  categoryName: {
    position: 'absolute',
    top: 0,
    right: 20,
    zIndex: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
