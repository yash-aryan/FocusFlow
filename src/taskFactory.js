"use strict";

import { format, isToday, parseISO } from "date-fns";

// Module that deals with creating task objects
export function taskFactory(
	title,
	inputDuedate,
	desc,
	priority,
	project
) {
	let _isCompleted = false,
		_formattedDuedate;

	// Formats date if it's not already.
	_formattedDuedate =
		inputDuedate.indexOf(" ") === -1 ? _formatDate(inputDuedate) : inputDuedate;

	// Date-fns function to format ISO date to something like "12th Jun 2023, 11:20 PM" or "Today, 11:20 PM".
	function _formatDate() {
		const _parsedDate = parseISO(inputDuedate);
		if (isToday(_parsedDate)) return `Today, ${format(_parsedDate, "p")}`;
		else return format(_parsedDate, "do MMM y, p");
	}

	function getInfo() {
		return {
			title,
			duedate: _formattedDuedate,
			desc,
			priority,
			project,
			completed: _isCompleted,
			duedateISO: inputDuedate,
		};
	}

	function editTask(type, value) {
		switch (type) {
			case "title":
				title = value;
				break;
			case "duedate":
				inputDuedate = value;
				_formattedDuedate = _formatDate(value);
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

	return {
		getInfo,
		editTask,
		toggleTaskStatus,
	};
}
