import { use, useEffect, useState} from 'react'
import CATEGORY_ICONS  from '@/constants/category-icons';
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo'
import { useForm, Controller, set, useWatch } from 'react-hook-form';
import { TextInput, Text, Button, View, TouchableOpacity } from 'react-native';
import { styles } from '@/assets/styles/create.styles.js';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import { API_URL } from '@/constants/api';
import PageLoader from '@/components/PageLoader';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const create = () => {
  const router = useRouter();
  const { user } = useUser();
  if (!user) {
    router.push('/sign-in');
    return null;
  }

  const [form, setForm] = useState({
    category: '',
    title: '',
    amount: '',
    type: 'expense',
    created_at: new Date().toISOString(),
    user_id: user.id,
    remarks: '',
  });
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(true);
 

    const {
      control,
      handleSubmit,
      formState: { errors, touchedFields },
      watch,
      setValue,
    } = useForm({
      mode: "onTouched",
      reValidateMode: "onChange",
      defaultValues: {
        title: '',
        amount: '',
        category_id: null,
        type: 'expense',
        remarks: '',
      },
    });

    const selectedCategory = watch('category_id');
    const isExpense = watch('type') === 'expense';
    const onSubmit = async (data:any) => {
      console.log(data); // validated form data
      setLoading(true);
      const payload = {
        ...data,
        user_id: user.id,
        created_at: new Date().toISOString(),
      };
      try {
        const response = await fetch(`${API_URL}/transactions/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
    
        const result = await response.json();
    
        if (!response.ok) {
          // ❌ error from server
          setLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Failed to save transaction',
            text2: result.message || 'Something went wrong',
          });
          return
        }
    
        setLoading(false);
        // ✅ only show success when response is OK
        Toast.show({
          type: 'success',
          text1: 'Transaction saved successfully!',
        });
        router.push('/');
      } catch (error:any) {
        console.error('Submit Error:', error.message);
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.message,
        });
      }
    };

    useEffect(() => {
      fetchCategories();
    }, []);

    const fetchCategories =  async() => {
      setLoadingCategory(true);
      try {
        const response = await fetch(`${API_URL}/category`)
        const result = await response.json();
        console.log('Fetched Categories:', result);
        setCategories(result.data);
        setLoadingCategory(false);
      } catch (error:any) {
        setLoadingCategory(false);
        Toast.show({
          position: 'bottom',
          type: 'error',
          text1: 'Failed to load categories',
          text2: error.message || 'Something went wrong',
        });
      }finally {
        setLoadingCategory(false);
      }
    }

    if(loadingCategory) return <PageLoader />

  return (
   
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Transaction</Text>
        {/* <TouchableOpacity
          style={[
            styles.saveButtonContainer,
            loading && styles.saveButtonDisabled,
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          <Text style={styles.saveButton}>
            {loading ? "Saving..." : "Save"}
          </Text>
          {!loading && (
            <Ionicons name="checkmark" size={18} color={COLORS.primary} />
          )}
        </TouchableOpacity> */}
      </View>
      <KeyboardAwareScrollView>
      <View style={styles.card}>
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[styles.typeButton, isExpense && styles.typeButtonActive]}
            onPress={() =>
              setValue("type", "expense", { shouldValidate: true })
            }
          >
            <Ionicons
              name="arrow-down-circle"
              size={22}
              color={isExpense ? COLORS.white : COLORS.expense}
              style={styles.typeIcon}
            />
            <Text
              style={[
                styles.typeButtonText,
                isExpense && styles.typeButtonTextActive,
              ]}
            >
              Expense
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, !isExpense && styles.typeButtonActive]}
            onPress={() => setValue("type", "income", { shouldValidate: true })}
          >
            <Ionicons
              name="arrow-up-circle"
              size={22}
              color={!isExpense ? COLORS.white : COLORS.income}
              style={styles.typeIcon}
            />
            <Text
              style={[
                styles.typeButtonText,
                !isExpense && styles.typeButtonTextActive,
              ]}
            >
              Income
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>NPR</Text>
          <Controller
            control={control}
            name="amount"
            rules={{ required: "Amount is required" }}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
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
        <View style={styles.inputContainer}>
          <Ionicons
            name="create-outline"
            size={22}
            color={COLORS.textLight}
            style={styles.inputIcon}
          />
          <Controller
            control={control}
            name="title"
            rules={{ required: "Title is required" }}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Transaction Title"
                placeholderTextColor={COLORS.textLight}
                style={styles.input}
              />
            )}
          />
        </View>
        {errors.title && (
          <Text style={{ color: "red" }}>{errors.title.message}</Text>
        )}
        <View style={styles.sectionTitle}>
          <Ionicons
            name="pricetag-outline"
            size={16}
            color={COLORS.textLight}
          />
          <Text style={styles.sectionTitleText}>Category</Text>
        </View>
        <View style={styles.categoryGrid}>
          {categories.map((category: any) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.categoryButtonActive,
              ]}
              onPress={() =>
                setValue("category_id", category.id, { shouldValidate: true })
              }
            >
              <Ionicons
                name={category.icon}
                size={24}
                color={
                  selectedCategory === category.id
                    ? COLORS.white
                    : COLORS.textLight
                }
              />
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category.id &&
                    styles.categoryButtonTextActive,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="chatbubble-outline"
            size={22}
            color={COLORS.textLight}
            style={styles.inputIcon}
          />
          <Controller
            control={control}
            name="remarks"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Remarks (optional)"
                placeholderTextColor={COLORS.textLight}
                style={styles.input}
              />
            )}
          />
        </View>



        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
          disabled={loading}
        >
          {loading ? (
            <Text style={styles.buttonText}>Saving...</Text> // Replace with spinner if you prefer
          ) : (
            <Text style={styles.buttonText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>
      </KeyboardAwareScrollView>
    </View>
   

  );
  

}


export const unstable_settings = {
  href: null, // Hide this route from the tab bar
};

export default create