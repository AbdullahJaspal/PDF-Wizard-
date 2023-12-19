import {StyleSheet, Dimensions} from 'react-native';
import Theme, {scale} from './../../assets/Dimensions';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topContainer: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  topHeading: {
    color: 'white',
    fontFamily: 'NanumMyeongjo-ExtraBold',
  },
  logo: {
    width: scale(96),
    height: scale(96),
    resizeMode: 'contain',
  },
  descriptionText: {
    color: 'white',
    textAlign: 'center',
    width: scale(295),
    fontSize: scale(16),
  },
  bottomContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButton: {
    backgroundColor: '#FA0F00',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    height: 50,
    width: '50%',
  },
  bottomButtonTag: {
    color: 'black',
    fontSize: scale(16),
    fontFamily: 'NanumMyeongjo-ExtraBold',
  },
});

export default styles;
