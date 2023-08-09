"use strict";
import "./style.css";
import todolist from "./todolistHandler";
import dom from "./domHandler";
import storage from "./storageHandler";

// Restore tasks objects back to todolist after every reload/refresh.
if (storage.size() !== 0) {
	for (let index = 0; index < storage.size(); index++) {
		const taskObj = todolist.restoreTask(index);
		dom.taskContainer.createTask(index, taskObj.getInfo());
		dom.sidebar.createItem("restore", taskObj.getInfo().project);
	}
}

document
	.querySelector("#form-modal")
	.addEventListener("close", dom.formModal.close);
document
	.querySelector("#form-modal__close-btn")
	.addEventListener("click", dom.formModal.close);
document
	.querySelector("#info-modal__close-btn")
	.addEventListener("click", dom.infoModal.close);
document
	.querySelector("#tasks-container")
	.addEventListener("click", taskEventHandler);
document
	.querySelector("#sidebar__items-list")
	.addEventListener("click", sidebarEventHandler);
document.querySelector("#btn-cta").addEventListener("click", startFlowAddTask);

function taskEventHandler(e) {
	const node = e.target;
	if (node.closest(".task") === null) return;

	const taskNode = node.closest("div.task");
	const taskObj = todolist.getTask(taskNode.dataset.index);

	if (node.closest(".task__check-btn")) {
		taskObj.toggleTaskStatus();
		dom.taskContainer.toggleTaskState(taskNode);
	} else if (node.closest(".task__info-btn")) {
		dom.infoModal.display(taskObj.getInfo());
	}
}

function sidebarEventHandler(e) {
	const node = e.target;
	if (node.closest(".sidebar__item") && node.closest("#projects-container"))
		createTasksOfSameProject(node);
	else if (node.closest("#sidebar__home-item")) createAllTasks();
}

function startFlowAddTask() {
	dom.formModal.open();
	document.querySelector("#form").addEventListener("submit", addTask);

	function addTask(e) {
		e.preventDefault();
		const formInputs = getFormInput();
		const taskIndex = todolist.create(formInputs);
		const taskObj = todolist.getTask(taskIndex);
		dom.taskContainer.createTask(taskIndex, taskObj.getInfo());
		dom.sidebar.createItem("add", taskObj.getInfo().project);
		dom.formModal.close();
	}
}

function createTasksOfSameProject(node) {
	const childNode = node.closest(".sidebar__item").querySelector("span");
	dom.taskContainer.removeAllTasks();
	todolist.getByProject(childNode.innerText).forEach(taskObj => {
		const index = todolist.getByProject().indexOf(taskObj);
		dom.taskContainer.createTask(index, taskObj.getInfo());
	});
}

function createAllTasks() {
	dom.taskContainer.removeAllTasks();
	todolist.getByProject().forEach((taskObj, index) => {
		dom.taskContainer.createTask(index, taskObj.getInfo());
	});
}

function getFormInput() {
	const title = document.querySelector("#input-title").value;
	const duedate = document.querySelector("#input-duedate").value;
	const desc = document.querySelector("#input-desc").value;
	const priority = document.querySelector(
		'input[name="priority"]:checked'
	).value;
	const project = document.querySelector("#input-project").value;

	return {
		title,
		duedate,
		desc,
		priority,
		project,
	};
}
