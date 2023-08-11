"use strict";

/* OVERVIEW:
- Module that deals with creating task objects.
- Takes object as input & returns a task object, with useful functions.
- Keep the UI related data SEPERATE from the data inputted to this module (e.g. Inputted duedate must only be in ISO format).
*/

function taskFactory(taskInputs) {
	let title = taskInputs.title,
		duedate = taskInputs.duedate,
		desc = taskInputs.desc,
		priority = taskInputs.priority,
		project = taskInputs.project,
		completed = false;

	function getInfo() {
		return {
			title,
			duedate,
			desc,
			priority,
			project,
			completed,
		};
	}

	function editTask(type, value) {
		switch (type) {
			case "title":
				title = value;
				break;
			case "duedate":
				duedate = value;
				break;
			case "desc":
				desc = value;
				break;
			case "priority":
				priority = value;
				break;
			case "project":
				project = value;
				break;
			default:
				return console.log("invalid case in editTask()");
		}
	}

	function toggleTaskStatus() {
		completed = completed ? false : true;
	}

	return {
		getInfo,
		editTask,
		toggleTaskStatus,
	};
}

export default taskFactory;
