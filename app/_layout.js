import { View, Text } from 'react-native'
import React from 'react'
import {Slot,useSegments,useRouter} from 'expo-router'
import "../global.css"
import{useEffect}from 'react'
import {AuthContextProvider, useAuth} from '../context/authContext'
import { MenuProvider } from 'react-native-popup-menu'

const MainLayout = ()=>{
  const{isAuthenticated}=useAuth()
  const segments = useSegments()
  const router = useRouter()
  useEffect(()=>{
   

    if(typeof isAuthenticated=='undefined') return
    const inApp = segments[0]=='(app)'
    if(isAuthenticated && !inApp){
       router.replace('Home')
    }else if(isAuthenticated==false){
      router.replace('signin')
    }
  },[isAuthenticated])

  return <Slot/>
}
export default function Layout() {
  return (
    <MenuProvider>
       <AuthContextProvider>
          <MainLayout/>
      </AuthContextProvider>
  

    </MenuProvider>
  )
}