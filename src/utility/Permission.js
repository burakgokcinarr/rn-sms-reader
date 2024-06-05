import { PermissionsAndroid } from 'react-native';

export const requestSmsPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
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
