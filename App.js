import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './screens/Home';
import Quiz from './screens/Quiz';
import Results from './screens/Results';

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            } else if (route.name === 'Quiz') {
              iconName = focused
                ? 'ios-clipboard'
                : 'ios-clipboard-outline';
            }
            else if (route.name === 'Results') {
              iconName = focused
                ? 'ios-albums'
                : 'ios-albums-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerTitleAlign: "center",
          }}
        />
        <Tab.Screen
          name="Quiz"
          component={Quiz}
          options={{
            headerTitleAlign: "center",
          }}
        />
        <Tab.Screen
          name="Results"
          component={Results}
          options={{
            headerTitleAlign: "center",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  head: {
    justifyContent: "center",
    alignItems: "center",
    color: "red"
  },
})
