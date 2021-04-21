import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import colors from '../styles/colors';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import userImg from '../assets/user.jpg';
import fonts from '../styles/fonts';

export function Header(){

    return (
        <View style={style.container}>
           <View>
               <Text style={style.greeting}>Olá,</Text>
               <Text style={style.userName}>Gustavo</Text>
           </View>
           <Image source={userImg} style={style.image}/>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        width: '100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:20,
        marginTop: getStatusBarHeight(),

    },
    image:{
        width:70,
        height:70,
        borderRadius:40
    },
    greeting:{
        fontSize:32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName:{
        fontSize:32,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight:40
    },
    
});