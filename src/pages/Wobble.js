import React, { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, View, Button } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withTiming, withRepeat } from 'react-native-reanimated';

export default function WobbleScreen() {
    const isFocused = useIsFocused();
    const rotation = useSharedValue(0);
    const opacity = useSharedValue(0);

    const boxStyle = useAnimatedStyle(() => ({
        transform: [{ rotateZ: `${rotation.value}deg` }],
        opacity: opacity.value,
    }));

    const setBoxAnimation = () => {
        rotation.value = withSequence(withTiming(-10, { duration: 50 }), withRepeat(withTiming(10, { duration: 100 }), 6, true), withTiming(0, { duration: 50 }));
    };

    useEffect(() => {
        if (!isFocused) return;
        opacity.value = withSequence(
            withTiming(0, { duration: 0 }),
            withTiming(1, { duration: 1000 }, () => {
                rotation.value = withSequence(withTiming(-10, { duration: 50 }), withRepeat(withTiming(10, { duration: 100 }), 6, true), withTiming(0, { duration: 50 }));
            })
        );
    }, [isFocused]);

    return (
        <>
            <View style={styles.container}>
                <Animated.View style={[styles.box, boxStyle]} />
                <Button title="wobble" onPress={setBoxAnimation} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    box: {
        alignSelf: 'center',
        width: 50,
        height: 50,
        backgroundColor: '#121212',
        borderRadius: 10,
    },
});
