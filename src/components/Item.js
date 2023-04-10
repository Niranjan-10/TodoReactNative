import {Pressable, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  ITEM,
  ITEM_COMPLETED,
  ITEM_DELETE,
  ITEM_PENDING,
  ITEM_UPDATE,
} from '../AccessibilityConstants';
import {updateTodo} from '../features/todo/TodoSlice';
import {Colors} from '../utils';

function Item({item, handleUpdateDialog, handleCompleted, handlePending, handleDelete}) {
  return (
    <View
      style={item.completed ? [styles.item, styles.completedItem] : styles.item}
      accessible={true}
      accessibilityLabel={ITEM + item.id}
      testID={ITEM + item.id}>
      <View>
        {item.completed ? (
          <Pressable onPress={() => handlePending()}>
            <MaterialCommunityIcons
              accessible={true}
              accessibilityLabel={ITEM_COMPLETED + item.id}
              testID={ITEM_COMPLETED + item.id}
              style={styles.icon}
              name="checkbox-marked-outline"
              size={20}
            />
          </Pressable>
        ) : (
          <Pressable onPress={() => handleCompleted()}>
            <MaterialCommunityIcons
              accessible={true}
              accessibilityLabel={ITEM_PENDING + item.id}
              testID={ITEM_PENDING + item.id}
              style={styles.icon}
              name="checkbox-blank-outline"
              size={20}
            />
          </Pressable>
        )}
      </View>
      <Pressable
        onPress={() => {
          handleUpdateDialog();
        }}
        style={styles.itemText}>
        <Text
          accessible={true}
          accessibilityLabel={ITEM_UPDATE + item.id}
          testID={ITEM_UPDATE + item.id}
          ellipsizeMode="tail"
          numberOfLines={1}
          style={{
            fontWeight: '600',
            color: '#ffffff',
          }}>
          {item.title}
        </Text>
      </Pressable>
      <View style={styles.iconContainer}>
        <Pressable onPress={() => handleDelete()}>
          <MaterialIcons
            accessible={true}
            accessibilityLabel={ITEM_DELETE}
            testID={ITEM_DELETE}
            style={styles.icon}
            name="delete"
            size={20}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginVertical: 4,
    borderRadius: 8,
  },
  itemText: {
    flex: 2,
    marginHorizontal: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completedItem: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  icon: {
    color: Colors.white,
  },
});

export default Item;
