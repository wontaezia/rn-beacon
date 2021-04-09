import React, { useRef } from 'react';
import { vw, vh } from 'react-native-css-vh-vw';
import { StyleSheet, PanResponder, Animated, View } from 'react-native';

const PanExampleScreen = () => {
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = React.useMemo(() =>
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, gestureState) => {
                return Animated.event(
                    [
                        null,
                        {
                            dx: pan.x,
                            dy: pan.y,
                        },
                    ],
                    { useNativeDriver: false }
                )(evt, gestureState);
            },
            onPanResponderRelease: () => {
                Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
            },
        })
    );

    const getTranslate = () => {
        return {
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
        };
    };

    return (
        <View style={styles.container}>
            <Animated.View {...panResponder.panHandlers} style={[getTranslate(), styles.button]} />
        </View>
    );
};

export default PanExampleScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    square: {
        width: 100,
        height: 100,
        backgroundColor: 'blue',
    },
    button: {
        width: vw(6),
        height: vw(6),
        borderRadius: vw(100) * 0.5,
        backgroundColor: 'black',
    },
});
