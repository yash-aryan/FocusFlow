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

	return {
		open,
		close,
	};
})();

const taskContainer = (() => {
	const container = document.querySelector("#tasks-container");

	function createTask(index, taskInfo) {
		const task = document.createElement("div");
		task.className = fetchTaskClasses(); // task element classes
		task.dataset.index = index; // Storing task index in DOM as data attribute

		const task__group = document.createElement("div");
		task__group.classList.add("task__wrapper");
		const task__checkBtn = document.createElement("button");
		task__checkBtn.classList.add("task__check-btn", "material-symbols-rounded");
		const status = taskInfo.completed ? " task--completed" : "";
		task__checkBtn.textContent = fetchCheckBtnStatus(); // checkbox
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

		function fetchTaskClasses() {
			const status = taskInfo.completed ? " task--completed" : "";
			return "task" + status;
		}

		function fetchCheckBtnStatus() {
			return taskInfo.completed ? "check_box" : "check_box_outline_blank";
		}

		// Date-fns function to format ISO date to something like "12th Jun 2023, 11:20 PM".
		function formatDate(dateISO) {
			if (dateISO === "") return "no duedate";
			const parsedDate = parseISO(dateISO);
			return format(parsedDate, "do MMM y");
		}
	}

	function removeTask(node) {
		node.remove();
	}

	function toggleTaskState(node) {
		const task__checkBtn = node.querySelector("button.task__check-btn");
		if (node.classList.contains("task--completed")) {
			task__checkBtn.innerText = "check_box_outline_blank";
			node.classList.remove("task--completed");
		} else {
			task__checkBtn.innerText = "check_box";
			node.classList.add("task--completed");
		}
	}

	function removeAllTasks() {
		container.innerHTML = "";
	}

	return {
		createTask,
		removeTask,
		toggleTaskState,
		removeAllTasks,
	};
})();

const sidebar = (() => {
	const container = document.querySelector("#projects-container");

	function createItem(action, projectName = "") {
		if (projectName === "") return;
		switch (action) {
			case "restore":
				startCreating();
				break;
			case "add":
				if (doesProjectAlreadyExist) return console.log("this ran");
				startCreating();
				break;
			default:
				return;
		}

		function doesProjectAlreadyExist() {
			return Array.from(
				document.querySelectorAll("#projects-container > .sidebar__item > span")
			).some(item => projectName === item.innerText);
		}

		function startCreating() {
			const sidebar__item = document.createElement("li");
			sidebar__item.classList.add("sidebar__item");
			const span = document.createElement("span");
			span.textContent = projectName;

			sidebar__item.append(span);
			container.append(sidebar__item);
		}
	}

	return {
		createItem,
	};
})();

export default {
	formModal,
	taskContainer,
	sidebar,
};
