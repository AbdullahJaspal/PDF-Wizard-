import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Alert,
  StatusBar,
  FlatList,
  ImageBackground,
  ScrollView,
  LogBox,
} from 'react-native';
import {DraggableGrid} from 'react-native-draggable-grid';
import Theme, {scale, verticalScale} from '../../assets/Dimensions';

import ImagePicker from 'react-native-image-crop-picker';
import styles from './styles';

const {width, height} = Dimensions.get('window');

const HomeScreen = ({move, images, setImages}) => {
  //Styling Variables
  const BSheetPosition = useRef(new Animated.Value(height)).current;
  const scrollViewRef = useRef(null);
  const [showBSheet, setShowBSheet] = useState(false);
  const DeleteImage = require('../../assets/images/delete.png');
  const CropImage = require('../../assets/images/crop.png');
  const PlusIcon = require('../../assets/images/plus.png');
  const GalleryIcon = require('../../assets/images/gallery.png');
  const CameraIcon = require('../../assets/images/camera.png');

  const onDragStart = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.setNativeProps({scrollEnabled: false});
    }
  };

  const onDragEnd = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.setNativeProps({scrollEnabled: true});
    }
  };

  const OpenBottomSheet = () => {
    setShowBSheet(true);
    Animated.timing(BSheetPosition, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const CloseBottomSheet = () => {
    Animated.timing(BSheetPosition, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setShowBSheet(false);
  };

  const handleCamera = () => {
    CloseBottomSheet();
    ImagePicker.openCamera({
      multiple: true,
      cropping: true,
      mediaType: 'photo',
    }).then(image => {
      let imageData = {
        key: new Date().getTime(),
        img: image.path,
        allowed: true,
        imageWidth: image.width,
        imageHeight: image.height,
      };
      console.log(image);
      let newData = images.filter(f => f.allowed === true);
      newData.push(imageData);
      newData.push({allowed: false, key: 'noNotAllowed'});
      setImages(newData);
    });
  };

  const handleGallery = () => {
    CloseBottomSheet();
    ImagePicker.openPicker({
      multiple: true,
      cropping: true,
      mediaType: 'photo',
    }).then(image => {
      let imagesData = image.map(k => {
        return {
          key: Math.floor(Math.random() * 1000),
          img: k.path,
          allowed: true,
          imageWidth: k.width,
          imageHeight: k.height,
        };
      });
      let newData = images.filter(f => f.allowed === true);
      newData = newData.concat(imagesData);
      newData.push({allowed: false, key: 'noNotAllowed'});
      setImages(newData);
    });
  };

  const handleImageCropping = index => {
    ImagePicker.openCropper({
      path: images[index].img,
    }).then(image => {
      let newData = {
        key: Math.floor(Math.random() * 1000),
        img: image.path,
        allowed: true,
        imageWidth: image.width,
        imageHeight: image.height,
      };
      let tempData = images;
      tempData.splice(index, 1, newData);
      setImages([]);
      setImages(tempData);
    });
  };

  const handleImageDelete = index => {
    let newData = images.filter((f, findex) => findex !== index);
    if (newData.length === 1) {
      setImages([]);
    } else {
      setImages(newData);
    }
  };

  const renderItem = (item, index) => {
    if (item.allowed === true) {
      return (
        <ImageBackground
          key={item.key}
          source={{uri: item.img}}
          style={styles.renderItemCard}>
          <View style={styles.renderIndex}>
            <Text style={styles.renderIndexTag}>{index + 1}</Text>
          </View>
          <View style={styles.renderButtonWrapper}>
            <TouchableOpacity
              onPress={() => handleImageDelete(index)}
              style={styles.renderButtonContainer}>
              <Image source={DeleteImage} style={styles.renderButtonImage} />
            </TouchableOpacity>
            <View
              style={{
                width: scale(2.5),
              }}
            />
            <TouchableOpacity
              onPress={() => handleImageCropping(index)}
              style={[
                styles.renderButtonContainer,
                {
                  backgroundColor: '#5D109E',
                },
              ]}>
              <Image source={CropImage} style={styles.renderButtonImage} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      );
    } else
      return (
        <TouchableOpacity
          onPress={OpenBottomSheet}
          disabledDrag={true}
          activeOpacity={1}
          style={[
            styles.renderItemCard,
            {justifyContent: 'center', alignItems: 'center'},
          ]}
          key={item.key}>
          <Image source={PlusIcon} style={styles.renderAddMoreImage} />
          <Text style={styles.renderAddMoreTag}>Add More</Text>
        </TouchableOpacity>
      );
  };

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          backgroundColor: 'black',
          width: '100%',
          position: 'absolute',
          top: 0,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 20,
        }}>
        <Text
          style={[
            styles.topHeading,
            {
              fontSize: scale(32),
              color: '#FA0F00',
              fontFamily: 'NanumMyeongjo-Bold',
            },
          ]}>
          PDF
          <Text style={{color: 'white', fontSize: scale(20)}}> Wizard</Text>
        </Text>
        <Text
          style={[
            styles.topHeading,
            {
              fontSize: scale(16),
              fontFamily: 'NanumMyeongjo-Bold',
              color: 'white',
            },
          ]}>
          Simplifying Your Document Journey!
        </Text>
      </View>
      <Text
        style={[
          styles.topHeading,
          {
            fontSize: scale(16),
            fontFamily: 'NanumMyeongjo-Bold',
            color: 'black',
          },
        ]}>
        Image to PDF
      </Text>
      <View style={styles.mainCard}>
        <ScrollView ref={scrollViewRef}>
          <DraggableGrid
            style={{
              overflow: 'hidden',
              height: '100%',
              width: '100%',
            }}
            numColumns={3}
            renderItem={renderItem}
            data={images}
            onDragRelease={newData => {
              onDragEnd();
              let tempData = newData.filter(f => f.allowed === true);
              tempData.push({allowed: false, key: 'noNotAllowed'});
              setImages(tempData);
            }}
            onDragStart={onDragStart}
          />
        </ScrollView>

        {images.length === 0 && (
          <TouchableOpacity
            onPress={() => {
              OpenBottomSheet();
            }}
            style={styles.uploadImagesButton}>
            <Text style={styles.uploadImagesButtonTag}>Upload Images</Text>
          </TouchableOpacity>
        )}
      </View>
      {images.length !== 0 && (
        <TouchableOpacity
          onPress={() => move(2, 300)}
          style={{
            width: width * 0.5,
            height: verticalScale(45),
            borderRadius: 100,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: Theme.colors.primaryColor,
              fontSize: scale(20),
              fontWeight: 'bold',
            }}>
            PREVIEW
          </Text>
        </TouchableOpacity>
      )}
      {showBSheet && <View style={styles.bottomSheetBG} />}
      <Animated.View
        style={[
          styles.bottomSheetContainer,
          {
            transform: [
              {
                translateY: BSheetPosition,
              },
            ],
          },
        ]}>
        <View
          style={{
            backgroundColor: 'black',
            height: 40,
            justifyContent: 'center',
          }}>
          <Text style={styles.bottomSheetHeading}> What you want to do </Text>
        </View>
        <View style={styles.bottomSheetButtonWrapper}>
          <TouchableOpacity
            onPress={handleCamera}
            style={styles.bottomSheetButtonContainer}>
            <Image source={CameraIcon} style={styles.bottomSheetButtonImage} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleGallery}
            style={styles.bottomSheetButtonContainer}>
            <Image source={GalleryIcon} style={styles.bottomSheetButtonImage} />
          </TouchableOpacity>
        </View>
        <Text
          onPress={() => CloseBottomSheet()}
          style={styles.bottomSheetCloseButton}>
          Close
        </Text>
      </Animated.View>
    </View>
  );
};

export default HomeScreen;
