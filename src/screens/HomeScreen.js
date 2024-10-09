import { View, StyleSheet, StatusBar, FlatList, Dimensions, ScrollView, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, memo } from 'react';
import MovieBanner from '../components/MovieBanner';
import { AppStyles } from '../utilities/AppStyles';
import { useRoute } from '@react-navigation/native';
import SingleMovieCard from '../components/SingleMovieCard';
import { getStorageData } from '../utilities/LocalStorage';
import { useNavigation } from '@react-navigation/native';

const MemoizedMovieBanner = memo(MovieBanner);
const MemoizedSingleMovieCard = memo(SingleMovieCard);

export default function HomeScreen() {
  const navigator = useNavigation();
  const { width: screenWidth } = Dimensions.get('window');
  const mySize = screenWidth / 3;
  const route = useRoute();
  const { subscriber, movies, favourites, watchList } = route.params;

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [homeBanner, setHomeBanner] = useState([]);
  const [currentMovie, setCurrentMovie] = useState([]);

  useEffect(() => {
    const funcCall = async () => {
      const newBanner = homeBannerData();
      setHomeBanner(newBanner);
      const storageData = await getStorageData();
      const subscriberStorageData = storageData.subscriber;
      // console.log('SUBSCRIBER DATA FROM STORAGE === ', subscriberStorageData);
    }
    funcCall()
  }, [movies]);

  function homeBannerData() {
    return movies.slice(0, 10); // Limit to 10 items
  }

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Refresh logic here
    setIsRefreshing(false);
  };

  const groupedMovies = movies.reduce((result, item) => {
    const { collection_name } = item;
    if (!result[collection_name] || collection_name.toLowerCase() == 'free') {
      result[collection_name] = [];
    }
    // if (collection_name.toLowerCase() != 'free') {
    result[collection_name].push(item);
    // }
    return result;
  }, {});

  const groupedDataArray = Object.keys(groupedMovies)
    .filter(collection_name => collection_name.toLowerCase() !== 'free') // Filter out "free"
    .map(collection_name => ({
      collection_name,
      items: groupedMovies[collection_name],
    }));

  const renderedItem = (items) => {
    const displayItems = items.slice(0, 5);
    const showViewAll = items.length > 5;

    return (
      <FlatList
        data={displayItems}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(subItem) => subItem.id.toString()}
        renderItem={({ item }) => {
          setCurrentMovie(item)
          return (
            <MemoizedSingleMovieCard
              similar_movies={displayItems}
              myWidth={screenWidth}
              movie={item}
              // collection_name={item.collection_name}
              subscriber={subscriber}
            />
          )
        }}
        ListFooterComponent={showViewAll ? (
          <TouchableOpacity
            onPress={() => {
              navigator.navigate('ViewAllMovies', {
                similar_movies: {displayItems},
                single_movie: {currentMovie}
              })
            }}
          >
            <View style={[styles.viewAllContainer, { width: mySize }]}>
              <Text style={styles.viewAllText}>VIEW ALL</Text>
            </View>
          </TouchableOpacity>
        ) : null}
      />
    );
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar translucent backgroundColor={'transparent'} />
      {homeBanner.length > 0 && (
        <FlatList
          pagingEnabled
          data={homeBanner}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MemoizedMovieBanner
              myWidth={screenWidth}
              movie={item}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
        />
      )}
      {homeBanner.length > 0 && (
        <View style={{ flex: 1, padding: 0 }}>
          <FlatList
            data={groupedDataArray}
            keyExtractor={(item) => item.collection_name}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 20 }}>
                <Text style={styles.collectionName}>
                  {item.collection_name}
                </Text>
                {renderedItem(item.items)}
              </View>
            )}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: AppStyles.generalColors.dark_four,
  },
  collectionName: {
    fontWeight: AppStyles.generalFontWeight.weight_one,
    fontSize: AppStyles.generalFontSize.large,
    color: AppStyles.generalColors.white_one,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  viewAllContainer: {
    flex: 1,
    height: 200,
    backgroundColor: AppStyles.generalColors.dark_one,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewAllText: {
    color: AppStyles.generalColors.blue,
    fontWeight: AppStyles.generalFontWeight.weight_one,
    fontSize: AppStyles.generalFontSize.large
  }
});
