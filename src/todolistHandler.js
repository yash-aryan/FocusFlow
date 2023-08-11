"use strict";
import taskFactory from "./taskFactory";
import storage from "./storageHandler";

/* OVERVIEW:
- Module that deals with maintaing tasks in Array for rapid modification.
*/

const todolist = (() => {
	let todolist = [];

	function create(taskInputs) {
		const newTask = taskFactory(taskInputs);
		todolist.push(newTask);
		const index = todolist.indexOf(newTask);
		storage.save(index, newTask);
		return index;
	}

	function getTask(index) {
		return todolist[index];
	}

	function edit(index, type, value) {
		todolist[index].editTask(type, value);
		// Also modifies from the storage
		const updatedTask = todolist[index].getInfo();
		storage.modify(index, updatedTask);
	}

	function removeAt(index) {
		todolist.splice(index, 1);
		storage.removeAt(index);
	}

	function restoreTask(index) {
		const taskObj = taskFactory(storage.getFrom(index));
		todolist.push(taskObj);
		return taskObj;
	}

	function getByProject(name = "") {
		if (name === "") return [...todolist];
		return todolist.filter(n => n.getInfo().project === name);
	}

	return {
		create,
		getTask,
		edit,
		removeAt,
		restoreTask,
		getByProject,
	};
})();

export default todolist;
