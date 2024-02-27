import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ChatItem from './ChatItem'
import { useRouter } from 'expo-router'

export default function ChatList({users, currentUser}) {
    const router = useRouter()
  return (
    <View className='flex-1'>
      <FlatList
      data={users}
      showsVerticalScrollIndicator={false}
      keyExtractor={item=>Math.random()}
      renderItem={({item,index})=>(
        <ChatItem item={item} router={router}index={index} noBorder={index+1==users.length} currentUser={currentUser}/>
      )}/>
    </View>
  )
}