"use strict";
import "./style.css";
import todolist from "./todolistHandler";
import dom from "./domHandler";

/* OVERVIEW:
- This is the MAIN module that deals deals with event handling & deciding actions to take on each step.
- This module doesn't modify DOM or Task Objects directly.
*/
window.todolist = todolist;
// Restore tasks objects back to todolist after every reload/refresh.
todolist.restoreTodolistFromStorage();

todolist.getAllTasks().forEach((taskObj, index) => {
	dom.taskContainer.createTask(index, taskObj.getInfo());
	dom.projectContainer.addNewItem(taskObj.getInfo().project);
});

let currentTaskView = "";

// ---PERMANENT EVENT LISTENERS---

(function () {
	const formModal__closeBtn = document.querySelector("#form-modal__close-btn");
	formModal__closeBtn.addEventListener("click", dom.formModal.close);
	const infoModal__closeBtn = document.querySelector("#info-modal__close-btn");
	infoModal__closeBtn.addEventListener("click", dom.infoModal.close);
	const tasksContainer = document.querySelector("#tasks-container");
	tasksContainer.addEventListener("click", taskEventHandler);
	const sideBar__itemsList = document.querySelector("#sidebar__items-list");
	sideBar__itemsList.addEventListener("click", sidebarEventHandler);
	const btnCta = document.querySelector("#btn-cta");
	btnCta.addEventListener("click", addTaskFlow);
})();

// ---EVENT HANDLER functions---

function taskEventHandler(e) {
	const node = e.target;
	if (!node.closest(".task")) return;

	const taskNode = node.closest("div.task");
	const taskObj = todolist.getTask(taskNode.dataset.index);

	if (node.closest(".task__check-btn")) {
		taskObj.toggleStatus();
		dom.taskContainer.toggleTaskState(taskNode);
	} else if (node.closest(".task__info-btn")) {
		dom.infoModal.display(taskObj.getInfo());
	} else if (node.closest(".task__edit-btn")) editTaskFlow(taskNode, taskObj);
	else if (node.closest(".task__delete-btn")) deleteTaskFlow(taskNode);
}

function sidebarEventHandler(e) {
	const node = e.target;
	const item = node.closest(".sidebar__item");
	if (!node.closest(".sidebar__item") || isAlreadyOnSameTaskView()) return;

	if (item.id === "sidebar__home-item") displayAllTasks();
	else displayTasksByProject(item.dataset.taskView);

	currentTaskView = item.dataset.taskView;

	function isAlreadyOnSameTaskView() {
		if (item.dataset.taskView === currentTaskView) return true;
		else return false;
	}
}

// ---FLOW HANDLER functions---

function addTaskFlow() {
	const form = document.querySelector("#form");
	const formModal = document.querySelector("#form-modal");
	form.addEventListener("submit", addTask, { once: true });
	formModal.addEventListener("close", stopFlow, { once: true });
	dom.formModal.changeAction("Add Task");
	dom.formModal.open();

	function addTask(e) {
		e.preventDefault();
		formModal.removeEventListener("close", stopFlow);

		const formInputs = getFormInput();
		const taskIndex = todolist.createTask(formInputs);
		const taskObj = todolist.getTask(taskIndex);
		dom.taskContainer.createTask(taskIndex, taskObj.getInfo());
		dom.projectContainer.addNewItem(taskObj.getInfo().project);
		dom.formModal.close();
	}

	function stopFlow() {
		form.removeEventListener("submit", addTask);
		dom.formModal.close();
	}
}

function editTaskFlow(taskNode, taskObj) {
	const form = document.querySelector("#form");
	const formModal = document.querySelector("#form-modal");
	form.addEventListener("submit", editTask, { once: true });
	formModal.addEventListener("close", stopFlow, { once: true });

	const taskIndex = taskNode.dataset.index;
	dom.formModal.changeAction("Edit Task");
	dom.formModal.openPrefilled(taskObj.getInfo());

	function editTask(e) {
		e.preventDefault();
		const formInputs = getFormInput();
		todolist.editTask(taskIndex, formInputs);
		dom.taskContainer.editTask(taskIndex, formInputs);
		dom.projectContainer.addNewItem(formInputs.project);
		removeAllEmptyProjects();
		dom.formModal.close();
	}

	function stopFlow() {
		form.removeEventListener("submit", editTask);
		dom.formModal.close();
	}
}

function deleteTaskFlow(taskNode) {
	dom.taskContainer.removeTask(taskNode);
	todolist.removeAt(taskNode.dataset.index);

	// Re-displaying the last view to sync all data-index value after deletion.
	// If task container gets empty in current view, then load all tasks view.
	if (document.querySelector("#tasks-container").innerHTML === "") {
		currentTaskView = "";
		displayAllTasks();
	} else {
		if (currentTaskView === "") displayAllTasks();
		else displayTasksByProject(currentTaskView);
	}
	removeAllEmptyProjects();
}

// ---TASK DISPLAYING functions---

function displayTasksByProject(projectName) {
	dom.taskContainer.removeAllTasks();
	todolist.getByProject(projectName).forEach(taskObj => {
		// Assigning index from the main todolist.
		const index = todolist.getAllTasks().indexOf(taskObj);
		dom.taskContainer.createTask(index, taskObj.getInfo());
	});
}

function displayAllTasks() {
	dom.taskContainer.removeAllTasks();
	todolist.getAllTasks().forEach((taskObj, index) => {
		dom.taskContainer.createTask(index, taskObj.getInfo());
	});
}

// ---HELPER functions---

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

function removeAllEmptyProjects() {
	document.querySelectorAll(".project__item").forEach(node => {
		const projectName = node.dataset.taskView;
		if (todolist.getByProject(projectName).length === 0) {
			dom.projectContainer.removeItem(projectName);
		}
	});
}
