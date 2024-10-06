import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import WebView from 'react-native-webview'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntIcons from 'react-native-vector-icons/AntDesign'
import { AppStyles } from '../utilities/AppStyles'

export default function SingleFavouriteScreen({ movie }) {

    // console.log('CURRENT MOVIE === ', movie['video']['default_thumbnail_filename']);

    // useEffect(() => {

    // })

    const truncateTitle = (title) => {
        return title.length > 20 ? `${title.substring(0, 20)}...` : title;
    };

    return (
        <View
            style={{
                flex: 1,
                // width: '100%',
                height: 100,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                padding: 10
            }}
        >
            <View
                style={{
                    width: '40%',
                    marginRight: 5,
                }}
            >
                <WebView
                    source={{ uri: movie['default_thumbnail_filename'] }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    allowsInlineMediaPlayback={true}
                    style={{
                        borderRadius: 10
                    }}
                />
            </View>
            <View
                style={{
                    // flexDirection: 'row',
                    // flexWrap: 'wrap'
                    // marginRight: 5,
                }}
            >
                <Text
                    style={{ flexWrap: 'wrap' }}
                >{truncateTitle(movie['title'] + movie['title'])}</Text>
            </View>
            <View>
                <TouchableOpacity onPress={() => {
                    console.log('FAVOURITE MOVIE DELETED');
                }}>
                    <AntIcons name='delete' size={20} />
                </TouchableOpacity>
            </View>
        </View>
    )
}