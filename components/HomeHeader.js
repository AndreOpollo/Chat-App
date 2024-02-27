import { View, Text, Platform } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { blurhash } from '../utils/Constants'
import { useAuth } from '../context/authContext'
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import { MenuItem } from './CustomMenuItem'
import { AntDesign, Feather } from '@expo/vector-icons'

const ios = Platform.OS == 'ios'
export default function HomeHeader() {
    const{user,logout} = useAuth()
    const {top} = useSafeAreaInsets()

    const handleProfile = ()=>{

    }
    const handleLogout = async ()=>{
        await logout()
    }
  return (
    <View style={{paddingTop: ios?top:top+10,elevation:20}}
    className='flex-row justify-between bg-indigo-400 px-5 pb-6 rounded-b-3xl shadow'>
     <View>
        <Text style={{fontSize:hp(3)}} className='text-white font-medium'>Chats</Text>

     </View>
     <View>
     <Menu>
        <MenuTrigger>
            <Image
            style={{
                height:hp(4.3),
                aspectRatio:1,
                borderRadius:100
            }}
            source={user?.profileUrl}
            placeholder={blurhash}
            transition={500}
             />    

        </MenuTrigger>
        <MenuOptions
        customStyles={{
            optionsContainer:{
                backgroundColor:"white",
                borderCurve:"continuous",
                borderRadius:10,
                marginTop:40,
                marginLeft:-30,
                width:150
            }
        }}>
            <MenuItem 
            text='Profile'
            icon={<Feather name='user' size={hp(2.5)} color='#737373'/>}
            action={handleProfile}
            value={null}
            />
            <Divider/>
            <MenuItem
            text='Sign Out'
            icon={<AntDesign name='logout' size={hp(2.5)} color='#737373'/>}
            value={null}
            action={handleLogout}/>    
        </MenuOptions>
        
     </Menu>   
      
     </View>
    </View>
  )
}
const Divider = ()=>{
    return (
        <View className='p-[1px] w-full bg-neutral-200'/>

        
    )
}