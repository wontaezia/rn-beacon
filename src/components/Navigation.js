import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../pages/Home';
import KontaktioScreen from '../pages/Kontaktio';
import AxiosScreen from '../pages/Axios';
import PanExampleScreen from '../pages/PanExample';
import WobbleScreen from '../pages/Wobble';

const Stack = createStackNavigator();

export default function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Axios" component={AxiosScreen} />
            <Stack.Screen name="Kontaktio" component={KontaktioScreen} />
            <Stack.Screen name="PanExample" component={PanExampleScreen} />
            <Stack.Screen name="Wobble" component={WobbleScreen} />
        </Stack.Navigator>
    );
}
