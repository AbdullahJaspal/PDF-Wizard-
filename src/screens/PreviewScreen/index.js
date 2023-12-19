import React from 'react';
import {View, Text, FlatList, Image, Dimensions} from 'react-native';
import Theme, {scale, verticalScale} from '../../assets/Dimensions';

import styles from './styles';

const screenWidth = Dimensions.get('window').width;

const PreviewScreen = ({Data}) => {
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.previewImageCard}>
        <Image
          source={{uri: item.img}}
          style={{
            width: screenWidth * 0.9,
            height: ((screenWidth * 0.9) / item.imageWidth) * item.imageHeight,
          }}
        />
        <View style={styles.previewImageNumbering}>
          <Text style={styles.preivewImageNumberingTag}>
            {index + 1}/{Data.length - 1}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <FlatList
        data={Data.filter(f => f.allowed === true)}
        renderItem={renderItem}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 100,
        }}
        ItemSeparatorComponent={
          <View
            style={{
              height: verticalScale(10),
            }}
          />
        }
      />
    </View>
  );
};

export default PreviewScreen;
