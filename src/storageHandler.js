"use strict";

// Module that deals with how tasks are stored after closing the browser. Uses localStorage.
export const storage = (() => {
	function size() {
		return localStorage.length;
	}

	function save(index, value) {
		const _value = JSON.stringify(value.getInfo());
		localStorage.setItem(index, _value);
	}

	function getFrom(index) {
		return JSON.parse(localStorage.getItem(index));
	}

	function modify(index, value) {
		localStorage.setItem(index, JSON.stringify(value));
	}

	function removeAt(index) {
		localStorage.removeItem(index);
	}

	return {
		size,
		save,
		getFrom,
		modify,
		removeAt,
	};
})();
