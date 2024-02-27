import { View, Text ,Button, ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import ChatList from '../../components/ChatList'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { userRef } from '../../firebaseConfig'
import { getDocs, query, where } from 'firebase/firestore'

export default function Home() {
  const {user} = useAuth()
  const[users,setUsers] = useState([])

  useEffect(()=>{
    if(user?.uid){
      getUsers()
    }
  },[])

  const getUsers = async ()=>{
    // Fetch all users except currently logged in user
    
    const q = query(userRef,where('userId','!=',user?.uid))
    const querySnapshot = await getDocs(q)
    let data = []
    querySnapshot.forEach(doc=>{
      data.push({...doc.data()})
    })
    setUsers(data)
  }

  return (
    <View className='bg-white flex-1'>
      {
        users.length>0?(
          <ChatList users={users} currentUser={user}/>

        ):(
          <View className='flex items-center' style={{top:hp(35)}}>  
            <ActivityIndicator size={'large'}/>
            </View>
        )
      }
   
    </View>
  )
}