import React, { Children } from 'react';
import {
    Dimensions,
    SafeAreaView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ViewStyle
} from 'react-native';

type carrousselProps = {
    children: React.ReactNode;
    cardsWidth?: number;
    cardsHeight?: number;
    cardsGap?: number;
    style?: ViewStyle;
    contentContainerStyle?: ViewStyle;
}

const Carroussel: React.FC<carrousselProps> = ({

    cardsWidth = 300,
    cardsHeight = 100,
    cardsGap = 0,
    style,
    contentContainerStyle,
    children

}) => {
    return (
        <ScrollView
            contentContainerStyle={[contentContainerStyle, { gap: cardsGap }]}
            horizontal
            snapToInterval={cardsWidth + cardsGap}
            decelerationRate={'fast'}
            showsHorizontalScrollIndicator={false}
            style={style}
        >

                {children}
        
        </ScrollView>
    )
}

export default Carroussel