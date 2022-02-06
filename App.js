import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import notifee from '@notifee/react-native';

export default function App() {

  async function onDisplayNotification() {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      },
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Teste Notifee</Text>
      <TouchableOpacity style={styles.btn} onPress={() => onDisplayNotification()}>
        <Text style={styles.text}>Clique aqui</Text>
      </TouchableOpacity>
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
    color: '#fff'
  }
});
