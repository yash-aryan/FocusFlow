"use strict";
import taskFactory from "./taskFactory";

/* OVERVIEW:
- This is the module that deals with maintaing tasks for persistance & rapid modification.
- Has access to storage implementation via storageFactory.
- Has access to taskFactory to create task objects.
*/

const todolist = (() => {
	const todolistArr = [];
	const storage = storageFactory();

	function createTask(taskInputs) {
		const taskObj = taskFactory(taskInputs);
		todolistArr.push(taskObj);
		storage.saveToStorage(splitTaskObj(todolistArr));
		return todolistArr.length - 1;
	}

	function getTask(index) {
		return todolistArr[index];
	}

	function editTask(index, newInputs) {
		const taskObj = taskFactory(newInputs);
		todolistArr[index] = taskObj;
		storage.saveToStorage(splitTaskObj(todolistArr));
	}

	function removeAt(index) {
		todolistArr.splice(index, 1);
		storage.saveToStorage(splitTaskObj(todolistArr));
	}

	function getAllTasks() {
		return [...todolistArr];
	}

	function restoreTodolistFromStorage() {
		// Rebuilding taskObj from taskInfo stored in the storage, and pushing it into todolistArr.
		const taskInfoArr = storage.getFromStorage();
		if (!taskInfoArr) return;
		taskInfoArr.forEach(taskInfo => todolistArr.push(taskFactory(taskInfo)));
	}

	function getByProject(name) {
		if (name === "") getAllTasks();
		return todolistArr.filter(n => n.getInfo().project === name);
	}

	function splitTaskObj(inputTodolist) {
		// Takes array with taskObj as input & returns a NEW array with taskInfo as output.
		// Where taskInfo contains raw data that are not a function.
		return inputTodolist.map(n => n.getInfo());
	}

	return {
		createTask,
		getTask,
		editTask,
		removeAt,
		getAllTasks,
		restoreTodolistFromStorage,
		getByProject,
	};
})();

// Abstracts away any external storage API or methods. Currently only uses browser's localStorage.
function storageFactory() {
	function saveToStorage(taskInfoArr) {
		localStorage.setItem("todolist", JSON.stringify(taskInfoArr));
	}

	function getFromStorage() {
		if (localStorage.getItem("todolist") === undefined) debugger;
		return JSON.parse(localStorage.getItem("todolist"));
	}

	return {
		saveToStorage,
		getFromStorage,
	};
}

export default todolist;
