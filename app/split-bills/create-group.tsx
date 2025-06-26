import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { styles } from "@/assets/styles/split-bills/create-group.style.js";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors.js";
import { Controller, useForm } from "react-hook-form";
import SplitBillCategory from "@/constants/split-bill-category.js";
import { MultiSelect } from "react-native-element-dropdown";
import type { IMultiSelectRef } from "react-native-element-dropdown";
import { useGroups } from "@/hooks/useGroup";
import { set } from "date-fns";
import  { useUsers } from "@/hooks/useUsers";


const data = [
  { label: "Apple", value: "1" },
  { label: "Banana", value: "2" },
  { label: "Cherry", value: "3" },
  { label: "Grapes", value: "4" },
  { label: "Mango", value: "5" },
];
const Creategroup = () => {
  const [selected, setSelected] = useState([]);
  const categories = SplitBillCategory;
  const [loading, setLoading] = useState(false);
  const { createGroup } = useGroups();
  const { users,loadingUsers,fetchUsers,error } = useUsers();

 
  useEffect(() => {
    async () => {
      try {
        await fetchUsers();
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

  }, []);

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
      name: "",
      type: "",
      members: [ ],
    },
  });
  const selectedType = watch("type");
  const onSubmit = async (data: any) => {
    console.log("Form Data:", data);
    //  await createGroup(data)
    //  setLoading(false);
  };
  const dropdownRef = useRef<IMultiSelectRef>(null); // ✅ Properly typed ref
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Group</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.inputLabel}>Group Name</Text>
        <View style={styles.inputContainer}>
          <Ionicons
            name="create-outline"
            size={22}
            color={COLORS.textLight}
            style={styles.inputIcon}
          />
          <Controller
            control={control}
            name="name"
            rules={{ required: "Group name is required" }}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Group Name"
                placeholderTextColor={COLORS.textLight}
                style={styles.input}
              />
            )}
          />
        </View>
        {errors.name && (
          <Text style={{ color: "red" }}>{errors.name.message}</Text>
        )}

        <View style={{ marginVertical: 20 }}>
          <Text style={styles.inputLabel}>Type</Text>
          <View style={styles.categoryGrid}>
            {categories.map((category: any) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedType === category.id && styles.categoryButtonActive,
                ]}
                onPress={() =>
                  setValue("type", category.id, { shouldValidate: true })
                }
              >
                <Ionicons
                  name={category.icon}
                  size={24}
                  color={
                    selectedType === category.id
                      ? COLORS.white
                      : COLORS.textLight
                  }
                />
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedType === category.id &&
                      styles.categoryButtonTextActive,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* dropDown */}
        <View style={styles.dropDownContainer}>
          <Text style={styles.inputLabel}>Members</Text>
          <Controller
        control={control}
        name="members"
        render={({ field: { onChange, value } }) => (
          <MultiSelect
            ref={dropdownRef}
            style={styles.dropdown}
            data={users}
            labelField="email"
            valueField="email"
            placeholder="Select members"
            search
            value={value}
            onChange={(items: string[]) => {
              onChange(items); // updates react-hook-form value
              setTimeout(() => dropdownRef.current?.close(), 100);
            }}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={styles.placeholderStyle}
            selectedStyle={styles.selectedStyle}
          />
        )}
      />
          {/* <MultiSelect
            ref={dropdownRef}
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={users}
            labelField="email"
            valueField="email"
            placeholder="Select members"
            search
            searchPlaceholder="Search..."
            value={selected}
            onChange={(item:any) => {
              console.log("Selected Item:", item);
              setSelected( item);
              setTimeout(() => {
                dropdownRef.current?.close();
              }, 100);
            }}
            selectedStyle={styles.selectedStyle} // for tag-like UI
          /> */}
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
          disabled={loading}
        >
          {loading ? (
            <Text style={styles.buttonText}>Creating...</Text> // Replace with spinner if you prefer
          ) : (
            <Text style={styles.buttonText}>Create</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Creategroup;
