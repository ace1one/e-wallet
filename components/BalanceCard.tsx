import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/assets/styles/home.styles'
import { TransactionSummary } from '@/Interface/transactions'
import { COLORS } from '@/constants/colors'
import AmountMasking from './AmountMasking'
import { maskAmount } from "@/lib/utils.js";
import { Image } from 'expo-image'
import RupeeIcon from '@/assets/images/rupee.svg';

const BalanceCard = ({ summary }: { summary: TransactionSummary }) => {
    const [isAmountShow, setIsAmountShow] = React.useState(true)

  return (
    <View style= { styles.balanceCard }>
     <Text style={ styles.balanceTitle}>Total Balance</Text>
     
        <View style={[styles.balanceCardContainer,{ marginBottom: 20}]}>
            <RupeeIcon height={28} width={28} stroke={COLORS.primary} />
            <Text style={styles.balanceAmount}>
                {maskAmount(summary?.balance, !isAmountShow)} 
            </Text>
            <TouchableOpacity  onPress={()=> setIsAmountShow(prev=> !prev)}>
                <AmountMasking isAmountShow={isAmountShow} />
            </TouchableOpacity>
        </View>

        <View style={ styles.balanceStats}>
            <View style={ styles.balanceStatItem}>
                <Text style={ styles.balanceStatLabel}>
                    Income
                </Text>
                <View style={ styles.balanceCardContainer}>
                    <RupeeIcon height={18} width={18} stroke={COLORS.primary} />
                    <Text style={[styles.balanceStatAmount, { color:COLORS.income}]}>
                        {maskAmount(summary?.income, !isAmountShow)} 
                    </Text>
                </View>
               
            </View>
            <View style={[ styles.balanceStatItem, styles.statDivider]} />
            <View style={ styles.balanceStatItem}>
                <Text style={ styles.balanceStatLabel}>
                    Expenses
                </Text>
                <View style={ styles.balanceCardContainer}>
                    <RupeeIcon height={18} width={18} stroke={COLORS.primary} />
                    <Text style={[styles.balanceStatAmount, { color:COLORS.expense}]}>
                    {maskAmount(summary?.expenses, !isAmountShow)}
                    </Text>
                </View>
                
            </View>
            
        </View>
    </View>
  )
}

export default BalanceCard