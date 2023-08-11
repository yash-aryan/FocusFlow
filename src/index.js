"use strict";
import "./style.css";
import todolist from "./todolistHandler";
import dom from "./domHandler";
import storage from "./storageHandler";

/* OVERVIEW:
- This is the MAIN module that deals deals with event handling & deciding actions to take on each step.
- If some event causes a series of steps, then it is classified under a "FLOW" (e.g. Add Task Flow, Edit Task FLow).
- Import functions from other modules and provide relevant inputs to cause a change.
- Do NOT modify the DOM or task objects directly from this module.
*/

// Restore tasks objects back to todolist after every reload/refresh.
if (storage.size() !== 0) {
	for (let index = 0; index < storage.size(); index++) {
		const taskObj = todolist.restoreTask(index);
		dom.taskContainer.createTask(index, taskObj.getInfo());
		dom.projectContainer.addNewItem(taskObj.getInfo().project);
	}
}

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
	if (node.closest(".task") === null) return;

	const taskNode = node.closest("div.task");
	const taskObj = todolist.getTask(taskNode.dataset.index);

	if (node.closest(".task__check-btn")) {
		taskObj.toggleTaskStatus();
		dom.taskContainer.toggleTaskState(taskNode);
	} else if (node.closest(".task__info-btn")) {
		dom.infoModal.display(taskObj.getInfo());
	} else if (node.closest(".task__edit-btn")) editTaskFlow(taskNode, taskObj);
}

function sidebarEventHandler(e) {
	const node = e.target;
	if (node.closest(".sidebar__item") && node.closest("#projects-container"))
		createTasksOfSameProject(node);
	else if (node.closest("#sidebar__home-item")) createAllTasks();
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
		const taskIndex = todolist.create(formInputs);
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
		for (const type in formInputs) {
			todolist.edit(taskIndex, type, formInputs[type]);
		}
		dom.taskContainer.editTask(taskIndex, taskObj.getInfo());
		dom.projectContainer.addNewItem(taskObj.getInfo().project);
		removeAllEmptyProjects();
		dom.formModal.close();
	}

	function removeAllEmptyProjects() {
		const projectsArray = Array.from(
			document.querySelectorAll(".project-name")
		);
		projectsArray.forEach(projectName => {
			if (todolist.getByProject(projectName).length === 0)
				dom.projectContainer.removeItem(projectName);
		});
	}

	function stopFlow() {
		form.removeEventListener("submit", editTask);
		dom.formModal.close();
	}
}

// ---CURRENT TASK DISPLAYING functions---

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
