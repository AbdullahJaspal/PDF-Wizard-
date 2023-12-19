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
                fontSize: scale(28),
                marginTop: verticalScale(10),
                color: '#FA0F00',
                fontFamily: 'NanumMyeongjo-ExtraBold',
              },
            ]}>
            PDF
            <Text style={{color: 'black', fontSize: scale(18)}}> Wizard</Text>
          </Animated.Text>
          <Animated.Text
            style={[
              styles.topHeading,
              {
                opacity: ChangeOpacity,
                fontSize: scale(16),
                fontFamily: 'NanumMyeongjo-ExtraBold',
                color: 'black',
              },
            ]}>
            Simplifying Your Document Journey!
          </Animated.Text>
        </View>
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
      <Animated.Text
        style={[
          styles.topHeading,
          {
            opacity: ChangeOpacity,
            fontSize: scale(16),
            fontFamily: 'NanumMyeongjo-ExtraBold',
            color: 'black',
            alignSelf: 'center',
            textAlign: 'center',
            width: '85%',
          },
        ]}>
        Snap it, convert it, PDF it! Effortlessly transform your images into
        PDFs with PDF Wizard.
      </Animated.Text>
    </View>
  );
};

export default Splash;
