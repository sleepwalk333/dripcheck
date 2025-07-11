import { StyleSheet, ScrollView, View } from 'react-native';
import Pin from "@/components/Pin";

interface IMasonryList {
  pins: {
    id: string;
    image: string;
    title: string;
  }[];
}

const MasonryList = ({ pins }: IMasonryList) => { 
  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContent} 
      style={styles.scrollView}
    >
      <View style={styles.container}>
        <View style={styles.column}>
          {pins.filter((_, index) => index % 2 === 0).map((pin) => (
            <Pin pin={pin} key={pin.id}/>
          ))}
        </View>
        <View style={styles.column}>
          {pins.filter((_, index) => index % 2 === 1).map((pin) => (
            <Pin pin={pin} key={pin.id}/>
          ))}
        </View>  
      </View>     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'black',
  },
  scrollContent: {
    backgroundColor: 'black',
    paddingBottom: 40,
  },
  container: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'black',
  },
  column: {
    flex: 1,
  },
});

export default MasonryList;
