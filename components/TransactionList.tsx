import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/assets/styles/home.styles';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import { formatDate } from '@/lib/utils.js';


const CATEGORY_ICONS:any={
    "Food & Drinks": 'fast-food',
    "Health & Fitness": 'heart',
    "Bills & Utilities": 'home',
    Shopping: 'cart',
    Transportation: 'car',
    Entertainment: 'game-controller',
    Travel: 'airplane',
    Education: 'school',
    Income: 'cash',
    Investment: 'trending-up',
    Rent: 'home-outline',
    Other: 'help-circle'
}

const TransactionList = ({item, onDelete}:any) => {
    const isIncome = item.type === 'income';
    const iconName = CATEGORY_ICONS[item.category] || 'pricetag-outline';
  return (
    <View style={ styles.transactionCard} key={item.id}>
        <TouchableOpacity style={ styles.transactionContent}>
            <View style={ styles.categoryIconContainer}>
                <Ionicons name={iconName} size={24} color={isIncome ? COLORS.income : COLORS.expense} />
            </View>
            <View style={ styles.transactionLeft}>
                <Text style={ styles.transactionTitle}>{item.title}</Text>
                <Text style={ styles.transactionCategory}>{item.category}</Text>
            </View>

            <View style={ styles.transactionRight}>
                <Text style={[styles.transactionAmount, { color: isIncome ? COLORS.income : COLORS.expense }]}>
                    NPR { isIncome ? '+' : '-' }{Number(item.amount).toFixed(2)}
                </Text>
                <Text style={ styles.transactionDate}>
                {formatDate(item.created_at)}
                </Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={ styles.deleteButton} onPress={() => onDelete(item.id)}>
            <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
        </TouchableOpacity>
     
    </View>
  )
}

export default TransactionList