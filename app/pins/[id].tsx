import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const PinScreen = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <PinScreenContent />
    </>
  );
};

const PinScreenContent = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [pin, setPin] = useState<any>(null);
  const [ratio, setRatio] = useState(1);

  useEffect(() => {
    const pins = require('@/assets/data/pins').default;
    const selectedPin = pins.find((p: any) => p.id === id);
    if (selectedPin) {
      setPin(selectedPin);
      Image.getSize(selectedPin.image, (w, h) => setRatio(w / h));
    }
  }, [id]);

  if (!pin) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>
      <StatusBar style="light" />

      <View style={styles.root}>
        <View style={[styles.imageWrapper, { aspectRatio: ratio }]}>
          <Image source={{ uri: pin.image }} style={styles.image} />
        </View>
        <Text style={styles.title}>{pin.title}</Text>
      </View>

      <Pressable
        onPress={() => router.back()}
        style={[styles.backBtn, { top: insets.top + 20 }]}
      >
        <Image
          source={require('@/assets/images/back_btn.png')}
          style={styles.backIcon}
        />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'black',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  imageWrapper: {
    marginHorizontal: 12,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: 'black',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    margin: 10,
    fontSize: 24,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 35,
  },
  backBtn: {
    position: 'absolute',
    left: 10,
    zIndex: 10,
    elevation: 10,
    padding: 10,
    borderRadius: 25,
  },
  backIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default PinScreen;
