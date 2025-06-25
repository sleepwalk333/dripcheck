import { View, Image, StyleSheet, Pressable } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useLike } from '@/components/LikeContext'; // ❤️ import

const Pin = (props) => {
  const { pin } = props;
  const [ratio, setRatio] = useState(1);
  const router = useRouter();

  const { isLiked, toggleLike } = useLike(); // ❤️ Context-Hook

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

      <Pressable onPress={() => toggleLike(pin.id)} style={styles.heartBtn}>
        <AntDesign
          name={isLiked(pin.id) ? "heart" : "hearto"}
          size={25}
          color={isLiked(pin.id) ? "red" : "black"}
          style={{ position: 'relative', top: 1 }}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pin: {
    width: "100%",
    padding: 4,
  },
  image: {
    width: "100%",
    borderRadius: 15,
  },
  heartBtn: {
    backgroundColor: "#D3CFD4",
    position: 'absolute',
    bottom: 10,
    right: 12,
    padding: 5,
    borderRadius: 50,
  },
});

export default Pin;
