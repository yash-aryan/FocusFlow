"use strict";

import { format } from "date-fns";

export const taskFactory = (title, rawDate, desc, priority, project) => {
	let duedate,
		_isCompleted = false;

	// Whether TO FORMAT the input date OR NOT, based on if it's already formatted (e.g. when taken directly from the storage).
	duedate = rawDate.indexOf(" ") === -1 ? _formatDate(rawDate) : rawDate;

	function getInfo() {
		return { title, duedate, completed: _isCompleted, desc, priority, project };
	}

	function editTask(type, value) {
		switch (type) {
			case "title":
				title = value;
				break;
			case "duedate":
				duedate = _formatDate(value);
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
		_isCompleted = _isCompleted ? false : true;
	}

	function _formatDate(inputDate) {
		return format(new Date(inputDate), "Pp");
	}

	return {
		getInfo,
		editTask,
		toggleTaskStatus,
	};
};
