import {Text, View} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
const Success = () => {
    return (
        <SafeAreaView style={{backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text style={{color: 'white', fontSize: 32}}> Success!</Text>
        </SafeAreaView>
    );

}

export default Success;