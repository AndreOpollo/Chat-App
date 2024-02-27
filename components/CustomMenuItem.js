import { Text, View } from 'react-native'
import {MenuOption} from 'react-native-popup-menu'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
export const MenuItem = ({text,value,action,icon})=>{
    return(
        <MenuOption onSelect={()=>action(value)}>
            <View className='flex-row justify-between items-center px-4 py-1'>
                <Text style={{fontSize:hp(1.7)}} className='font-semibold text-neutral-600'>{text}</Text>
                {icon}
            </View>
        </MenuOption>
    )
}