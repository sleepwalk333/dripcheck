import { View, Image, StyleSheet, Pressable } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';

const Pin = (props) => {
  const { pin } = props;
  const [ratio, setRatio] = useState(1);
  const router = useRouter();

  const onLike = () => {};

  useEffect(() => {
    if (pin.image) {
      Image.getSize(pin.image, (width, height) => setRatio(width / height));
    }
  }, [pin.image]);

  const onPress = () => {
    router.push(`/pins/${pin.id}`);
  };

  return (
    <View style={styles.pin}>
      <Pressable onPress={onPress}>
        <Image
          source={{ uri: pin.image }}
          style={[styles.image, { aspectRatio: ratio }]}
        />
      </Pressable>

      <Pressable onPress={onLike} style={styles.heartBtn}>
        <AntDesign name="hearto" size={25} color="black" />
      </Pressable>

      {/* <Text style={styles.title}>{pin.title}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  pin: {
    width: "100%",
    padding: 4,
  },
  /*title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: 'white',
  },*/
  image: {
    width: "100%",
    borderRadius: 15,
  },
  heartBtn: {
    backgroundColor: "#D3CFD4",
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 5,
    borderRadius: 50,
  },
});

export default Pin;
