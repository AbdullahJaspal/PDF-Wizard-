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
    fontWeight: 'bold',
    fontSize: scale(24),
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
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    height: 50,
    width: '50%',
  },
  bottomButtonTag: {
    color: Theme.colors.primaryColor,
    fontWeight: 'bold',
    fontSize: scale(16),
  },
});

export default styles;
