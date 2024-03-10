"use strict";
import "../styles/task-controller.css";

import { formatDate } from "../utils/format-date";

export const taskActions = ["toggle", "info", "edit", "delete"];

export const taskController = (() => {
	function getContainer() {
		return document.querySelector(".tasks-container");
	}

	function getParentTaskElem(node) {
		return node.closest(".task");
	}

	function createTask(taskInfo) {
		getContainer().classList.remove("tasks-container--empty");
		getContainer().append(getTaskElem(taskInfo));
	}

	function toggleTaskState(node) {
		let taskNode = node.closest(".task");
		if (!taskNode) return;

		taskNode.classList.toggle("task--completed");
	}

	function editTask(taskNode, taskInfo) {
		taskNode.querySelector(".task__title").textContent = taskInfo.title;
		taskNode.querySelector(".task__duedate").textContent = formatDate(taskInfo.duedate);
		if (taskInfo.priority === "high") {
			taskNode.classList.add("task--high");
			taskNode.classList.remove("task--normal");
		} else {
			taskNode.classList.add("task--normal");
			taskNode.classList.remove("task--high");
		}
	}

	function isContainerEmpty() {
		return !getContainer().hasChildNodes();
	}

	function removeTask(node) {
		node.remove();
	}

	function removeAllTasks() {
		getContainer().replaceChildren();
		getContainer().classList.add("tasks-container--empty");
	}

	// Private Methods
	function getTaskElem(taskInfo) {
		// Returns virtual DOM Task Element.
		const taskElem = document.createElement("section");
		taskElem.className = getTaskClasses();
		taskElem.dataset.id = taskInfo.id;

		const taskCheckBox = document.createElement("input");
		taskCheckBox.dataset.action = taskActions[0];
		taskCheckBox.setAttribute("name", "checked");
		taskCheckBox.setAttribute("type", "checkbox");
		taskCheckBox.setAttribute("aria-label", "Toggle task");
		taskCheckBox.checked = taskInfo.completed;
		taskCheckBox.classList.add("task__toggle");

		// all content on the right
		const wrapperCol = document.createElement("div");
		wrapperCol.classList.add("task__wrap", "task__wrap--col");
		const taskTitleText = document.createElement("h2");
		taskTitleText.classList.add("task__title");
		taskTitleText.textContent = taskInfo.title;

		const wrapperRow = document.createElement("div");
		wrapperRow.classList.add("task__wrap", "task__wrap--row");
		const taskDuedateText = document.createElement("span");
		taskDuedateText.classList.add("task__duedate");
		taskDuedateText.textContent = formatDate(taskInfo.duedate);
		const taskInfoBtn = document.createElement("button");
		taskInfoBtn.dataset.action = taskActions[1];
		taskInfoBtn.classList.add("task__info-btn", "task__chip-btn");
		taskInfoBtn.textContent = "info";
		const taskEditBtn = document.createElement("button");
		taskEditBtn.dataset.action = taskActions[2];
		taskEditBtn.classList.add("task__edit-btn", "task__chip-btn");
		taskEditBtn.textContent = "edit";
		const taskDeleteBtn = document.createElement("button");
		taskDeleteBtn.dataset.action = taskActions[3];
		taskDeleteBtn.classList.add("task__delete-btn", "task__chip-btn");
		taskDeleteBtn.textContent = "delete";

		wrapperRow.append(taskDuedateText, taskInfoBtn, taskEditBtn, taskDeleteBtn);
		wrapperCol.append(taskTitleText, wrapperRow);
		taskElem.append(taskCheckBox, wrapperCol);

		return taskElem;

		function getTaskClasses() {
			const allClasses = [];
			allClasses.push(taskInfo.completed ? "task task--completed" : "task");
			allClasses.push(taskInfo.priority === "normal" ? "task--normal" : "task--high");
			return allClasses.join(" ");
		}
	}

	return {
		getContainer,
		getParentTaskElem,
		createTask,
		editTask,
		toggleTaskState,
		isContainerEmpty,
		removeTask,
		removeAllTasks,
	};
})();
