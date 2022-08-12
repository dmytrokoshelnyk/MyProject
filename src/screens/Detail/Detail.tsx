import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, Animated} from 'react-native';
import {DetailScreenProps} from './Detail.types';
import {BackButton} from '../../components/BackButton/BackButton';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useDeviceOrientation, useDimensions} from '@react-native-community/hooks';
import {SharedElement} from 'react-navigation-shared-element';
import {PostT} from '../List/List.types';

const Detail: React.FC<DetailScreenProps> = ({navigation, route}) => {
  const {landscape} = useDeviceOrientation();
  const {width} = useDimensions().window;
  const item = route.params.item;
  const mountedAnimated = React.useRef(new Animated.Value(0)).current;

  const animation = (toValue: number, delay: number) =>
    Animated.timing(mountedAnimated, {
      toValue,
      duration: 500,
      delay,
      useNativeDriver: true,
    });

  useEffect(() => {
    animation(1, 300).start();
  }, []);

  const translateY = mountedAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  const verticalImageStyle = {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  };

  const horizontelImageStyle = {
    width: width,
    height: '100%',
  };

  const imageStyle = landscape ? horizontelImageStyle : verticalImageStyle;

  if (!item) {
    return (
      <View>
        <Text>Image no found</Text>
      </View>
    );
  }
  return (
    <View style={[styles.container, {flexDirection: 'column'}]}>
      <BackButton />
      <View style={{backgroundColor: 'white'}}>
        <SharedElement id={`item.${item.id}.image`}>
          <Image source={{uri: item.webformatURL}} style={imageStyle} resizeMode="cover" />
        </SharedElement>
      </View>
      <Animated.View
        style={[
          styles.panel,
          landscape ? styles.panelHorizontal : {},
          {opacity: mountedAnimated, transform: [{translateY}]},
        ]}>
        <View style={[styles.row, styles.userContainer]}>
          <Image style={styles.userImage} source={{uri: item.userImageURL}} />
          <Text style={styles.userName}> {item.user}</Text>
        </View>
        <View>
          {item.tags.length && (
            <View style={styles.row}>
              <Text style={styles.tagsText}>Tags: {item.tags}</Text>
            </View>
          )}
          <View style={styles.socialContainer}>
            <View style={[styles.row, styles.iconBlock]}>
              <FontAwesomeIcon icon="heart" color="gray" />
              <Text style={styles.iconText}>{item.likes}</Text>
            </View>
            <View style={[styles.row, styles.iconBlock]}>
              <FontAwesomeIcon icon="eye" color="gray" />
              <Text style={styles.iconText}>{item.views}</Text>
            </View>
            <View style={[styles.row, styles.iconBlock]}>
              <FontAwesomeIcon icon="comment" color="gray" />
              <Text style={styles.iconText}>{item.comments}</Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Detail.sharedElements = (route: {params: {item: PostT}}, otherRoute: any, showing: any) => {
  const {item} = route.params;
  return [
    {
      id: `item.${item.id}.image`,
      animation: 'move',
      resize: 'clip',
    },
  ];
};

export const DetailScreen = Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'black',
  },
  image: {
    width: '100%',
    height: undefined,
    resizeMode: 'stretch',
  },
  panel: {
    backgroundColor: 'white',
    height: '50%',
    marginTop: -10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 30,
  },
  panelHorizontal: {marginTop: -100, padding: 10, flexDirection: 'row', alignItems: 'flex-start'},
  userImage: {
    height: 80,
    width: 80,
    borderWidth: 1,
    borderRadius: 75,
  },
  userName: {
    color: 'black',
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  userContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'red'
  },
  row: {
    marginBottom: 20,
  },
  tagsText: {
    fontSize: 18,
    color: 'gray',
  },
  socialContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    marginLeft: 5,
    color: 'gray',
  },
});
