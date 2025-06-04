import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '@/assets/styles/home.styles'
import { TransactionSummary } from '@/Interface/transactions'
import { COLORS } from '@/constants/colors'

const BalanceCard = ({ summary }: { summary: TransactionSummary }) => {
  return (
    <View style= { styles.balanceCard }>
     <Text style={ styles.balanceTitle}>Total Balance</Text>
        <Text style={styles.balanceAmount}>
            ${Number(summary?.balance).toFixed(2)}
        </Text>

        <View style={ styles.balanceStats}>
            <View style={ styles.balanceStatItem}>
                <Text style={ styles.balanceStatLabel}>
                    Income
                </Text>
                <Text style={[styles.balanceStatAmount, { color:COLORS.income}]}>
                    ${Number(summary?.income).toFixed(2)}
                </Text>
            </View>
            <View style={[ styles.balanceStatItem, styles.statDivider]} />
            <View style={ styles.balanceStatItem}>
                <Text style={ styles.balanceStatLabel}>
                    Expenses
                </Text>
        
                <Text style={[styles.balanceStatAmount, { color:COLORS.expense}]}>
                    ${Number(summary?.expenses).toFixed(2)}
                </Text>
            </View>
            
        </View>
    </View>
  )
}

export default BalanceCard