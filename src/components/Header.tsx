import React, {useEffect, useState}from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Header(){

    const[userName, setUserName] = useState<string>();

    useEffect(()=>{
        async function loadStorageUserName(){
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user || '');
        }

        loadStorageUserName();
    },[]);

    //Caso seja passado algo entre [], ele atualizará se o dado for mudado

    return (
        <View style={style.container}>
           <View>
               <Text style={style.greeting}>Olá,</Text>
               <Text style={style.userName}>{userName}</Text>
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