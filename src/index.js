"use strict";
import "./style.css";
import { taskFactory } from "./taskFactory";

const task = (() => {
	let _todoList = [];

	function create(...args) {
		const _todo = taskFactory(...args);
		_todoList.push(_todo);
		_saveToLocalStorage();

		function _saveToLocalStorage() {
			const _index = _todoList.indexOf(_todo);
			const _value = JSON.stringify(_todo.getInfo());
			localStorage.setItem(_index, _value);
		}
	}

	function insert(todo) {
		_todoList.push(todo);
	}

	function remove(index) {
		_todoList.splice(index, 1);
		localStorage.removeItem(index);
	}

	function get(index = null) {
		if (index === null) console.dir(_todoList);
		else {
			return localStorage.getItem(index);
		}
	}

	return {
		create,
		insert,
		remove,
		get,
	};
})();

if (localStorage.length !== 0) {
	for (let i = 0; i < localStorage.length; i++) {
		const restored = JSON.parse(localStorage.getItem(i));
		const todo = taskFactory(...Object.values(restored));
		task.insert(todo);
	}
}

window.task = task;
