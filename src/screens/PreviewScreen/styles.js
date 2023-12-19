import {StyleSheet, Dimensions} from 'react-native';
import Theme, {scale, verticalScale} from '../../assets/Dimensions';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {},
  previewImageCard: {
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    width: width,
    paddingVertical: verticalScale(10),
  },
  previewImageNumbering: {
    position: 'absolute',
    top: scale(10),
    right: scale(10),
    height: scale(25),
    width: scale(50),
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  preivewImageNumberingTag: {
    color: Theme.colors.primaryColor,
    fontWeight: '500',
    fontSize: scale(14),
  },
});

export default styles;
