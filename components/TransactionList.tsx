import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/assets/styles/home.styles';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import { formatDate, maskAmount } from '@/lib/utils.js';
import RupeeIcon from '@/assets/images/rupee.svg';
import CATEGORY_ICONS  from '@/constants/category-icons';
import category from '@/constants/category';
import PopoverModal from './Modal';



const TransactionList = ({item, isAmountShow, onDelete}:any) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const isIncome = item.type === 'income';
    const iconName = category.find(cat => cat.name === item.category)?.icon || 'receipt-outline';
    console.log('Transaction Item:', iconName);
  return (
    <View style={ styles.transactionCard} key={item.id}>
        <TouchableOpacity style={ styles.transactionContent}>
            <View style={ styles.categoryIconContainer}>
                <Ionicons name={iconName as any} size={24} color={isIncome ? COLORS.income : COLORS.expense} />
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

        <TouchableOpacity style={ styles.deleteButton} onPress={() => setModalVisible(true)}>
            <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
        </TouchableOpacity>
        <PopoverModal
        visible={modalVisible}
        title="Confirm Delete"
        message="Are you sure you want to delete?"
        buttonName="Delete"
        onCancel={() => setModalVisible(false)}
        onConfirm={()=> onDelete(item.id)}
      />
     
    </View>
  )
}

export default TransactionList