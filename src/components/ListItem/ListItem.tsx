import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {ListItemProps} from './ListItem.types';
import {useDeviceOrientation, useDimensions} from '@react-native-community/hooks';
import {SharedElement} from 'react-navigation-shared-element';

const ListItem: React.FC<ListItemProps> = ({item, navigation}) => {
  const {landscape} = useDeviceOrientation();
  const {width, height} = useDimensions().window;
  const landscapeWidth = landscape ? height : width;
  const imageLandscapeStyle = {
    width: undefined,
    height: '100%',
    aspectRatio: 1.8,
  };

  const imageVerticalStyle = {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  };

  const handlePress = () => {
    navigation.push('Detail', {
      item,
    });
  };

  return (
    <TouchableOpacity
      style={[styles.touchableArea, {height: landscapeWidth}]}
      onPress={handlePress}>
      <View style={{backgroundColor: 'white'}}>
        <SharedElement id={`item.${item.id}.image`}>
          <Image
            style={[styles.image, landscape ? imageLandscapeStyle : imageVerticalStyle]}
            source={{uri: item.webformatURL}}
          />
        </SharedElement>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
const styles = StyleSheet.create({
  touchableArea: {
    height: 500,
    marginBottom: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    alignSelf: 'center',
    height: '100%',
    width: '100%',
  },
});
