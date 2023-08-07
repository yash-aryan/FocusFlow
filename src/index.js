"use strict";
import "./style.css";
import todolist from "./todolistHandler";
import dom from "./domHandler";
import storage from "./storageHandler";

window.todolist = todolist;
// Restore tasks objects back to todolist after every reload/refresh.
if (storage.size() !== 0) {
	for (let index = 0; index < storage.size(); index++) {
		const taskObj = todolist.restoreTask(index);
		dom.taskDiv.create(index, taskObj.getInfo());
	}
}

document
	.querySelector("#tasks-container")
	.addEventListener("click", taskEventHandler);
document.querySelector("#btn-cta").addEventListener("click", startFlowAddTask);

function taskEventHandler(e) {
	const node = e.target;
	if (node.closest(".task") === null) return;
	if (node.closest("button.task__check-btn")) dom.taskDiv.toggleState(node);
}

function startFlowAddTask() {
	dom.formModal.open();
	document.querySelector("#form").addEventListener("submit", addTask);

	function addTask(e) {
		e.preventDefault();
		const formInputs = getFormInput();
		const taskIndex = todolist.create(formInputs);
		const taskObj = todolist.getTask(taskIndex);
		dom.taskDiv.create(taskIndex, taskObj.getInfo());
		dom.formModal.close();
	}
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
