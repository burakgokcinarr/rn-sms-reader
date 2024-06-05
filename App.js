import React, { useEffect, useState } from 'react';
import { NativeEventEmitter, NativeModules, Text, View, Platform, FlatList, StyleSheet } from 'react-native';
import { requestSmsPermission } from './src/utility/Permission';


const { SmsListener }    = NativeModules;
const smsListenerEmitter = new NativeEventEmitter(SmsListener);

export default function App() {

  let newSMS                  = Array();
  const [smsList, setSmsList] = useState([]);

  useEffect(() => {

    if (Platform.OS === 'android') {
      requestSmsPermission();
    }

    const subscription = smsListenerEmitter.addListener('SmsReceived', (sms) => {
      alert('SMS received: ' + sms);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const _renderItem = ({ item }) => {
    console.log(item)
    return (
      <Text>{item}</Text>
    )
  }

  return (
    <View style={style.container}>
      <Text style={style.title}>Listen to incoming SMS from React Native App using React Native Bridge</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold'
  }
})