import { Dimensions } from "react-native";
import { View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
const screenWidth = Dimensions.get("window").width;
        const HorizontalBarChart = () => {
            const barData = [
                {value: 250, label: 'M'},
                {value: 500, label: 'T', frontColor: '#177AD5'},
            ];
            return (
                <View style={{ width: '100%'}}>
                    <BarChart
                        horizontal
                        barWidth={25}
                        barBorderRadius={4}
                        // width={screenWidth - 40}
                        width={screenWidth - 40}
                    // height={200}
                        frontColor="lightgray"
                        data={barData}
                        yAxisThickness={0}
                        xAxisThickness={0}
                    />
                </View>
            );
        };

        export default HorizontalBarChart;