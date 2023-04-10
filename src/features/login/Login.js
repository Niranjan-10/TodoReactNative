import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Keyboard, StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {
  EMAIL,
  LOGIN_BUTTON,
  PASSWORD,
  TEXT,
} from '../../AccessibilityConstants';
import {TODO_LIST} from '../../NavigationConstants';
import {Colors} from '../../utils';

function Login({navigation}) {
  const [showPassword, setShowPassword] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {control, handleSubmit, reset, watch} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const watchEmail = watch('email');
  const watchPassword = watch('password');

  const handleLogin = () => {
    // const {email, password} = data;
    if (email === 'xyz@gmail.com' && password === '12345') {
      navigation.replace(TODO_LIST);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text
          style={styles.text}
          accessible={true}
          accessibilityLabel={TEXT}
          testID={TEXT}>
          {' '}
          Hey, Welcome back!!{' '}
        </Text>
      </View>

      <View>
        <TextInput
          accessible={true}
          accessibilityLabel={EMAIL}
          testID={EMAIL}
          mode="outlined"
          placeholder="Email"
          value={email}
          onChangeText={value => setEmail(value)}
          name="email"
          style={styles.input}
          onSubmitEditing={Keyboard.dismiss}
        />
        <TextInput
          mode="outlined"
          placeholder="Password.."
          value={password}
          accessible={true}
          accessibilityLabel={PASSWORD}
          testID={PASSWORD}
          maxLength={5}
          onChangeText={value => setPassword(value)}
          name="password"
          style={styles.input}
          onSubmitEditing={Keyboard.dismiss}
        />
        {/* <Controller
          accessible={true}
          accessibilityLabel={EMAIL}
          testID={EMAIL}
          name="email"
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              mode="outlined"
              placeholder="Email"
              value={value}
              onChangeText={value => onChange(value)}
              name="email"
              style={styles.input}
              onSubmitEditing={Keyboard.dismiss}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          accessible={true}
          accessibilityLabel={PASSWORD}
          testID={PASSWORD}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              mode="outlined"
              placeholder="Password"
              value={value}
              secureTextEntry={showPassword}
              right={
                <TextInput.Icon
                  iconColor="#22C55E"
                  name="lock-outline"
                  onPress={() => {
                    setShowPassword(!showPassword);
                    return false;
                  }}
                />
              }
              maxLength={5}
              onChangeText={value => onChange(value)}
              name="password"
              style={styles.input}
              onSubmitEditing={Keyboard.dismiss}
            />
          )}
        /> */}

        <Button
          accessible={true}
          accessibilityLabel={LOGIN_BUTTON}
          testID={LOGIN_BUTTON}
          style={styles.button}
          mode="contained"
          // disabled={!watchEmail || !watchPassword}
          onPress={() => handleLogin()}>
          Login
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 42,
    marginTop: 8,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 24,
  },
  button: {
    marginTop: 16,
    borderRadius: 6,
    height: 42,
  },
  text: {
    fontSize: 18,
    color: Colors.secondary,
    fontWeight: '700',
  },
  textWrapper: {
    alignItems: 'center',
  },
});

export default Login;
