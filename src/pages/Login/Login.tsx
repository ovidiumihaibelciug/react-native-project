import React, {useState} from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import Input from '../../components/Input';
import GlobalButton from '../../components/Button/Button';
import {loginUser} from '../../utilities/api';
import axios from 'axios';
import {_storeUserTokens} from '../../utilities/functions';

const Login = ({navigation}) => {
  const globalStyle = {
    flex: 1,
    height: '100%',
    backgroundColor: '#151515',
    color: 'white',
  };

  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const handleLogin = () => {
    loginUser(data)
      .then(({data}: any) => {
        setData({
          username: '',
          password: '',
        });

        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${data?.token}`;

        _storeUserTokens(data);
        navigation.navigate('Feed');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleChange = ({name, value}: {name: string; value: string}) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <View style={globalStyle}>
      <View style={styles.inputs}>
        <Input
          placeholder="email"
          value={data?.username}
          onChangeText={text => {
            handleChange({name: 'username', value: text});
          }}
        />
        <Input
          placeholder="password"
          value={data?.password}
          onChangeText={text => {
            handleChange({name: 'password', value: text});
          }}
          secureTextEntry={true}
        />
        <View style={styles.forgotPasword}>
          <Text
            style={styles.forgotPaswordText}
            onPress={() => {
              Alert.alert('Forgot password.');
            }}>
            Forgot password?
          </Text>
        </View>
        <View style={styles.buttons}>
          <Button title="sign up" color="#696969" onPress={() => {}} />
          <GlobalButton title="sign in" onPress={handleLogin} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputs: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttons: {
    width: 300,
    marginTop: 20,
  },
  button: {
    color: 'white',
  },
  forgotPasword: {
    width: '100%',
  },
  forgotPaswordText: {
    textAlign: 'right',
    color: '#696969',
  },
});

export default Login;
