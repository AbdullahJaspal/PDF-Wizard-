import React, {useRef, useState} from 'react';
import {
  ImageBackground,
  StatusBar,
  Animated,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  PermissionsAndroid,
  StyleSheet,
  Alert,
} from 'react-native';
import Splash from './src/screens/Splash';
import HomeScreen from './src/screens/HomeScreen';
import PreviewScreen from './src/screens/PreviewScreen';
import Theme, {scale, verticalScale} from './src/assets/Dimensions';
import {createPdf} from 'react-native-images-to-pdf';
import RNBlobUtil from 'react-native-blob-util';

const {width, height} = Dimensions.get('window');

const App = ({}) => {
  const Navigate = useRef(new Animated.Value(0)).current;
  const Success = useRef(
    new Animated.Value(-(StatusBar.currentHeight + verticalScale(60))),
  ).current;
  const backImage = require('./src/assets/images/arrow.png');

  const [images, setImages] = useState([]);

  const Move = (page, duration = 500) => {
    Animated.timing(Navigate, {
      toValue: -(width * page),
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  const HomePosition = Navigate.interpolate({
    inputRange: [-width, 0],
    outputRange: [0, width],
  });

  const PreviewHeader = Navigate.interpolate({
    inputRange: [-(width * 2), -width],
    outputRange: [0, -(StatusBar.currentHeight + verticalScale(60))],
    extrapolate: 'clamp',
  });

  const PreviewBody = Navigate.interpolate({
    inputRange: [-(width * 2), -width],
    outputRange: [0, height],
    extrapolate: 'clamp',
  });

  const ShowSuccess = () => {
    Animated.timing(Success, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.timing(Success, {
        toValue: -(StatusBar.currentHeight + verticalScale(60)),
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, 3000);
  };

  const CreatePDF = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message:
            'Image to Pdf App needs access to your storage to download Pdf.',
        },
      );

      const options = {
        pages: images
          .filter(f => f.allowed === true)
          .map(k => {
            return {
              imagePath: k.img,
            };
          }),
        outputPath: `file://${RNBlobUtil.fs.dirs.DocumentDir}/${Math.floor(
          Math.random() * 10000000,
        )}.pdf`,
      };

      createPdf(options).then(async path => {
        let result = await RNBlobUtil.MediaCollection.copyToMediaStore(
          {
            name: `From_Techndevs_${new Date().getTime()}`,
            parentFolder: '',
            mimeType: 'application/pdf',
          },
          'Download',
          `file://${path}`,
        );
        if (result) {
          ShowSuccess();
          setImages([]);
          Move(1, 200);
        }
      });
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <ImageBackground
      source={require('./src/assets/images/BG1.png')}
      style={styles.mainContainer}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Animated.View
        style={{
          transform: [
            {
              translateX: Navigate,
            },
          ],
          ...styles.ScreenDimensions,
        }}>
        <Splash move={Move} />
      </Animated.View>
      <Animated.View
        style={{
          flex: 1,
          transform: [
            {
              translateX: HomePosition,
            },
          ],
        }}>
        <HomeScreen move={Move} images={images} setImages={setImages} />
      </Animated.View>
      <Animated.View
        style={{
          ...styles.PreviewHeader,
          transform: [
            {
              translateY: PreviewHeader,
            },
          ],
        }}>
        <TouchableOpacity
          onPress={() => Move(1, 300)}
          style={styles.previewBackButton}>
          <Image source={backImage} style={styles.previewBackIcon} />
        </TouchableOpacity>
        <Text style={styles.PreviewBackTag}>Preview</Text>
        <TouchableOpacity
          style={styles.convertButton}
          onPress={() => CreatePDF()}>
          <Text style={styles.convertTag}>CONVERT</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={{
          ...styles.ScreenDimensions,
          top: StatusBar.currentHeight + verticalScale(60),
          transform: [
            {
              translateY: PreviewBody,
            },
          ],
        }}>
        <PreviewScreen Data={images} />
      </Animated.View>
      <Animated.View
        style={{
          ...styles.PreviewHeader,
          backgroundColor: 'green',
          justifyContent: 'center',
          transform: [
            {
              translateY: Success,
            },
          ],
        }}>
        <Text
          style={[
            styles.PreviewBackTag,
            {
              fontSize: scale(15),
            },
          ]}>
          Your Pdf has been Downloaded...
        </Text>
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  ScreenDimensions: {
    position: 'absolute',
    width: width,
    height: height,
  },
  PreviewHeader: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: verticalScale(60) + StatusBar.currentHeight,
    position: 'absolute',
    top: 0,
    width: width,
    paddingTop: StatusBar.currentHeight,
  },
  previewBackButton: {
    width: verticalScale(50),
    height: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewBackIcon: {
    width: '40%',
    height: '40%',
    resizeMode: 'contain',
  },
  PreviewBackTag: {
    color: 'white',
    fontSize: scale(20),
    fontWeight: '500',
  },
  convertButton: {
    backgroundColor: '#5D109E',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: scale(90),
    height: verticalScale(35),
    right: scale(10),
    borderRadius: scale(5),
    top: StatusBar.currentHeight + verticalScale(25) / 2,
  },
  convertTag: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: scale(14),
  },
});

export default App;
