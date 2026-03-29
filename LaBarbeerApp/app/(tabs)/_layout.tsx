import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from '@/hooks/useColorScheme';
import Entypo from '@expo/vector-icons/Entypo';
import Toast from 'react-native-toast-message';

export default function TabLayout() {
  const colorScheme = useColorScheme();

        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
		  default: {
			  // display:'none'
		  },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <Entypo name="shop" size={24} color="black" />,
 		tabBarActiveBackgroundColor: 'lightblue',
		}}
      />
      <Tabs.Screen
        name="cortes"
        options={{
          title: 'Cortes',
          tabBarIcon: ({ color }) => <Ionicons name="cut" size={24} color="black" />,
 		tabBarActiveBackgroundColor: 'lightblue',
        }}
      />
      <Tabs.Screen
        name="cervezas"
        options={{
          title: 'Cervezas',
          tabBarIcon: ({ color }) => <FontAwesome5 name="beer" size={24} color="black" />,
 		tabBarActiveBackgroundColor: 'lightblue',
        }}
      />
    </Tabs>
  );
}
      // <Tabs.Screen
      //   name="turnos"
      //   options={{
      //     title: 'Turno',
      //     tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
 		// tabBarActiveBackgroundColor: 'lightblue',
      //   }}
      // />
