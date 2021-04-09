import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, DeviceEventEmitter, Platform, StyleSheet } from 'react-native';
import Beacons from 'react-native-beacons-manager';

// 해당 앱에서 위치 정보 권한을 앱 설정에서 차단했을 때에는 비콘 정보가 나오지 않습니다.

export default function BeaconScreen() {
    const [device, setDevice] = useState({});
    let beaconsDidRange = null;

    useLayoutEffect(() => {
        Beacons.requestAlwaysAuthorization();
        const region = {
            identifier: 'mymac',
            uuid: '55AB75A9-819A-4811-A227-8A89CECE515C',
        };

        Beacons.startRangingBeaconsInRegion(region);
    }, []);

    useEffect(() => {
        // 안드로이드에서는 DeviceEventEmitter를 사용합니다.
        if (Platform.OS === 'ios') {
            beaconsDidRange = Beacons.BeaconsEventEmitter.addListener('beaconsDidRange', (data) => {
                setDevice(data.beacons[0]);
            });
        } else {
            beaconsDidRange = DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
                setDevice(data.beacons[0]);
            });
        }

        return () => {
            beaconsDidRange = null;
        };
    }, []);

    useEffect(() => {
        console.log(device);
    }, [device]);

    if (!device?.uuid) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>No device</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View
                style={{
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: device.proximity === 'immediate' || device.proximity === 'near' ? 'green' : device.proximity === 'far' ? 'orange' : 'gray',
                }}
            />
            <View style={styles.row}>
                <Text style={styles.title}>Identifier (식별자)</Text>
                <Text>dx_fe's mac</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.title}>Accuracy (정확도)</Text>
                <Text>{device.accuracy}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.title}>Proximity (거리)</Text>
                <Text>{device.proximity}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.title}>UUID (고유아이디)</Text>
                <Text>{device.uuid}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.title}>rssi (수신신호강도)</Text>
                <Text>{device.rssi}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.title}>minor</Text>
                <Text>{device.minor}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.title}>major</Text>
                <Text>{device.major}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        margin: 4,
    },
    title: {
        fontWeight: 'bold',
    },
});
