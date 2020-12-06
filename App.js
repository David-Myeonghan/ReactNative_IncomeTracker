import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, ScrollView } from "react-native";
import Todo from "./Todo";

const App = () => {
	const [input, setInput] = useState("");
	const [todos, setTodos] = useState([]);

	const addTodo = () => {
		setTodos([input, ...todos]);
		setInput("");
	};

	return (
		<SafeAreaView>
			<View>
				<Text style={styles.titleText}>Hello World! ❤️</Text>
			</View>
			<ScrollView>
				{todos.map((todo) => (
					<Todo key={todo} title={todo} />
				))}
			</ScrollView>

			<TextInput style={styles.todoInput} value={input} maxLength={40} onChangeText={(text) => setInput(text)} />
			<Button onPress={addTodo} title="Add Todo" />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	todoInput: {
		margin: 20,
		height: 40,
		borderColor: "red",
		borderWidth: 1,
	},
	titleText: {
		// backgroundColor: "red", // Camelcase!
		fontSize: 30,
		fontWeight: "bold",
	},
});

export default App;
