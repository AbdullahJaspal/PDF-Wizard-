import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import Theme, {scale, verticalScale} from '../../assets/Dimensions';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topHeading: {
    color: 'white',
    fontSize: scale(20),
    fontWeight: '500',
    borderColor: 'white',
    paddingBottom: 2,
  },
  mainCard: {
    width: width * 0.95,
    height: width * 0.95,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    elevation: 5,
    marginVertical: verticalScale(20),
    overflow: 'hidden',
  },
  uploadImagesButton: {
    backgroundColor: Theme.colors.primaryColor,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(45),
    position: 'absolute',
    alignSelf: 'center',
    paddingHorizontal: scale(20),
    top: (width * 0.9 - verticalScale(45)) / 2,
  },
  uploadImagesButtonTag: {
    color: 'black',
    fontFamily: 'NanumMyeongjo-Bold',
    fontSize: scale(17),
  },
  bottomSheetBG: {
    position: 'absolute',
    backgroundColor: 'black',
    top: -StatusBar.currentHeight,
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 6,
    opacity: 0.3,
  },
  bottomSheetContainer: {
    width: width,
    paddingBottom: 15,
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    backgroundColor: 'white',
    position: 'absolute',
    elevation: 7,
    bottom: 0,
  },
  bottomSheetHeading: {
    color: 'white',
    fontSize: scale(16),
    fontFamily: Theme.font.bold,
    borderColor: Theme.colors.primaryColor,
    alignSelf: 'center',
  },
  bottomSheetButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: verticalScale(20),
  },
  bottomSheetButtonContainer: {
    width: width / 4,
    height: width / 4,
    borderRadius: width / 3,
    backgroundColor: Theme.colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheetButtonImage: {
    width: width / 6.5,
    height: width / 6.5,
    resizeMode: 'contain',
  },
  bottomSheetCloseButton: {
    alignSelf: 'center',
    color: 'black',
    fontSize: scale(18),
    fontFamily: Theme.font.extraBold,
  },
  renderItemCard: {
    width: (width * 0.95) / 3.2,
    height: (width * 0.95) / 3.2,
    backgroundColor: 'white',
    borderRadius: scale(10),
    justifyContent: 'space-between',
    padding: scale(5),
    overflow: 'hidden',
  },
  renderIndex: {
    width: scale(20),
    borderRadius: scale(30),
    height: scale(15),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  renderIndexTag: {
    color: 'white',
    fontSize: scale(10),
  },
  renderButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  renderButtonContainer: {
    width: (width * 0.95) / 3.2 / 4,
    height: (width * 0.95) / 3.2 / 4,
    borderRadius: scale(5),
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  renderButtonImage: {
    height: '75%',
    width: '75%',
    resizeMode: 'contain',
  },
  renderAddMoreImage: {
    width: '30%',
    height: '40%',
    resizeMode: 'contain',
    tintColor: Theme.colors.primaryColor,
  },
  renderAddMoreTag: {
    color: Theme.colors.primaryColor,
    fontSize: scale(14),
    fontWeight: '500',
    marginTop: scale(5),
  },
});

export default styles;
