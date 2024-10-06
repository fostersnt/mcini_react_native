import { View, StyleSheet, StatusBar, FlatList, Dimensions, ScrollView, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, memo } from 'react';
import MovieBanner from '../components/MovieBanner';
import { AppStyles } from '../utilities/AppStyles';
import { useRoute } from '@react-navigation/native';
import SingleMovieCard from '../components/SingleMovieCard';

const MemoizedMovieBanner = memo(MovieBanner);
const MemoizedSingleMovieCard = memo(SingleMovieCard);

export default function HomeScreen() {

const { width: screenWidth } = Dimensions.get('window');
  const route = useRoute();
  const { subscriber, movies, favourites, watchList } = route.params;

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [homeBanner, setHomeBanner] = useState([]);

  useEffect(() => {
    const newBanner = homeBannerData();
    setHomeBanner(newBanner);
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
    if (!result[collection_name]) {
      result[collection_name] = [];
    }
    result[collection_name].push(item);
    return result;
  }, {});

  const groupedDataArray = Object.keys(groupedMovies).map(collection_name => ({
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
        renderItem={({ item }) => (
          
            <MemoizedSingleMovieCard
              myWidth={screenWidth}
              movie={item}
            />
        )}
        ListFooterComponent={showViewAll ? (
          <TouchableOpacity>
            <Text style={{ marginLeft: 10, color: 'blue', fontWeight: 'bold' }}>
              VIEW ALL
            </Text>
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
    flex: 1,
    backgroundColor: AppStyles.generalColors.dark_one,
  },
  collectionName: {
    fontWeight: AppStyles.generalFontWeight.weight_one,
    fontSize: AppStyles.generalFontSize.large,
    color: AppStyles.generalColors.white_one,
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
