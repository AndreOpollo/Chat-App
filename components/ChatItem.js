import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Image } from 'expo-image'
import { blurhash, getRoomId } from '../utils/Constants'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebaseConfig'

export default function ChatItem({item,noBorder,router,currentUser}) {
  const openChatRoom = ()=>{
    router.push({pathname:'/chatRoom',params:item})
  }
  const[lastMessage,setLastMessage]=useState(undefined)
      useEffect(()=>{
        
        const roomId = getRoomId(currentUser?.userId,item?.userId)
        const docRef = doc(db,'rooms',roomId)
        const messageRef = collection(docRef,'messages')
        const q = query(messageRef,orderBy('createdAt','desc'))
        let unsub = onSnapshot(q,(snapshot)=>{
         let allMessages = snapshot.docs.map(doc=>{
          return doc.data()
         })
         setLastMessage(allMessages[0]?allMessages[0]:null)
        })
        return unsub

      },[])
      const renderTime = ()=>{
       return 'Time'
      }
      const renderLastMessage = ()=>{
        if(typeof lastMessage=='undefined') return 'Loading...'
        if(lastMessage){
          if(currentUser?.userId==lastMessage?.userId) return 'You: '+lastMessage?.text
          return lastMessage?.text

        } else {
          return 'Say Hi👋'
        }

      }
      console.log('last message',lastMessage)
  return (
    <Pressable onPress={openChatRoom} className={`flex-row justify-between items-center mt-2 mx-4 mb-4 pb-2 gap-3 ${noBorder?'':'border-b border-b-neutral-200'}`}>
     
     
        <Image
        source={item?.profileUrl}
        style={{height:hp(6),width:hp(6),borderRadius:100}}
        placeholder={blurhash}
        transition={500}

        />

        
       

        <View className='flex-1 gap-1'> 
            <View className='flex-row justify-between'>
                <Text style={{fontSize:hp(1.8)}} className='font-semibold text-neutral-800'>{item?.username}</Text>
                <Text style={{fontSize:hp(1.6)}} className='font-medium text-neutral-500'>{renderTime()}</Text>
            </View>
            <Text style={{fontSize:hp(1.6)}} className='font-medium text-neutral-500'>{renderLastMessage()}</Text>
        </View>
        
    </Pressable>    
  )
}