import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, ScrollView, Dimensions } from "react-native";
import Todo from "./Todo";
import {
	LineChart,
	BarChart,
	PieChart,
	ProgressChart,
	ContributionGraph,
	StackedBarChart,
} from "react-native-chart-kit";
import moment from "moment";

const App = () => {
	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState(0);
	const [total, setTotal] = useState(0);
	const [data, setData] = useState([
		{
			date: moment().format("LL"),
			amount: 1000,
		},
		{ date: moment().subtract(1, "days").format("LL"), amount: 1000 },
		{ date: moment().subtract(1, "days").format("LL"), amount: 1000 },
		{ date: moment().subtract(2, "days").format("LL"), amount: 1000 },
		{ date: moment().subtract(2, "days").format("LL"), amount: 1000 },
	]);

	const groupBy = (array, key) =>
		array.reduce((rv, x) => {
			(rv[x[key]] = rv[x[key]] || []).push(x);
			return rv;
		}, {});

	const [gigs, setGigs] = useState([
		{
			description: "Freelance job",
			amount: 500.0,
			timestamp: new Date(),
		},
	]);

	const getDates = () => data.map((pair) => pair.date);
	const getAmounts = () => data.map((pair) => pair.amount);

	console.log(getDates());
	console.log(getAmounts());
	console.log(groupBy(data, "date"));

	useEffect(() => {
		setTotal(gigs.reduce((total, gig) => total + Number(gig.amount), 0));
	}, [gigs]);

	const addGig = () => {
		setGigs([
			...gigs,
			{
				description: description,
				amount: amount,
				timestamp: new Date(),
			},
		]);

		setDescription("");
		setAmount(0);
	};

	return (
		<SafeAreaView>
			<View>
				<Text style={styles.titleText}>Income Tracker</Text>
			</View>
			<View>
				<Text>Bezier Line Chart</Text>
				<LineChart
					data={{
						labels: getDates(),
						datasets: [
							{
								data: getAmounts(),
							},
						],
					}}
					width={Dimensions.get("window").width} // from react-native
					height={220}
					yAxisLabel="$"
					yAxisSuffix="k"
					yAxisInterval={1} // optional, defaults to 1
					chartConfig={{
						backgroundColor: "#e26a00",
						backgroundGradientFrom: "#fb8c00",
						backgroundGradientTo: "#ffa726",
						decimalPlaces: 1, // optional, defaults to 2dp
						color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						style: {
							borderRadius: 16,
						},
						propsForDots: {
							r: "6",
							strokeWidth: "2",
							stroke: "#ffa726",
						},
					}}
					bezier
					style={{
						marginVertical: 8,
						borderRadius: 16,
					}}
				/>
			</View>
			<Text>Total: ${total}</Text>
			<TextInput
				style={styles.input}
				value={description}
				placeholder="Enter a description"
				onChangeText={(text) => setDescription(text)}
			/>
			<TextInput
				style={styles.input}
				value={amount}
				placeholder="Enter the amount you are paid in $AUD"
				keyboardType="numeric"
				onChangeText={(text) => setAmount(text)}
			/>
			<Button disabled={!amount || !description} onPress={addGig} title="Add Gig" />

			{gigs.map((gig) => (
				<View>
					<Text>{gig.description}</Text>
					<Text>${gig.amount}</Text>
				</View>
			))}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	input: {
		marginTop: 20,
		marginBottom: 20,
		height: 40,
		borderColor: "red",
		borderWidth: 1,
	},
	titleText: {
		// backgroundColor: "red", // almost like Camelcase!
		fontSize: 30,
		fontWeight: "bold",
	},
});

export default App;
