"use strict";
import "../styles/modals.css";

import { formatDate } from "../utils/format-date";

const inputIds = [
	"title-info",
	"duedate-info",
	"desc-info",
	"priority-info",
	"group-info",
	"completed-info",
];

export const infoModal = (() => {
	const inputNodes = inputIds.map(id => document.getElementById(id));

	function getElement() {
		return document.querySelector("#info-modal");
	}

	function getCloseBtn() {
		return document.querySelector(".info-modal__close-btn");
	}

	function handleDialogClick(e) {
		// Hacky way to close modal on backdrop click. Modal must not have any padding.
		if (e.target.id === getElement().id) close();
	}

	function open(taskInfo) {
		inputNodes[0].textContent = taskInfo.title;
		inputNodes[1].textContent = formatDate(taskInfo.duedate);
		inputNodes[2].textContent = taskInfo.desc || "<no description>";
		inputNodes[3].textContent = taskInfo.priority;
		inputNodes[4].textContent = taskInfo.group || "<not in any group>";
		inputNodes[5].textContent = taskInfo.completed ? "Completed!" : "Not yet completed";
		getElement().showModal();
	}

	function close() {
		getElement().close();
		inputNodes.forEach(node => (node.textContent = ""));
	}

	function getFormData() {
		const formData = {};
		for (let [key, value] of new FormData(getForm())) {
			formData[key] = value;
		}
		return formData;
	}

	return {
		getElement,
		getCloseBtn,
		handleDialogClick,
		open,
		close,
		getFormData,
	};
})();
