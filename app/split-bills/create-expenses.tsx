import { Input, CheckBox } from '@ui-kitten/components';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { styles } from '@/assets/styles/create.styles';
import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useGroups } from '@/hooks/useGroup';
import { Dropdown } from 'react-native-element-dropdown';
interface FormData {
  groupName: string;
  title: string;
  amount: number;
  divideEqually: boolean;
  selectedUsers: string[];
}

const CreateExpense: React.FC = () => {
    const { groups, loading, error, refresh } = useGroups();
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      groupName: '',
      title: '',
      amount: undefined,
      divideEqually: true,
      selectedUsers: [],
    },
  });

  const [users] = useState<{ email: string }[]>([
    { email: 'user1@example.com' },
    { email: 'user2@example.com' },
    { email: 'user3@example.com' },
  ]);

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const amount = watch('amount');
  const divideEqually = watch('divideEqually');
  const selectedUsers = watch('selectedUsers') || [];

  const perUserAmount = divideEqually
    ? amount / users.length || 0
    : selectedUsers.length > 0
    ? amount / selectedUsers.length
    : 0;

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
              name="groupName"
              control={control}
              rules={{ required: "Group name is required" }}
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
                    // setValue(item.value);
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
          {errors.groupName && (
            <Text style={{ color: "red" }}>{errors.groupName.message}</Text>
          )}

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
              rules={{ required: "Title is required" }}
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
          {errors.title && (
            <Text style={{ color: "red" }}>{errors.title.message}</Text>
          )}
          </View>


          {/* Amount */}
          
          <View style={styles.amountContainer}>
            <Text style={styles.currencySymbol}>NPR</Text>
            <Controller
              control={control}
              name="amount"
              rules={{ required: "Amount is required" }}
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
          {errors.amount && (
            <Text style={{ color: "red" }}>{errors.amount.message}</Text>
          )}

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

          {/* Equal Division Display */}
          {divideEqually ? (
            <View style={{ marginBottom: 12 }}>
              <Text
                style={{ fontSize: 16, fontWeight: "500", marginBottom: 4 }}
              >
                Amount per person:
              </Text>
              <Text style={{ fontSize: 16, color: COLORS.primary }}>
                NPR {perUserAmount.toFixed(2)}
              </Text>
            </View>
          ) : (
            <View style={{ marginBottom: 12 }}>
              <Text style={styles.sectionTitleText}>Select Users</Text>
              {users.map((user) => {
                const isChecked = selectedUsers.includes(user.email);

                return (
                  <View
                    key={user.email}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginVertical: 6,
                      padding: 10,
                      backgroundColor: "#f6f6f6",
                      borderRadius: 8,
                    }}
                  >
                    <CheckBox
                      checked={isChecked}
                      onChange={(checked) => {
                        const updated = [...selectedUsers];
                        if (checked && !isChecked) {
                          updated.push(user.email);
                        } else if (!checked && isChecked) {
                          const index = updated.indexOf(user.email);
                          if (index > -1) updated.splice(index, 1);
                        }
                        setValue("selectedUsers", updated, {
                          shouldValidate: true,
                        });
                      }}
                    >
                      {user.email}
                    </CheckBox>
                    {isChecked && (
                      <Text style={{ fontSize: 14, color: COLORS.primary }}>
                        NPR {perUserAmount.toFixed(2)}
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>
          )}

          {/* Submit */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Create Expense</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreateExpense;
