"use strict";

/* OVERVIEW:
- This is the module that deals with creating task objects.
- Takes object with task data received from user as input & returns a task object, with certain functions.
- The UI related data is kept seperately from the data inputted into the factory (e.g. Inputted duedate must only be in ISO format).
*/

function taskFactory(taskInputs) {
	const title = taskInputs.title,
		duedate = taskInputs.duedate,
		desc = taskInputs.desc,
		priority = taskInputs.priority,
		project = taskInputs.project;
	let completed = false;

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

	function toggleStatus() {
		completed = completed ? false : true;
	}

	return {
		getInfo,
		toggleStatus,
	};
}

export default taskFactory;
