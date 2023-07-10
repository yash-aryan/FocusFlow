"use strict";
import { taskFactory } from "./taskFactory";

export function storage(action, input1, input2 = null) {
	switch (action) {
		case "save":
			save();
			break;
		case "get":
			return get();
		case "modify":
			modify();
			break;
		case "remove":
			remove();
			break;
		default:
			return console.log("Invalid action");
	}

	function save() {
		if (input2 === null) return console.log("Input new task object");
		const _value = JSON.stringify(input2.getInfo());
		localStorage.setItem(input1, _value);
	}

	function get() {
		const _taskData = JSON.parse(localStorage.getItem(input1));
		return taskFactory(...Object.values(_taskData));
	}

	function modify() {
		if (input2 === null) return console.log("Input new task object");
		localStorage.setItem(input1, JSON.stringify(input2));
	}

	function remove() {
		localStorage.removeItem(input1);
	}
}
