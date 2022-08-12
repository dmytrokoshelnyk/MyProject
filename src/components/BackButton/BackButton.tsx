import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { useDeviceOrientation } from "@react-native-community/hooks";
import Modal from "react-native-modal";
const INSTETS_TOP_LANDSCAPE = 30;
const TOP_MARGIN = 20;
export const BackButton = () => {
  const navigation = useNavigation();
  const {landscape} = useDeviceOrientation();
  const insets = useSafeAreaInsets();
  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <View style={[styles.container, {top: landscape? INSTETS_TOP_LANDSCAPE : insets.top + TOP_MARGIN}]}>
      <TouchableOpacity onPress={handleGoBack} hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
        <Text style={styles.text}> Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {position: 'absolute', top: 40, left: 30, zIndex: 2},
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
