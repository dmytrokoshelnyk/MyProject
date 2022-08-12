import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {ListScreenProps, PostT, RenderItemProp} from './List.types';
import {fetchPosts} from '../../features/posts/postsSlice';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchPostParams} from '../../api/client.types';
import ListItem from '../../components/ListItem/ListItem';
import {useDeviceOrientation} from '@react-native-community/hooks';
import {BackButton} from '../../components/BackButton/BackButton';
import Modal from 'react-native-modal';
import Config from 'react-native-config';

export const ListScreen: React.FC<ListScreenProps> = ({navigation, route}) => {
  const {category = {name: ''}} = route.params;
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.posts.loading);
  const isLoadingMore = useAppSelector(state => state.posts.moreLoading);
  const isEndList = useAppSelector(state => state.posts.isEndList);
  const error = useAppSelector(state => state.posts.error);
  const posts = useAppSelector(state => state.posts.data);
  const page = useAppSelector(state => state.posts.page);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (error.message) {
      setIsError(true);
    }
  }, [error]);
  useEffect(() => {
    const params: fetchPostParams = {
      category: category.name,
      page: 1,
    };
    dispatch(fetchPosts(params));
  }, [category]);

  const fetchNextPage = () => {
    const params: fetchPostParams = {
      category: category.name,
      page: page + 1,
    };
    dispatch(fetchPosts(params));
  };
  const keyExtractor: (arg0: PostT, arg1: number) => string = (item, index) =>
    `item_${item.id}_${index}`;

  const renderItem: (arg0: RenderItemProp) => JSX.Element = ({item, index}) => (
    <ListItem item={item} key={index} navigation={navigation} />
  );

  const toggleErrorModal = () => setIsError(!isError);
  const renderEmpty: () => JSX.Element = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}>
      {isLoading && <ActivityIndicator color={'white'} size="large" />}
      {!isLoading && <Text style={styles.text}>List is Empty</Text>}
    </View>
  );

  const renderFooter: () => JSX.Element = () => (
    <View style={styles.footerContainer}>
      {isLoadingMore && <ActivityIndicator color={'white'} size="large" />}
      {isEndList && <Text style={styles.text}>The end of list</Text>}
    </View>
  );

  const renderErrorModal = () => {
    const errorMessage = error.message ? error.message : 'Sorry something went wrong';
    return (
      <View>
        <Modal isVisible={true} coverScreen={true}>
          <View style={{marginTop: 50, backgroundColor: 'red'}}>
            <Text style={{color: 'white'}}>{errorMessage}</Text>
          </View>
          <Button title={'Close'} onPress={toggleErrorModal} />
        </Modal>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <BackButton />
      {isError && renderErrorModal()}
      <FlatList
        contentContainerStyle={{flexGrow: 1}}
        data={posts}
        renderItem={renderItem}
        onEndReachedThreshold={0.2}
        onEndReached={fetchNextPage}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        keyExtractor={keyExtractor}
        maxToRenderPerBatch={3}
        windowSize={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'black'},
  footerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'white',
  },
});
