import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './src/screens/Home/Home';
import {store} from './src/app/store';
import {Provider} from 'react-redux';
import {ListScreen} from './src/screens/List/List';
import {DetailScreen} from './src/screens/Detail/Detail';
import {PostT} from './src/screens/List/List.types';
import {CategoryMenuType} from './src/screens/Home/Home.types';
import {enableScreens} from 'react-native-screens';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {library} from '@fortawesome/fontawesome-svg-core';
import {icons} from './icons';

library.add(icons);
enableScreens();

export type RootStackParamList = {
  Home: undefined;
  Detail: {
    item: PostT;
  };
  List: {
    category: CategoryMenuType;
  };
};

const RootStack = createSharedElementStackNavigator<RootStackParamList>();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{headerShown: false}}>
          <RootStack.Screen name="Home" component={HomeScreen} />
          <RootStack.Screen name="List" component={ListScreen} />
          <RootStack.Screen
            name="Detail"
            component={DetailScreen}
            options={() => ({
              gestureEnabled: false,
              transitionSpec: {
                open: {animation: 'timing', config: {duration: 500}},
                close: {animation: 'timing', config: {duration: 500}},
              },
              cardStyleInterpolator: ({current: {progress}}) => {
                return {
                  cardStyle: {
                    opacity: progress,
                  },
                };
              },
            })}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
