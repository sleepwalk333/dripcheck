import {useEffect, useState} from "react";
import {View, Text, StyleSheet, Image} from "react-native";

import pins from "@/assets/data/pins";


const PinScreen = () => {
    const pin = pins[0];
    const [ratio, setRatio] = useState(1);

    useEffect(() => {
        if (pin.image) {
            Image.getSize(pin.image, (width, height) => setRatio(width / height));
        }
    }, [pin]);
    
    
    
    return (
        <View style={styles.root}>
            <Image source={{uri: pin.image}} style={styles.image} />
            <Text style={styles.title}>{pin.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {},
    image: {
        width: "100%",
        height: 300,
    },
    title: {},
})

export default PinScreen;