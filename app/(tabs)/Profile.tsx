import { StyleSheet, Image, ScrollView } from 'react-native';
import pins from '@/assets/data/pins';
import { Text, View } from '@/components/Themed';
import MasonryList from '@/components/MasonryList';

import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


export default function Profile() {
  return (
    <ScrollView style={styles.container}>
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

      <View style={{ alignItems: 'center' }}>
        <Text style={styles.subtitle}>Saved Items</Text>
      </View>

      <MasonryList pins={pins} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 100,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: 'white',
  },
  subtitle: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    margin: 10,
  },
  icons:{
    flexDirection: "row",
    alignSelf: "flex-end",
    padding: 10,
  },
  icon:{
    paddingHorizontal: 10,
  },
});
