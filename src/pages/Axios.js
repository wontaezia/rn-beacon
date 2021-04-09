import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Button } from 'react-native';
import axios from 'axios';

export default function AxiosScreen() {
    const [paymentsData, setPaymentsData] = useState({});
    const [page, setPage] = useState(0);
    const [hasItems, setHasItems] = useState(true);
    const size = 20;

    const getPaymentsData = async () => {
        const { data } = await axios.get(`https://1cmb9z50la.execute-api.ap-northeast-2.amazonaws.com/production/api/v1/payments/?page=${page}&size=${size}`);
        setPaymentsData(
            paymentsData.items
                ? {
                      ...data,
                      items: [...paymentsData.items, ...data.items],
                  }
                : data
        );
    };

    const handlePaymentsPage = () => {
        const max = (page + 2) * size >= paymentsData.total;
        if (max) {
            setHasItems(false);
        }
        setPage(page + 1);
    };

    useEffect(() => {
        getPaymentsData();
    }, [page]);

    return (
        <ScrollView>
            {paymentsData.items?.map(({ title, payment_date, payment_month, balance, price }, index) => (
                <View style={styles.item} key={index}>
                    <Text>{title}</Text>
                    <Text>{payment_date}</Text>
                    <Text>{payment_month}</Text>
                    <Text>{balance}</Text>
                    <Text>{price}</Text>
                </View>
            ))}
            {hasItems ? <Button onPress={handlePaymentsPage} title="더보기" /> : null}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        backgroundColor: '#000',
        width: 80,
        height: 80,
        borderRadius: 4,
    },
    item: {
        paddingVertical: 10,
    },
});
