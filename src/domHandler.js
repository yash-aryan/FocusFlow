"use strict";
import { format, parseISO } from "date-fns";

/* OVERVIEW:
- This is the Module that deals with modfying the DOM.
- Created a named IIFE which returns only a certain functions for each relevant parent element.
- Commented the concerning parent HTML element above it's function.
*/

// <dialog id="form-modal">
const formModal = (() => {
	const modal = document.querySelector("#form-modal");

	function open() {
		modal.showModal();
	}

	function openPrefilled(taskInfo) {
		open();
		document.querySelector("#input-title").value = taskInfo.title;
		document.querySelector("#input-desc").value = taskInfo.desc;
		document.querySelector("#input-duedate").value = taskInfo.duedate;
		switch (taskInfo.priority) {
			case "normal":
				document.querySelector("#priority-normal").checked = true;
				break;
			case "high":
				document.querySelector("#priority-high").checked = true;
				break;
		}
		document.querySelector("#input-project").value = taskInfo.project;
	}

	function changeAction(inputText) {
		document.querySelector("#form-modal__action").textContent = inputText;
	}

	function close() {
		document.querySelector("#form").reset();
		modal.close();
	}

	return {
		open,
		openPrefilled,
		changeAction,
		close,
	};
})();

// <div id="tasks-container">
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
			return taskInfo.completed ? "task task--completed" : "task";
		}

		function fetchCheckBtnStatus() {
			return taskInfo.completed ? "check_box" : "check_box_outline_blank";
		}
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

	function editTask(index, taskInfo) {
		const task = document.querySelector(`.task[data-index="${index}"]`);
		task.querySelector(".task__title").textContent = taskInfo.title;
		task.querySelector(".task__duedate").textContent = formatDate(
			taskInfo.duedate
		);
	}

	function removeTask(node) {
		node.remove();
	}

	function removeAllTasks() {
		container.innerHTML = "";
	}

	return {
		createTask,
		toggleTaskState,
		editTask,
		removeTask,
		removeAllTasks,
	};
})();

// <div id="projects-container">
const projectContainer = (() => {
	const container = document.querySelector("#projects-container");

	function addNewItem(projectName) {
		if (projectName === "") return;
		if (doesProjectAlreadyExist()) return;
		create(projectName);

		function doesProjectAlreadyExist() {
			const items = Array.from(document.querySelectorAll(".project-name"));
			if (items.length === 0) return false;
			return items.some(node => projectName === node.innerText);
		}

		function create(projectName) {
			const sidebar__item = document.createElement("li");
			sidebar__item.dataset.taskView = projectName; // data-task-view
			sidebar__item.classList.add("sidebar__item", "project__item");
			const span = document.createElement("span");
			span.classList.add("project-name");
			span.textContent = projectName;
			sidebar__item.append(span);
			container.append(sidebar__item);
		}
	}

	function removeItem(projectName) {
		// Finds & deletes entire .sidebar__item node with innerText === projectName.
		document.querySelectorAll(".project-name").forEach(node => {
			if (projectName === node.innerText)
				node.closest(".project__item").remove();
		});
	}

	return {
		addNewItem,
		removeItem,
	};
})();

// <dialog id="info-modal">
const infoModal = (() => {
	const modal = document.querySelector("#info-modal");
	const titleNode = document.querySelector("#title-info");
	const duedateNode = document.querySelector("#duedate-info");
	const descNode = document.querySelector("#desc-info");
	const priorityNode = document.querySelector("#priority-info");
	const projectNode = document.querySelector("#project-info");
	const completedNode = document.querySelector("#completed-info");

	function display(taskInfo) {
		modal.showModal();
		titleNode.textContent = taskInfo.title;
		duedateNode.textContent = formatDate(taskInfo.duedate);
		descNode.textContent = fetchInfoData("desc");
		priorityNode.textContent = taskInfo.priority;
		projectNode.textContent = fetchInfoData("project");
		completedNode.textContent = fetchInfoData("completed");

		function fetchInfoData(type) {
			switch (type) {
				case "desc":
					return taskInfo.desc === "" ? "<no description>" : taskInfo.desc;
				case "project":
					return taskInfo.project === "" ? "<no project>" : taskInfo.project;
				case "completed":
					return taskInfo.completed ? "Completed!" : "Not yet completed";
			}
		}
	}

	function close() {
		titleNode.textContent = "";
		duedateNode.textContent = "";
		descNode.textContent = "";
		priorityNode.textContent = "";
		projectNode.textContent = "";
		completedNode.textContent = "";
		modal.close();
	}

	return {
		display,
		close,
	};
})();

// Date-fns function to format ISO date to something like "12th Jun 2023, 11:20 PM".
function formatDate(dateISO) {
	if (dateISO === "") return "<no duedate>";
	const parsedDate = parseISO(dateISO);
	return format(parsedDate, "do MMM y");
}

export default {
	formModal,
	taskContainer,
	projectContainer,
	infoModal,
};
