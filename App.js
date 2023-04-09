import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from "./src/navigation"
import { AuthProvider } from './src/hooks/useAuth';
import 'react-native-get-random-values'
import { CustomModal } from './src/components';

const App = () => {
    return (
        <NavigationContainer>
            <AuthProvider>
                <Navigation/>
                <CustomModal/>
            </AuthProvider>
        </NavigationContainer>
    )
}

export default App;