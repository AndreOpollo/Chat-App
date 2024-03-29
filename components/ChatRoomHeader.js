import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack, router } from 'expo-router'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Image } from 'expo-image'
import { blurhash } from '../utils/Constants'

export default function ChatRoomHeader({user,router}) {
  return (
   <Stack.Screen options={{
    title:"",
    headerShadowVisible:false,
    headerLeft:()=>(
        <View className='flex-row items-center gap-4'>
            <TouchableOpacity onPress={()=>router.back()}>
            <Entypo name='chevron-left'size={hp(4)} color={'#737373'} />
            </TouchableOpacity>
            <View className='flex-row items-center gap-3'>
                <Image
                source={user?.profileUrl}
                placeholder={blurhash}
                transition={500}
                style={{
                    height:hp(4.5),
                    borderRadius:100,
                    aspectRatio:1
                }}/>
                <Text style={{fontSize:hp(2.5)}} className='font-medium text-neutral-700'>
                    {user?.username}
                </Text>
            </View>
        </View>
    ),
    headerRight:()=>(
        <View className='flex-row items-center gap-4'>
            <Ionicons name='call' size={hp(2.8)} color={'#737373'}/>
            <Ionicons name='videocam' size={hp(2.8)} color={'#737373'}/>
        </View>
    )
    
   }}/>
  )
}