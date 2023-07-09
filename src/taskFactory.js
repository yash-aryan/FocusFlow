"use strict";
export const taskFactory = (
	title = "New Task",
	desc = "-",
	priority = "none",
	duedate = "today",
	project = ""
) => {
	let _completed = false;

	function getInfo() {
		return { title, desc, priority, duedate, project, completed: _completed };
	}

	function editTask(type, value) {
		switch (type) {
			case "title":
				title = value;
				break;
			case "desc":
				desc = value;
				break;
			case "priority":
				priority = value;
				break;
			case "duedate":
				duedate = value;
				break;
			case "project":
				project = value;
				break;
			default:
				console.log("invalid case in editTask()");
				break;
		}
	}

	function toggleTaskStatus() {
		if (_completed) _completed = false;
		else _completed = true;
	}

	return {
		getInfo,
		editTask,
		toggleTaskStatus,
	};
};
