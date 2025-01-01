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
import { showToast } from '../components/ToastAlert';

const MemoizedMovieBanner = memo(MovieBanner);
const MemoizedSingleMovieCard = memo(SingleMovieCard);

export default function HomeScreen() {
  const navigator = useNavigation();
  const {width: screenWidth} = Dimensions.get('window');
  const mySize = screenWidth / 3;

  const isFinished = useRef(false);

  const subscriber = useSelector(state => state.subscriber.subscriberDetails);
  const movies = useSelector(state => state.movie.movies);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const movieBannersNew =
    movies && movies.length > 0 ? movies.slice(0, 10) : [];

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
    }, 20000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [movieBannersNew.length]);

  useEffect(() => {
    // Scroll to the next index every time currentIndex changes
    if (bannerFlatListRef.current && movieBannersNew.length > 0) {
      bannerFlatListRef.current.scrollToIndex({
        animated: true,
        index: currentIndex,
      });
    }
  }, [currentIndex, movieBannersNew.length]);

  //! This useEffect is responsible for in-app notificatio
  useEffect(() => {
    const logText = () => {
      if (isFinished.current !== true) {
        showToast('WELCOME MESSAGE', 'You are welcome', 'success', 5000);
        isFinished.current = true;
        // console.log('NOTIFICATION IS RUNNING: ', isFinished.current);
      }
    };
    setInterval(() => {
      logText();
    }, 2000);
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
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => <MemoizedMovieBanner movie={item} />}
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
