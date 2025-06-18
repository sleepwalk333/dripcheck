import { StyleSheet, Image } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Image 
      source={{
        uri: "https://i.discogs.com/iPTa7EM1HtHvm0G-ZqlEiioGH4E5fq3ADznJurKDO34/rs:fit/g:sm/q:90/h:586/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTMzODEw/NDMtMTY1NTQwMzIy/OS02NTc2LmpwZWc.jpeg",
      }}
      style={styles.image}
      />
      <Text style={styles.title}>Benjamin Reichwald</Text>
      <Text style={styles.subtitle}>12 Follower</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
  },
  subtitle: {
    color: "181818",
    fontWeight: "600", 
  },
    image: {
      width: 200,
      aspectRatio: 1,
      borderRadius: 200,
    },
});
