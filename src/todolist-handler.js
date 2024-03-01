"use strict";

/* OVERVIEW:
- Module that deals with Task Object persistance & modification.
- Has access to storage implementation via storageFactory.
- Has access to taskFactory to create task objects.
*/

const todolist = (() => {
	const allTasks = [];
	const storage = storageFactory();

	function createTask(taskInputs) {
		// Pushes new task object to todolist, Returns task index.
		allTasks.push(taskFactory(taskInputs));
		saveAllTaskChanges();
		return allTasks.length - 1;
	}

	function getTaskInfo(index) {
		// Returns task info with added index as "id".
		return { ...allTasks[index].getInfo(), id: index };
	}

	function getAllTaskInfo() {
		// Returns aLL task info with added index as "id".
		return allTasks.map((taskObj, index) => {
			return { ...taskObj.getInfo(), id: index };
		});
	}

	function toggleTaskStatus(index) {
		getTask(index).toggleStatus();
		saveAllTaskChanges();
	}

	function editTask(index, formData) {
		// Re-creates & replaces old task object.
		allTasks[index] = taskFactory(formData);
		saveAllTaskChanges();
	}

	function removeTask(index) {
		allTasks.splice(index, 1);
		saveAllTaskChanges();
	}

	function restoreSaved() {
		// Rebuilding taskObj from taskInfo stored in the storage, and pushing it into allTasks.
		const taskInfoArr = storage.getFromStorage();
		if (!taskInfoArr) return;
		taskInfoArr.forEach(taskInfo => allTasks.push(taskFactory(taskInfo)));
	}

	// Private Methods
	function getTask(index) {
		return allTasks[index];
	}

	function saveAllTaskChanges() {
		storage.saveToStorage(getAllTaskInfo());
	}

	return {
		createTask,
		getTaskInfo,
		getAllTaskInfo,
		toggleTaskStatus,
		editTask,
		removeTask,
		restoreSaved,
	};
})();

/*
- Abstracts away any external storage API or methods.
- Currently only uses browser's localStorage.
*/
function storageFactory() {
	function saveToStorage(taskInfoArr) {
		localStorage.setItem("todolist", JSON.stringify(taskInfoArr));
	}

	function getFromStorage() {
		if (!localStorage.getItem("todolist")) return;
		return JSON.parse(localStorage.getItem("todolist"));
	}

	return {
		saveToStorage,
		getFromStorage,
	};
}

/*
- Returns task objects from the required input data.
- Inputted duedate must only be in ISO format, additional formatting is done only for display reasons during DOM Manipulations.
*/
function taskFactory(taskInputs) {
	const title = taskInputs.title,
		duedate = taskInputs.duedate,
		desc = taskInputs.desc,
		priority = taskInputs.priority,
		group = taskInputs.group;
	let completed = taskInputs.completed || false;

	function getInfo() {
		return {
			title,
			duedate,
			desc,
			priority,
			group,
			completed,
		};
	}

	function toggleStatus() {
		completed = completed ? false : true;
	}

	return {
		getInfo,
		toggleStatus,
	};
}

export default todolist;
