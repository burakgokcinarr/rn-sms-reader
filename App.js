import React, { useEffect } from 'react';
import { NativeEventEmitter, NativeModules, Text, View, PermissionsAndroid, Platform } from 'react-native';

const { SmsListener } = NativeModules;
const smsListenerEmitter = new NativeEventEmitter(SmsListener);

const requestSmsPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      {
        title: "SMS Permission",
        message: "This app needs access to your SMS to listen for messages",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can read SMS");
    } else {
      console.log("SMS permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      requestSmsPermission();
    }

    const subscription = smsListenerEmitter.addListener('SmsReceived', (sms) => {
      console.log('SMS received:', sms);
      alert('SMS received: ' + sms);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View>
      <Text>SMS Listener App</Text>
    </View>
  );
};

export default App;
