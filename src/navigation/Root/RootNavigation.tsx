import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {styles} from './RootNavigation.style';

import {SafeAreaProvider, initialWindowMetrics} from 'react-native-safe-area-context';
import {SplashScreen} from '../../components/screen/SplashScreen/SplashScreen.component';
import {AuthContext} from '../../hooks/useAuth';
import {MainNavigation} from '../Main/MainNavigation';
import {RootStackParamList} from './RootNavigation.type';

const Stack = createStackNavigator<RootStackParamList>();

// Splash ekranı içeriği
const SplashScreenWrapper = ({navigation}: any) => {
  // Splash ekranından sonra ana sayfaya geçiş yapılacak
  const handleSplashFinish = () => {
    navigation.replace('Main');
  };

  return <SplashScreen onFinish={handleSplashFinish} />;
};

// Root Navigator
export const RootNavigation: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>('dummy-token');

  useEffect(() => {
    // Uygulama başlarken token kontrolü yap
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token || 'dummy-token');
      } catch (error) {
        console.error('Token kontrolü sırasında hata:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  // Auth işlevleri
  const authContext = {
    signIn: async (token: string) => {
      try {
        await AsyncStorage.setItem('userToken', token);
        setUserToken(token);
      } catch (error) {
        console.error('Oturum açılırken hata oluştu:', error);
      }
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
        setUserToken('dummy-token'); // Her zaman oturum açık durumda
      } catch (error) {
        console.error('Oturum kapatılırken hata oluştu:', error);
      }
    },
    isLoading,
    userToken,
  };

  return (
    <AuthContext.Provider value={authContext}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <View style={styles.container}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Splash" component={SplashScreenWrapper} />
              <Stack.Screen name="Main" component={MainNavigation} />
            </Stack.Navigator>
          </View>
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
};
