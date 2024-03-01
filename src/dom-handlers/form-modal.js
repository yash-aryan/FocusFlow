"use strict";

export function getCtaBtn() {
	return document.querySelector(".btn-cta");
}

export const formModal = (() => {
	function getElement() {
		return document.querySelector("#form-modal");
	}

	function getCloseBtn() {
		return document.querySelector(".form-modal__close-btn");
	}

	function getForm() {
		return document.querySelector(".form-modal__form");
	}

	function handleDialogClick(e) {
		// Hacky way to close modal on backdrop click. Modal must not have any padding.
		if (e.target.id === getElement().id) close();
	}

	function open(action, taskInfo) {
		if (!taskInfo) return show();

		document.querySelector(".form-modal__action").textContent = action;
		document.querySelector("#input-title").value = taskInfo.title;
		document.querySelector("#input-desc").value = taskInfo.desc;
		document.querySelector("#input-duedate").value = taskInfo.duedate;
		document.querySelector(`#priority-${taskInfo.priority}`).checked = true;
		document.querySelector("#input-group").value = taskInfo.group;
		show();
	}

	function close() {
		document.querySelector(".form-modal__form").reset();
		getElement().close();
	}

	function getFormData() {
		const formData = {};
		for (let [key, value] of new FormData(getForm())) {
			formData[key] = value;
		}
		return formData;
	}

	function show() {
		getElement().showModal();
	}
	return {
		getElement,
		getCloseBtn,
		getForm,
		handleDialogClick,
		open,
		close,
		getFormData,
	};
})();
