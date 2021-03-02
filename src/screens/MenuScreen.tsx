import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
  },
  item: {
    width: '100%',
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  itemText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

const MenuScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SliderAnimationScreen');
        }}
        style={{...styles.item, backgroundColor: '#bbf3bb'}}>
        <Text style={styles.itemText}>Slide Animation</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MenuScreen;
