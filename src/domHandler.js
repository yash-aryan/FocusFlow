"use strict";
import { format, parseISO } from "date-fns";

// Module that deals with modfying the DOM.

const formModal = (() => {
	const modal = document.querySelector("#modal");
	function open() {
		modal.showModal();
	}

	function close() {
		document.querySelector("#form").reset();
		modal.close();
	}

	return { open, close };
})();

const taskDiv = (() => {
	const container = document.querySelector("#tasks-container");

	function create(index, taskInfo) {
		const task = document.createElement("div");
		task.classList.add("task");
		task.dataset.index = index; // Storing task index in DOM as data attribute

		const task__group = document.createElement("div");
		task__group.classList.add("task__wrapper");
		const task__checkBtn = document.createElement("button");
		task__checkBtn.classList.add("task__check-btn", "material-symbols-rounded");
		task__checkBtn.textContent = "check_box_outline_blank";
		const task__title = document.createElement("span");
		task__title.classList.add("task__title");
		task__title.textContent = taskInfo.title; // task title
		const task__duedate = document.createElement("span");
		task__duedate.classList.add("task__duedate");
		task__duedate.textContent = formatDate(taskInfo.duedate); // task duedate (after formatting)

		const task__group2 = document.createElement("div");
		task__group2.classList.add("task__wrapper");
		const task__infoBtn = document.createElement("button");
		task__infoBtn.classList.add("task__info-btn");
		task__infoBtn.textContent = "info";
		const task__editBtn = document.createElement("button");
		task__editBtn.classList.add("task__edit-btn");
		task__editBtn.textContent = "edit";
		const task__deleteBtn = document.createElement("button");
		task__deleteBtn.classList.add("task__delete-btn");
		task__deleteBtn.textContent = "delete";

		task__group.append(task__checkBtn, task__title, task__duedate);
		task__group2.append(task__infoBtn, task__editBtn, task__deleteBtn);
		task.append(task__group, task__group2);
		container.append(task);
	}

	function removeElement(node) {
		node.remove();
	}

	function toggleState(node) {
		const task = node.closest("div.task");
		const task__checkBtn = node.closest("button.task__check-btn");
		if (task.classList.contains("task--completed")) {
			task__checkBtn.innerText = "check_box_outline_blank";
			task.classList.remove("task--completed");
		} else {
			task__checkBtn.innerText = "check_box";
			task.classList.add("task--completed");
		}
	}

	return { create, removeElement, toggleState };
})();

// Date-fns function to format ISO date to something like "12th Jun 2023, 11:20 PM".
function formatDate(dateISO) {
	if (dateISO === "") return "no duedate";
	const parsedDate = parseISO(dateISO);
	return format(parsedDate, "do MMM y");
}

export default {
	formModal,
	taskDiv,
};
