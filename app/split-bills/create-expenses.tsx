import { Input, CheckBox } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { styles } from '@/assets/styles/create.styles';
import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useGroups } from '@/hooks/useGroup';
import { Dropdown } from 'react-native-element-dropdown';
import { useUsers } from '@/hooks/useUsers';
import { User } from '@/Interface/userInterface';

interface SelectedUserAmount {
  userId: string;
  amount: number;
}

interface FormData {
  groupId: string;
  title: string;
  amount: number;
  divideEqually: boolean;
  selectedUsers: SelectedUserAmount[];
}

const CreateExpense: React.FC = () => {
  const { groups, loading, error, refresh } = useGroups();
  const { users, loadingUsers, fetchUsers } = useUsers();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      groupId: '',
      title: '',
      amount: 0,
      divideEqually: true,
      selectedUsers: [],
    },
  });

  const amount = watch('amount');
  const divideEqually = watch('divideEqually');
  const selectedUsers = watch('selectedUsers') || [];

  // Calculate per user amount (default 0 if no users)
  const perUserAmount =
    divideEqually && users.length > 0
      ? amount / users.length
      : selectedUsers.length > 0
      ? amount / selectedUsers.length
      : 0;

  // When divideEqually changes, update selectedUsers with equal amounts rounded to 2 decimals
  useEffect(() => {
    // if (divideEqually && users.length > 0) {
    //   const roundedAmount = parseFloat((perUserAmount).toFixed(2));
    //   const allUsersWithAmount = users.map((u: User) => ({
    //     userId: u.clerk_id,
    //     amount: roundedAmount,
    //   }));
    //   setValue('selectedUsers', allUsersWithAmount, { shouldValidate: true });
    // }
    if (divideEqually && users.length > 0) {
      const numUsers = users.length;
      const base = Math.floor((amount / numUsers) * 100) / 100; // Floor to 2 decimals
      const remainder = parseFloat((amount - base * numUsers).toFixed(2));
    
      const amounts = Array(numUsers).fill(base);
      for (let i = 0; i < Math.round(remainder * 100); i++) {
        amounts[i] += 0.01; // Distribute remaining cents
      }
    
      const allUsersWithAmount = users.map((u:User, idx) => ({
        userId: u.clerk_id,
        amount: parseFloat(amounts[idx].toFixed(2)),
      }));
    
      setValue('selectedUsers', allUsersWithAmount, { shouldValidate: true });
    }
    
  }, [divideEqually, amount, users]);

  // Toggle user selection on checkbox
  const toggleUser = (userId: string, checked: boolean) => {
    let updated: SelectedUserAmount[] = [...selectedUsers];

    if (checked) {
      if (!updated.find((u) => u.userId === userId)) {
        updated.push({ userId, amount: 0 }); // temp amount, will recalc below
      }
    } else {
      updated = updated.filter((u) => u.userId !== userId);
    }

    // Recalculate amounts equally among updated users, rounded to 2 decimals
    if (amount && updated.length > 0) {
      const equalAmount = parseFloat((amount / updated.length).toFixed(2));
      updated = updated.map((u) => ({ ...u, amount: equalAmount }));
    }

    setValue('selectedUsers', updated, { shouldValidate: true });
  };

  // Update user amount when input changes
  const updateUserAmount = (userId: string, newAmount: number) => {
    const updated = selectedUsers.map((u) =>
      u.userId === userId ? { ...u, amount: newAmount } : u
    );
    setValue('selectedUsers', updated, { shouldValidate: true });
  };

  const onSubmit = (data: FormData) => {
    // Validate total of user amounts <= total amount
    const totalUserAmount = data.selectedUsers.reduce((sum, u) => sum + u.amount, 0);
    if (totalUserAmount > data.amount) {
      alert('Error: Total user amounts exceed total amount');
      return;
    }
    console.log('Submitted data:', data);
    // Send data to backend here...
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Expense</Text>
      </View>

      <KeyboardAwareScrollView>
        <View style={styles.card}>
          {/* Group Name */}
          <Text style={styles.inputLabel}>Group</Text>
          <View style={styles.inputDropdownContainer}>
            <Controller
              name="groupId"
              control={control}
              rules={{ required: 'Group name is required' }}
              render={({ field }) => (
                <Dropdown
                  style={styles.input}
                  placeholderStyle={styles.placeholderStyle}
                  data={groups}
                  search
                  maxHeight={300}
                  labelField="name"
                  valueField="id"
                  placeholder="Select Group"
                  searchPlaceholder="Search Group..."
                  value={field.value}
                  onChange={(item) => {
                    setValue('groupId', item.id);
                  }}
                  renderLeftIcon={() => (
                    <Ionicons
                      name="people-outline"
                      size={22}
                      color={COLORS.textLight}
                      style={styles.inputIcon}
                    />
                  )}
                />
              )}
            />
          </View>
          {errors.groupId && <Text style={{ color: 'red' }}>{errors.groupId.message}</Text>}

          {/* Title */}
          <View style={{ marginTop: 20 }}>
            <Text style={styles.inputLabel}>Title</Text>
            <View style={[styles.inputContainer, styles.inputMarginContainer]}>
              <Ionicons
                name="create-outline"
                size={22}
                color={COLORS.textLight}
                style={styles.inputIcon}
              />
              <Controller
                name="title"
                control={control}
                rules={{ required: 'Title is required' }}
                render={({ field }) => (
                  <TextInput
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="Expense Title"
                    placeholderTextColor={COLORS.textLight}
                    style={styles.input}
                  />
                )}
              />
            </View>
            {errors.title && <Text style={{ color: 'red' }}>{errors.title.message}</Text>}
          </View>

          {/* Amount */}
          <View style={styles.amountContainer}>
            <Text style={styles.currencySymbol}>NPR</Text>
            <Controller
              control={control}
              name="amount"
              rules={{ required: 'Amount is required' }}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  value={value?.toString()}
                  onChangeText={(text) => {
                    const floatVal = parseFloat(text);
                    onChange(isNaN(floatVal) ? 0 : floatVal);
                  }}
                  onBlur={onBlur}
                  placeholder="0.00"
                  keyboardType="numeric"
                  placeholderTextColor={COLORS.textLight}
                  style={styles.amountInput}
                />
              )}
            />
          </View>
          {errors.amount && <Text style={{ color: 'red' }}>{errors.amount.message}</Text>}

          {/* Divide Equally */}
          <Controller
            name="divideEqually"
            control={control}
            render={({ field }) => (
              <CheckBox
                checked={field.value}
                onChange={(checked) => field.onChange(checked)}
                style={{ marginVertical: 12 }}
              >
                Divide Equally
              </CheckBox>
            )}
          />

          {/* Display based on divideEqually */}
          {divideEqually ? (
            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 4 }}>
                Amount per person:
              </Text>
              <Text style={{ fontSize: 16, color: COLORS.primary }}>
                NPR {perUserAmount.toFixed(2)}
              </Text>
            </View>
          ) : (
            <View style={{ marginBottom: 12 }}>
              <Text style={styles.sectionTitleText}>Select Users</Text>
              {users.map((user: User) => {
                const selectedUser = selectedUsers.find((u) => u.userId === user.clerk_id);
                const isChecked = !!selectedUser;
                const userAmount = selectedUser?.amount ?? 0;

                return (
                  <View
                    key={user.clerk_id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginVertical: 6,
                      padding: 10,
                      backgroundColor: '#f6f6f6',
                      borderRadius: 8,
                    }}
                  >
                    <CheckBox
                      checked={isChecked}
                      onChange={(checked) => toggleUser(user.clerk_id, checked)}
                      style={{ flex: 1 }}
                    >
                      {user.name || user.email}
                    </CheckBox>

                    {isChecked && (
                      <TextInput
                        style={{
                          width: 80,
                          height: 36,
                          borderWidth: 1,
                          borderColor:
                            selectedUsers.reduce((sum, u) => sum + u.amount, 0) > amount
                              ? 'red'
                              : '#ccc',
                          borderRadius: 6,
                          paddingHorizontal: 8,
                          textAlign: 'right',
                        }}
                        keyboardType="numeric"
                        value={userAmount.toFixed(2)}
                        onChangeText={(text) => {
                          const val = parseFloat(text);
                          updateUserAmount(user.clerk_id, isNaN(val) ? 0 : val);
                        }}
                      />
                    )}
                  </View>
                );
              })}
              {/* Show error if total of selected amounts exceeds total */}
              {selectedUsers.reduce((sum, u) => sum + u.amount, 0) > amount && (
                <Text style={{ color: 'red', marginTop: 4 }}>
                  Total of individual amounts exceeds total amount!
                </Text>
              )}
            </View>
          )}

          {/* Submit */}
          <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
            <Text style={styles.buttonText}>Create Expense</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreateExpense;
