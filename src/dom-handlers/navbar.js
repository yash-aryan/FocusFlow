"use strict";

export const navbar = (() => {
	const homeItemId = "home-item",
		itemClass = "js-item",
		activeClass = "active";
	let activeNode = getHomeItem();

	function getList() {
		return document.querySelector(".js-groups");
	}

	function getAllItems(includeHome = false) {
		const allItems = [...document.querySelectorAll(`.${itemClass}`)];
		if (includeHome) allItems.push(getHomeItem());
		return allItems;
	}

	function isItem(node) {
		return node.classList.contains(itemClass) || isHomeItem(node);
	}

	function isHomeItem(node) {
		return node.id === homeItemId;
	}

	function isActive(node) {
		return node.classList.contains(activeClass);
	}

	function markActive(node) {
		if (!isItem(node) || isActive(node)) return;

		if (activeNode) activeNode.classList.remove(activeClass);
		node.classList.add(activeClass);
		activeNode = node;
	}

	function addItem(groupName) {
		if (!groupName) return;
		if (doesItemExist()) return;
		create();
		if (!activeNode) markActive(getHomeItem());

		function doesItemExist() {
			const items = getAllItems();
			if (items.length === 0) return false;
			return items.some(node => groupName === node.dataset.group);
		}

		function create() {
			const liWrap = document.createElement("li");
			liWrap.classList.add("sidebar-list__item");
			const sidebarItem = document.createElement("button");
			sidebarItem.dataset.group = groupName;
			sidebarItem.classList.add("sidebar-list__button", itemClass);
			sidebarItem.textContent = groupName;
			liWrap.append(sidebarItem);
			getList().append(liWrap);
		}
	}

	function removeGroup(groupName) {
		const targetNode = getAllItems().find(item => item.dataset.group === groupName);

		if (!isItem(targetNode)) return;

		if (isActive(targetNode)) markActive(getHomeItem());

		targetNode.closest(".sidebar-list__item").remove();
	}

	// Private Methods
	function getHomeItem() {
		return document.querySelector(`#${homeItemId}`);
	}

	return {
		getList,
		isItem,
		isHomeItem,
		isActive,
		markActive,
		getAllItems,
		addItem,
		removeGroup,
	};
})();
