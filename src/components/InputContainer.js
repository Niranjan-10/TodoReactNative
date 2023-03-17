import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, Pressable, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { addInLocalTodo, addTodo, resetState } from '../features/todo/TodoSlice';
import { getRandomInt } from '../utils';

function InputContainer() {
  const dispatch = useDispatch();
  const {isLoading, error, addTodoSuccess, todo, formState} = useSelector(
    state => state.todos,
  );

  const {control, handleSubmit, reset, setValue, watch} = useForm({
    defaultValues: {
      title: '',
      completed: false,
    },
  });

  useEffect(() => {
    if (addTodoSuccess) {
      dispatch(addInLocalTodo());
      dispatch(resetState());
      reset({
        title: '',
        completed: false,
      });
    }
  }, [addTodoSuccess]);

  const watchTitle = watch('title');

  const onSubmit = data => {
    dispatch(
      addTodo({
        ...data,

        id: getRandomInt(),
        userId: getRandomInt(),
      }),
    );
    Keyboard.dismiss(); 
  };

  const checkDisable = () => {
    return watchTitle.length <= 0 || isLoading;
  };

  return (
    <View style={styles.inputWrapper}>
      <Controller
        name="title"
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            mode="outlined"
            placeholder="Write your todo..."
            value={value}
            onChangeText={value => onChange(value)}
            name="title"
            style={styles.input}
            onSubmitEditing={Keyboard.dismiss}
          />
        )}
      />
      <Pressable disabled={checkDisable()} onPress={handleSubmit(onSubmit)}>
        <EvilIcons name="circle-with-plus" style={styles.icon} size={48} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: '84%',
    marginRight: 4,
    height: 42,
  },
  button: {
    width: 50,
  },
  icon: {
    color: '#645CBB',
  },
});

export default InputContainer;
