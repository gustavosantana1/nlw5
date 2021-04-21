import React from 'react';
import {
    Text,
    StyleSheet
} from 'react-native';
import {RectButton, RectButtonProps} from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentButtonProps extends RectButtonProps{
    title:string;
    active?:boolean;
}

export function EnvironmentButton({
    title,
    active=false,
    ...rest
}:EnvironmentButtonProps){

    return(
        <RectButton
            style={[
                style.container,
                active && style.containerActive
            ]}
            {...rest}
        >
        <Text style={[
            style.text,
            active && style.textActive
            ]}>
            {title}
        </Text>
        </RectButton>
    );
}

const style = StyleSheet.create({
    container:{
        backgroundColor:colors.shape,
        width:76,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:12,
        marginHorizontal:5
    },
    containerActive:{
       
        backgroundColor:colors.green_light
    },
    text:{
        color:colors.heading,
        fontFamily:fonts.text,

    },
    textActive:{
        fontFamily:fonts.heading,
        color:colors.green_dark,
    }
});