import { View, Text,Image,TextInput,Pressable, TouchableOpacity, Alert, KeyboardAvoidingView} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useRef, useState } from 'react'
import { Octicons,Feather } from '@expo/vector-icons';
import {useRouter} from 'expo-router'
import Loading from '../components/loading';
import CustomKeyboardView from '../components/customKeyboardView';
import { useAuth } from '../context/authContext';



export default function SignUp() {
    const router = useRouter()
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const usernameRef = useRef('')
    const profileRef = useRef('')
    const{register}=useAuth()
    const[loading,setLoading] = useState(false)

    const handleClick = async()=>{
        if(!emailRef.current||!passwordRef.current||!usernameRef.current||!profileRef.current){
            Alert.alert('Sign Up','Please fill all the fields!')
            return
        }
        setLoading(true)
        const response = await register(emailRef.current,
          passwordRef.current,
          usernameRef.current,
          profileRef.current)
          setLoading(false)
          console.log('response',response)
          if(!response.success){
            Alert.alert('Sign Up',response.msg)

          }
        
    }
  return (
    <CustomKeyboardView>
        <View style={{paddingTop:hp(8),paddingHorizontal:wp(5)}} className='flex-1 gap-12'>
            <View  className='items-center'>
                <Image 
                source={require('../assets/images/profile.png.png')}
                style={{
                    height:hp(25)
                }}
                resizeMode='contain'
                />
            </View>
            <View className='gap-10'>
                <View className='gap-4'>
                    <Text style={{fontSize:hp(4)}} className='text-neutral-800 text-center font-bold tracking-wider'>Sign Up</Text>
                    {/* input form */}
                    <View style={{height:hp(7)}}
                    className='flex-row rounded-xl gap-4 px-4 items-center bg-neutral-100'>
                        <Feather name='user' size={hp(2.7)} color={'gray'}/>
                        <TextInput
                        onChangeText={value=>usernameRef.current=value}
                        style={{fontSize:hp(2)}}
                        className='flex-1 font-semibold text-neutral-700'
                        placeholder='Username'
                        placeholderTextColor={'gray'}/>
                    </View>
                    <View style={{height:hp(7)}}
                    className='flex-row rounded-xl gap-4 px-4 items-center bg-neutral-100'>
                        <Octicons name='mail' size={hp(2.7)} color={'gray'}/>
                        <TextInput
                        onChangeText={value=>emailRef.current=value}
                        style={{fontSize:hp(2)}}
                        className='flex-1 font-semibold text-neutral-700'
                        placeholder='Email address'
                        placeholderTextColor={'gray'}/>
                    </View>
                    
                    <View style={{height:hp(7)}}className='flex-row items-center gap-4 px-4 bg-neutral-100 rounded-xl'>
                            <Octicons name='lock' size={hp(2.7)} color={'gray'}/>
                            <TextInput
                            onChangeText={value=>passwordRef.current=value}
                            style={{fontSize:hp(2)}}
                            className='flex-1 font-semibold text-neutral-700'
                            placeholder='Password'
                            secureTextEntry
                            placeholderTextColor={'gray'}
                            />
                    </View>
                    <View style={{height:hp(7)}}
                    className='flex-row rounded-xl gap-4 px-4 items-center bg-neutral-100'>
                        <Octicons name='image' size={hp(2.7)} color={'gray'}/>
                        <TextInput
                        onChangeText={value=>profileRef.current=value}
                        style={{fontSize:hp(2)}}
                        className='flex-1 font-semibold text-neutral-700'
                        placeholder='Profile url'
                        placeholderTextColor={'gray'}/>
                    </View>
                       

                    
                    {/* submit button */}
                    {
                        loading?(
                            <View className='flex-row justify-center'>
                                <Loading size={hp(16)}/>
                            </View>    

                        ):(
                    <TouchableOpacity style={{height:hp(6.5),backgroundColor:"blue",justifyContent:"center", alignItems:"center", borderRadius:20}} 
                    onPress={handleClick}
                    >
                        <Text style={{fontSize:hp(2.7)}}
                         className='text-center text-white font-bold tracking-wider'>Sign Up</Text>
                    </TouchableOpacity>

                        )
                    }
                    
                   <View className='flex-row justify-center'>
                        <Text style={{fontSize:hp(1.8)}} className='font-semibold text-neutral-500'>Already have an account? </Text>
                   <Pressable 
                   onPress={()=>router.push('signin')}>
                         <Text style={{fontSize:hp(1.8)}} className='font-bold text-indigo-500'>Sign In</Text>
                   </Pressable>
                   
                   </View>
               
                    

                </View>
                                
            </View>
            

        </View>
    </CustomKeyboardView>
  )
 }