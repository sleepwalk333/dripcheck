import { StyleSheet, Image, ScrollView } from 'react-native';
import pins from '@/assets/data/pins';
import { Text, View } from '@/components/Themed';
import MasonryList from '@/components/MasonryList';

import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { useLike } from '@/components/LikeContext';

export default function Profile() {
  const { likedPins } = useLike();

  const filteredPins = likedPins
    .map(id => pins.find(pin => pin.id === id))
    .filter((pin): pin is typeof pins[number] => !!pin);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.icons}>
          <Feather name="share" size={24} color="white" style={styles.icon} />
          <Entypo
            name="dots-three-horizontal"
            size={24}
            color="white"
            style={styles.icon}
          />
        </View>

        <Image 
          source={{
            uri: "https://i.discogs.com/iPTa7EM1HtHvm0G-ZqlEiioGH4E5fq3ADznJurKDO34/rs:fit/g:sm/q:90/h:586/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTMzODEw/NDMtMTY1NTQwMzIy/OS02NTc2LmpwZWc.jpeg",
          }}
          style={styles.image}
        />
        <Text style={styles.title}>Benjamin Reichwald</Text>
      </View>

      <View style={styles.savedSection}>
        <Text style={styles.subtitle}>Saved Items</Text>
      </View>

      <MasonryList pins={filteredPins} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  content: {
    paddingBottom: 40,
    paddingTop: 0, // <- Kein zusätzlicher Abstand oben
  },
  header: {
    alignItems: 'center',
    marginTop: 0, // <- Reduziert den Abstand nach oben
    marginBottom: 10,
    backgroundColor: 'black',
  },
  image: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 100,
    marginVertical: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 25,
    color: 'white',
  },
  subtitle: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    margin: 10,
  },
  savedSection: {
    alignItems: 'center',
    backgroundColor: 'black',
  },
  icons: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 10,
  },
  icon: {
    paddingHorizontal: 10,
  },
});
