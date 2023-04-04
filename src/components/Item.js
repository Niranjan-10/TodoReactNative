import {Pressable, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  ITEM,
  ITEM_COMPLETED,
  ITEM_PENDING,
  ITEM_UPDATE,
} from '../AccessibilityConstants';
import {updateTodo} from '../features/todo/TodoSlice';
import {Colors} from '../utils';

function Item({item, handleUpdateDialog, handleCompleted, handlePending}) {
  return (
    <View
      style={item.completed ? [styles.item, styles.completedItem] : styles.item}
      accessible={true}
      accessibilityLabel={ITEM}
      testID={ITEM}>
      <View>
        {item.completed ? (
          <Pressable
            accessible={true}
            accessibilityLabel={ITEM_COMPLETED}
            testID={ITEM_COMPLETED}
            onPress={() => handlePending()}>
            <MaterialCommunityIcons
              style={styles.icon}
              name="checkbox-marked-outline"
              size={20}
            />
          </Pressable>
        ) : (
          <Pressable
            accessible={true}
            accessibilityLabel={ITEM_PENDING}
            testID={ITEM_PENDING}
            onPress={() => handleCompleted()}>
            <MaterialCommunityIcons
              style={styles.icon}
              name="checkbox-blank-outline"
              size={20}
            />
          </Pressable>
        )}
      </View>
      <Pressable
        accessible={true}
        accessibilityLabel={ITEM_UPDATE}
        testID={ITEM_UPDATE}
        onPress={() => {
          handleUpdateDialog();
        }}
        style={styles.itemText}>
        <Text
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
        <Pressable onPress={() => setDeleteDialog(true)}>
          <MaterialIcons style={styles.icon} name="delete" size={20} />
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
