"use strict";
import "./style.css";
import todolist from "./todolist-handler";
import { navbar } from "./dom-handlers/navbar";
import { formModal, getCtaBtn } from "./dom-handlers/form-modal";
import { taskActions, taskController } from "./dom-handlers/task-controller";
import { infoModal } from "./dom-handlers/info-modal";

/* OVERVIEW:
- Main module. Deals with event handling.
- Does not modify DOM or Task Objects directly.
*/

// Restore tasks objects back to todolist after every webpage reload.
todolist.restoreSaved();
todolist.getAllTaskInfo().forEach(taskInfo => {
	taskController.createTask(taskInfo);
	navbar.addItem(taskInfo.group);
});

// ---PERMANENT EVENT LISTENERS---
taskController.getContainer().addEventListener("click", taskEventHandler);
formModal.getElement().addEventListener("click", formModal.handleDialogClick);
formModal.getCloseBtn().addEventListener("click", formModal.close);
infoModal.getElement().addEventListener("click", infoModal.handleDialogClick);
infoModal.getCloseBtn().addEventListener("click", infoModal.close);
navbar.getList().addEventListener("click", sidebarEventHandler);
getCtaBtn().addEventListener("click", addTaskFlow);

// ---EVENT HANDLERS---
function taskEventHandler(e) {
	const targetNode = e.target;
	const taskNode = taskController.getParentTaskElem(targetNode);
	if (!taskNode) return;

	const taskId = +taskNode.dataset.id;

	switch (e.target.dataset.action) {
		case taskActions[0]:
			todolist.toggleTaskStatus(taskId);
			taskController.toggleTaskState(taskNode);
			break;
		case taskActions[1]:
			infoModal.open(todolist.getTaskInfo(taskId));
			break;
		case taskActions[2]:
			editTaskFlow(taskNode, todolist.getTaskInfo(taskId));
			break;
		case taskActions[3]:
			deleteTaskFlow(taskNode);
			break;
		default:
			return;
	}
}

function sidebarEventHandler(e) {
	const itemNode = e.target;
	if (!navbar.isItem(itemNode)) return;
	if (navbar.isActive(itemNode)) return;

	navbar.markActive(itemNode);
	const targetGroup = itemNode.dataset.group;

	if (navbar.isHomeItem(itemNode)) displayTasks();
	else displayTasks(targetGroup);
}

// ---FLOW HANDLER functions---
function addTaskFlow() {
	formModal.getForm().addEventListener("submit", addTask, { once: true });
	formModal.getElement().addEventListener("close", stopFlow, { once: true });
	formModal.open("Add Task");

	function addTask(e) {
		e.preventDefault();
		formModal.getElement().removeEventListener("close", stopFlow);

		const formData = formModal.getFormData();
		const taskId = todolist.createTask(formData);
		const taskInfo = todolist.getTaskInfo(taskId);
		taskController.createTask(taskInfo);
		navbar.addItem(taskInfo.group);
		formModal.close();
	}

	function stopFlow() {
		formModal.getForm().removeEventListener("submit", addTask);
		formModal.close();
	}
}

function editTaskFlow(taskNode, taskInfo) {
	const taskGroup = todolist.getTaskInfo(taskNode.dataset.id).group;
	formModal.getForm().addEventListener("submit", editTask, { once: true });
	formModal.getElement().addEventListener("close", stopFlow, { once: true });

	formModal.open("Edit Task", taskInfo);

	function editTask(e) {
		e.preventDefault();
		const formData = formModal.getFormData();
		todolist.editTask(taskInfo.id, formData);
		taskController.editTask(taskNode, formData);

		if (taskGroup !== formData.group) {
			navbar.removeGroup(taskGroup);
			navbar.addItem(formData.group);
		}

		formModal.close();
	}

	function stopFlow() {
		formModal.getForm().removeEventListener("submit", editTask);
		formModal.close();
	}
}

function deleteTaskFlow(taskNode) {
	const activeGroup = todolist.getTaskInfo(taskNode.dataset.id).group;
	taskController.removeTask(taskNode);
	todolist.removeTask(taskNode.dataset.id);

	// Re-renders todolist to sync all data-id value after deletion.
	if (getTasksByGroup(activeGroup).length === 0) {
		// Removes empty groups.
		navbar.removeGroup(activeGroup);
		displayTasks();
	} else displayTasks(activeGroup);
}

function displayTasks(groupName) {
	// Removes & re-renders all tasks. re-renders tasks by group (if provided).
	taskController.removeAllTasks();
	const allTaskInfo = groupName ? getTasksByGroup(groupName) : todolist.getAllTaskInfo();
	allTaskInfo.forEach(taskInfo => taskController.createTask(taskInfo));
}

function getTasksByGroup(groupName) {
	return todolist.getAllTaskInfo().filter(taskInfo => {
		return taskInfo.group === groupName;
	});
}
