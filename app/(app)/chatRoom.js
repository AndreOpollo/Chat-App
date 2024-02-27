import { View, Text, StatusBar, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ChatRoomHeader from '../../components/ChatRoomHeader'
import MessageList from '../../components/MessageList'
import { Feather } from '@expo/vector-icons'
import { getRoomId } from '../../utils/Constants'
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import { useAuth } from '../../context/authContext'

export default function ChatRoom() {
    const item = useLocalSearchParams()
    const router = useRouter()
    const{user}= useAuth()
    const [messages,setMessages]=useState([])
   // console.log('Got item',item)
   const textRef = useRef('')
   const inputRef=useRef(null)
   const scrollViewRef =useRef(null)

   useEffect(()=>{
    createRoomIfNotExist()

    const roomId = getRoomId(user.userId,item.userId)
    const docRef = doc(db,'rooms',roomId)
    const messageRef = collection(docRef,'messages')
    const q = query(messageRef,orderBy('createdAt','asc'))

    let unsub = onSnapshot(q,(snapshot)=>{
        let allMessages = snapshot.docs.map(doc=>{
            return doc.data()
        })
        setMessages([...allMessages])
    })

    const KeyboardAvoidingView = Keyboard.addListener(
        'keyboardDidShow',updateScrollView
    )
    return ()=>{
        unsub()
        KeyboardAvoidingView.remove()

    }

    


   },[])

   useEffect(()=>{
   updateScrollView()
   },[messages])
   const updateScrollView = ()=>{
    setTimeout(()=>{
        scrollViewRef?.current?.scrollToEnd({animated:true})

    },100)
   }

   const createRoomIfNotExist = async()=>{
    const roomId = getRoomId(user?.userId,item?.userId)
    await setDoc(doc(db,'rooms',roomId),{
        roomId,
        createdAt:Timestamp.fromDate(new Date())
    })
   }
   const handleSendMessage = async ()=>{
    let message = textRef.current.trim()
    if(!message){
        return
    }
    try {
        let roomId = getRoomId(user?.userId,item?.userId)
        const docRef = doc(db,'rooms',roomId)
        const messageRef = collection(docRef,'messages')
        textRef.current=''
        if(inputRef){
            inputRef?.current?.clear()
        }
        const newDoc = await addDoc(messageRef,{
            userId:user?.userId,
            text:message,
            profileUrl:user?.profileUrl,
            senderName:user?.username,
            createdAt:Timestamp.fromDate(new Date())
        })
        console.log('New message',newDoc.id)
        
    } catch (error) {
        Alert.alert('Message',error.message)        
    }
   }
   //console.log('Messages',messages)
  return (
    <View className='flex-1 bg-white'>
        <StatusBar barStyle={'dark-content'}/>
        <ChatRoomHeader user={item} router={router}/>
        <View className='h-3 border-b border-neutral-300'/>
        <View className='flex-1 justify-between bg-neutral-100 overflow-visible'>
            <View className='flex-1'>
                <MessageList scrollViewRef={scrollViewRef} messages={messages} currentUser={user}/>
            </View>
            <View style={{marginBottom:hp(1.7)}} className='pt-2'>
                
                    <View className='flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full'>
                        <TextInput
                        ref={inputRef}
                        onChangeText={value=>textRef.current=value}
                        placeholder='Type message...'
                        style={{fontSize:hp(2)}}
                        className='flex-1 mr-1'/>
                        <View className='p-2 bg-neutral-200 mr-[1px] rounded-full'>
                        <TouchableOpacity onPress={handleSendMessage}>
                            <Feather name='send' size={hp(2.7)} color={'#737373'}/>
                        </TouchableOpacity>

                        </View>
                        
                    </View>
            

            </View>
        </View>
    </View>
  )
}