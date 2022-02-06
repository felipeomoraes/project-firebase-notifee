import { StatusBar } from 'expo-status-bar';
import React , { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import notifee from '@notifee/react-native';

import messaging from '@react-native-firebase/messaging';

export default function App() {

  const [token, setToken] = useState('');

  useEffect(() => {
    messaging().getToken()
      .then(theToken => {
        setToken(theToken);
        console.log('Token:', theToken);
      })
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      onDisplayNotification(remoteMessage.notification);
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);


  messaging().setBackgroundMessageHandler(async remoteMessage => {
    // onDisplayNotification(remoteMessage.notification);
    // console.log('Message handled in the background!', JSON.stringify(remoteMessage));
  });

  async function onDisplayNotification(notification) {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    requestUserPermission()

    // Display a notification
    await notifee.displayNotification({
      title: notification.title,
      body: notification.body,
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      },
    });
  }

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.text}>TOKEN FIREBASE</Text>
      <Text style={{ margin: 20 }}>{token}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: "blue",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    margin: 10
  }
});
