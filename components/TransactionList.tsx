import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/assets/styles/home.styles';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import { formatDate, maskAmount } from '@/lib/utils.js';
import RupeeIcon from '@/assets/images/rupee.svg';


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

const TransactionList = ({item, isAmountShow, onDelete}:any) => {
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
                <View style={ styles.balanceCardContainer}>
                <RupeeIcon height={14} width={14} stroke={COLORS.primary} />
                <Text style={[styles.transactionAmount, { color: isIncome ? COLORS.income : COLORS.expense }]}>
                    { isIncome ? '+' : '-' } {maskAmount(item?.amount, !isAmountShow)} 
                </Text>
                </View>
               
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