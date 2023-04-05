import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from "./src/navigation"
import { AuthProvider } from './src/hooks/useAuth';

const App = () => {
    return (
        <NavigationContainer>
            <AuthProvider>
                <Navigation/>
            </AuthProvider>
        </NavigationContainer>
    )
}

export default App;