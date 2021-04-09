import React from 'react';
import { View, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {/* <Button title="Beacon" onPress={() => navigation.navigate('Beacon')} /> */}
            <Button title="Kontaktio" onPress={() => navigation.navigate('Kontaktio')} />
            <Button title="Axios" onPress={() => navigation.navigate('Axios')} />
            <Button title="Pan" onPress={() => navigation.navigate('PanExample')} />
            <Button title="Wobble" onPress={() => navigation.navigate('Wobble')} />
        </View>
    );
}
