"use strict";
import "./style.css";
import { taskFactory } from "./taskFactory";
import { storage } from "./storageMethods";

const task = (() => {
	let _todoList = [];

	function create(...args) {
		const _newTask = taskFactory(...args);
		_todoList.push(_newTask);
		const _index = _todoList.indexOf(_newTask);
		storage("save", _index, _newTask);
	}

	function insert(restoredTask) {
		_todoList.push(restoredTask);
	}

	function get(index = null) {
		if (index === null) console.dir(_todoList);
		else return _todoList[index];
	}

	function edit(index = null, type, value) {
		if (index === null) return console.log("Enter an index first!");

		_todoList[index].editTask(type, value);
		
		// Also modifies from the storage
		const _updatedTask = _todoList[index].getInfo();
		storage("modify", index, _updatedTask);
	}

	function remove(index) {
		_todoList.splice(index, 1);
		storage("remove", index);
	}

	return {
		create,
		insert,
		get,
		edit,
		remove,
	};
})();

// Checks browser's localStorage for data on every reload/refresh.
// If data is present, then each of them are added back to the todolist.
if (localStorage.length !== 0) {
	for (let index = 0; index < localStorage.length; index++) {
		const restoredTask = storage("get", index);
		task.insert(restoredTask);
	}
}

/* Exposing task IIFE globally for CONSOLE test version of todolist due to
webpack bundling and preventing access to global variables */
window.task = task;

document.querySelector("#addTaskDialog").showModal();