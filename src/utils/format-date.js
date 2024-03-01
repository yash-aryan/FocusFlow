"use strict";

import { format, parseISO } from "date-fns";

// Date-fns function to format ISO date to something like "12th Jun 2023, 11:20 PM".
export function formatDate(dateISO) {
	if (dateISO === "") return "<no duedate>";
	const parsedDate = parseISO(dateISO);
	return format(parsedDate, "do MMM y");
}
