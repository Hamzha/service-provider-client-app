import { View, Text } from 'react-native'
import React from 'react'
import RatingIcon from '../../../assets/icons/Rating'

export default function Ratings(props) {
    const {style}=props
    return (
        <View style={[{display:"flex",flexDirection:'row',alignItems:'center'},style]}>
            {
                [1, 2, 3, 4, 5].map((item, index) => <RatingIcon fill={item<=props.rating?"#FFBA49":"#6A6A6A"} key={item} />)
            }            
        </View>
    )
}