import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {HomeScreenProps} from './Home.types';

export const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Button
        title={'Go TO Details'}
        onPress={() => navigation.push('Details')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
});
