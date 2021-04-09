import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './components/Navigation';

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Navigation />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
