import AsyncStorage from '@react-native-async-storage/async-storage';

export const _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('userData');

    if (value !== null) {
      return JSON.parse(value);
    } else {
      console.log('No user data found.');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
};

export const _storeUserTokens = async (userData: any) => {
  try {
    const userDataJSON = JSON.stringify(userData);

    await AsyncStorage.setItem('userData', userDataJSON);

    console.log('User data saved successfully.');
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};
