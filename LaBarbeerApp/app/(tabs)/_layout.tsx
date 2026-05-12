import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
		  default: {
			  // display:'none'
		  },
        }),
      }}>
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Inicio',
          tabBarIcon: () => <Entypo name="shop" size={24} color="black" />,
 		tabBarActiveBackgroundColor: 'lightblue',
		}}
      />
      <Tabs.Screen
        name="cortes/Cortes"
        options={{
          title: 'Cortes',
          tabBarIcon: () => <Ionicons name="cut" size={24} color="black" />,
 		tabBarActiveBackgroundColor: 'lightblue',
        }}
      />
      <Tabs.Screen
        name="cervezas/Cervezas"
        options={{
          title: 'Cervezas',
          tabBarIcon: () => <FontAwesome5 name="beer" size={24} color="black" />,
 		tabBarActiveBackgroundColor: 'lightblue',
        }}
      />
    </Tabs>
  );
}
