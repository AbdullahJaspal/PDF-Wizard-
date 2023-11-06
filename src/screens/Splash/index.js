import React, {useRef, useEffect} from 'react';
import {Animated, View, Text, TouchableOpacity, Dimensions} from 'react-native';
import styles from './styles';
import {scale, verticalScale} from '../../assets/Dimensions';

const {width} = Dimensions.get('window');

const Splash = ({move}) => {
  const ImagePosition = useRef(new Animated.Value(-width)).current;
  const ImageSize = useRef(new Animated.Value(1.5)).current;

  useEffect(() => {
    ChangePosition();
  }, []);

  const ChangePosition = () => {
    Animated.timing(ImagePosition, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.spring(ImageSize, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1500);
  };

  const ChangeOpacity = ImageSize.interpolate({
    inputRange: [1, 1.5],
    outputRange: [1, 0],
  });

  const RotateImage = ImagePosition.interpolate({
    inputRange: [-width, 0],
    outputRange: ['-360deg', '0deg'],
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Animated.Text
          style={[
            styles.topHeading,
            {
              opacity: ChangeOpacity,
            },
          ]}>
          Image to Pdf Converter
        </Animated.Text>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Animated.Image
            style={[
              styles.logo,
              {
                transform: [
                  {
                    translateX: ImagePosition,
                  },
                  {
                    rotate: RotateImage,
                  },
                  {
                    scale: ImageSize,
                  },
                ],
              },
            ]}
            source={require('../../assets/images/logo.png')}
          />
          <Animated.Text
            style={[
              styles.topHeading,
              {
                opacity: ChangeOpacity,
                fontSize: scale(20),
                marginTop: verticalScale(10),
              },
            ]}>
            Snap2PDF
          </Animated.Text>
        </View>
        <Animated.Text
          style={[
            styles.descriptionText,
            {
              opacity: ChangeOpacity,
            },
          ]}>
          we give the opportunity to convert PDF files to another format.
        </Animated.Text>
      </View>
      <Animated.View
        style={[
          styles.bottomContainer,
          {
            opacity: ChangeOpacity,
          },
        ]}>
        <TouchableOpacity style={styles.bottomButton} onPress={() => move(1)}>
          <Text style={styles.bottomButtonTag}>Let's Start!</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default Splash;
