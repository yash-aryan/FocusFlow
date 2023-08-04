"use strict";
import "./style.css";
import { taskFactory } from "./taskFactory";
import { storage } from "./storageHandler";

const todolist = (() => {
	let _todoList = [];

	function create(...args) {
		const _newTask = taskFactory(...args);
		_todoList.push(_newTask);
		const _index = _todoList.indexOf(_newTask);
		storage.save(_index, _newTask);
	}

	function insert(restoredTask) {
		_todoList.push(restoredTask);
	}

	function getTask(index = null) {
		return _todoList[index];
	}

	function edit(index = null, type, value) {
		_todoList[index].editTask(type, value);
		// Also modifies from the storage
		const _updatedTask = _todoList[index].getInfo();
		storage.modify(index, _updatedTask);
	}

	function removeAt(index) {
		_todoList.splice(index, 1);
		storage.removeAt(index);
	}

	function getByProject(name = "") {
		if (name === "") return [..._todoList];
		return _todoList.filter(n => n.getInfo().project === name);
	}

	return {
		create,
		insert,
		getTask,
		edit,
		removeAt,
		getByProject,
	};
})();

// Checks browser's localStorage for data on every reload/refresh.
// If data is present, then each of them are added back to the todolist.
if (storage.size() !== 0) {
	for (let i = 0; i < localStorage.length; i++) {
		const restoredTask = taskFactory(...Object.values(storage.getFrom(i)));
		todolist.insert(restoredTask);
	}
}

console.log(todolist.getByProject());
window.todolist = todolist;
