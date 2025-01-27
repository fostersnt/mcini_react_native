import React, {useState, useEffect, useRef, memo} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import MovieBanner from '../components/MovieBanner';
import {AppStyles} from '../utilities/AppStyles';
import SingleMovieCard from '../components/SingleMovieCard';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {showToast} from '../components/ToastAlert';
import {NotificationModal} from '../components/NotificationModal';
import { checkInitialNotification, sendBackgroundNotification, sendForegroundNotification } from '../utilities/General';
import Video from 'react-native-video';

const MemoizedMovieBanner = memo(MovieBanner);
const MemoizedSingleMovieCard = memo(SingleMovieCard);
// const bgVideo = require('../assets/videos/login_bg_video.mp4');

export default function HomeScreen() {
  const [isNotificationModalVisible, setNotificationModalVisible] =
    useState(false);

  const navigator = useNavigation();
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
  const mySize = screenWidth / 3;

    const size = screenWidth / 3 + 20; // Calculate WebView size

  const [modalTitle, setmodalTitle] = useState('');
  const [modalContent, setmodalContent] = useState('');
  const [modalWidth, setmodalWidth] = useState(screenWidth - 50);
  const [modalHeight, setmodalHeight] = useState(screenHeight / 2);

  const isFinished = useRef(false);

  const subscriber = useSelector(state => state.subscriber.subscriberDetails);
  const movies = useSelector(state => state.movie.movies);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  //! OLD MOVIE BANNER
  // const movieBannersNew =
  //   movies && movies.length > 0 ? movies.slice(0, 10) : [];

  //! OLD MOVIE BANNER
  const movieBannersNew = [1,2,3];

  const bannerFlatListRef = useRef(null); // Reference to the FlatList for banners

  const handleMoviePressedFunc = movie => {
    navigator.navigate('ViewAllMoviesPlayer', {singleMovie: movie});
  };

  useEffect(() => {
    // Automatically scroll every 3 seconds
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= movieBannersNew.length) {
          return 0; // Loop back to the first item
        }
        return nextIndex;
      });
    }, 30000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [movieBannersNew.length]);

  useEffect(() => {
    // Scroll to the next index every time currentIndex changes
    if (bannerFlatListRef.current && movieBannersNew.length > 0) {
      // console.log('CURRENT MOVIE INDEX: ', currentIndex);

      bannerFlatListRef.current.scrollToIndex({
        animated: true,
        index: currentIndex,
      });
    }
  }, [currentIndex, movieBannersNew.length]);

  //! This useEffect is responsible for in-app notification
  useEffect(() => {
      const ff = async () => {
        sendForegroundNotification();
        sendBackgroundNotification();
        checkInitialNotification();

        setmodalTitle('Welcome');
        setmodalContent('Hello world');

        setTimeout(() => {
          // setNotificationModalVisible(true);
        }, 1000);
      };
      ff();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Refresh logic here
    console.log('REFRESHING');

    setIsRefreshing(false);
  };

  const groupedMovies =
    movies != null
      ? movies.reduce((result, item) => {
          const {collection_name} = item;
          if (
            !result[collection_name] ||
            collection_name.toLowerCase() === 'free'
          ) {
            result[collection_name] = [];
          }
          result[collection_name].push(item);
          return result;
        }, {})
      : [];

  const groupedDataArray = Object.keys(groupedMovies)
    .filter(collection_name => collection_name.toLowerCase() !== 'free')
    .map(collection_name => ({
      collection_name,
      items: groupedMovies[collection_name],
    }));

  const renderedItem = items => {
    const displayItems = items.slice(0, 5);
    const showViewAll = items.length > 5;

    // const currentCollectionName = showViewAll ? items[0].collection_name : '';

    return (
      <FlatList
        getItemLayout={(data, index) => ({
          length: 200,
          offset: 200 * index,
          index,
        })}
        initialNumToRender={5}
        maxToRenderPerBatch={2}
        removeClippedSubviews
        data={displayItems}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={subItem => subItem.id.toString()}
        renderItem={({item}) => (
          <MemoizedSingleMovieCard
            movie={item}
            onMoviePressedFunc={handleMoviePressedFunc}
            myWidth={size}
            myHeight={200}
          />
        )}
        // ListFooterComponent={
        //   showViewAll ? (
        //     <TouchableWithoutFeedback
        //       onPress={() => {
        //         navigator.navigate('ViewAllMovies', {
        //           collection_name: items[0].collection_name,
        //         });
        //       }}>
        //       <View style={[styles.viewAllContainer, {width: mySize}]}>
        //         <Text style={styles.viewAllText}>VIEW ALL</Text>
        //       </View>
        //     </TouchableWithoutFeedback>
        //   ) : null
        // }
      />
    );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        animated={true}
        barStyle={'light-content'}
        backgroundColor={AppStyles.generalColors.dark_four}
        translucent={true}
      />
      <NotificationModal
        isVisible={isNotificationModalVisible}
        onClose={() => setNotificationModalVisible(false)}
        title={modalTitle.current}
        content={modalContent.current}
        image={require('../assets/images/banner.png')} // Adjust path to your image
        imageWidth={200}
        imageHeight={100}
        modalWidth={modalWidth}
        modalHeight={modalHeight}
      />
      {/* <Video
        source={bgVideo}
        style={styles.backgroundVideo}
        resizeMode="cover"
        repeat
        muted
        paused={false}
      /> */}
      <FlatList
        initialNumToRender={3}
        data={[{collection_name: 'bannerCollection'}, ...groupedDataArray]}
        keyExtractor={item => item.collection_name}
        renderItem={({item}) => {
          if (item.collection_name === 'bannerCollection') {
            return (
              <FlatList
                ref={bannerFlatListRef} // Attach ref to this FlatList
                getItemLayout={(data, index) => ({
                  length: screenWidth,
                  offset: screenWidth * index,
                  index,
                })}
                initialNumToRender={1}
                removeClippedSubviews
                maxToRenderPerBatch={1}
                // pagingEnabled
                data={movieBannersNew}
                // keyExtractor={item => item.id.toString()}
                keyExtractor={item => item}
                renderItem={({item}) => <MemoizedMovieBanner movieKey={item} />}
                horizontal
                snapToInterval={screenWidth} // Snap to the width of each banner
                snapToAlignment="center" // Align each banner to the center
                decelerationRate="fast" // Fast deceleration to make it smoother
                showsHorizontalScrollIndicator={false}
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
              />
            );
          } else {
            return (
              <View style={styles.mainFlatListView}>
                <View style={styles.collectionNameContainer}>
                  <Text style={styles.collectionName}>
                    {item.collection_name}
                  </Text>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      navigator.navigate('ViewAllMovies', {
                        collection_name: item.collection_name,
                      });
                    }}>
                    <View style={styles.viewAllContainer}>
                      <Text style={styles.viewAllText}>View All</Text>
                      <IonIcons
                        name="chevron-forward"
                        color={AppStyles.generalColors.blue}
                        size={20}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                {renderedItem(item.items)}
              </View>
            );
          }
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  // backgroundVideo: {
  //   width: 400,
  //   height: 200,
  // },
  mainFlatListView: {
    marginBottom: 20,
  },
  collectionNameContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  mainContainer: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: AppStyles.generalColors.dark_one,
  },
  collectionName: {
    fontWeight: AppStyles.generalFontWeight.weight_one,
    fontSize: AppStyles.generalFontSize.normal,
    color: AppStyles.generalColors.white_one,
    marginBottom: 10,
  },
  viewAllContainer_old: {
    flex: 1,
    height: 200,
    borderRadius: 20,
    backgroundColor: AppStyles.generalColors.dark_one,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewAllContainer: {
    // flex: 1,
    // height: 200,
    // borderRadius: 20,
    // backgroundColor: AppStyles.generalColors.dark_one,
    // justifyContent: 'center',
    // alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  viewAllText: {
    color: AppStyles.generalColors.blue,
    fontWeight: AppStyles.generalFontWeight.weight_one,
    fontSize: 16,
  },
});
