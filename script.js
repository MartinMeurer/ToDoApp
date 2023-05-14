const fileName = "toDoEntries";

const maxEntries = 32;
const maxNameLength = 32;


const entries = [];
const storedEntries = JSON.parse(localStorage.getItem(fileName));
const error = document.querySelector(".error");

const menu = document.querySelector(".menu");
const menu_height = 400;
const entry_height = 65;
menu.style.height = menu_height;

const menu_main = document.querySelector(".menu_main");
let entry_list = document.querySelector(".menu_list")

const add_entry = document.querySelector("#menu_add_entry");
const new_entry = document.querySelector("#menu_new_entry");

new_entry.focus();

let key = false;
let trimmedName = "";


function Trim(string){
	string = string.trim();
	for (let i = 0; i < string.length; i++){
		string = string.replace(/	/g, " ");
		string = string.replace(/  /g, " ");
	};
	return string
}




add_entry.addEventListener("click", () => {
	trimmedName = Trim(new_entry.value);
	if (trimmedName.length > maxNameLength) {
		error.innerText = "Name too long. Not more than " + String(maxNameLength) + " letters.";
		console.log("Error: name too long.")
	} else {
		error.innerText = "";
		CreateEntry(trimmedName)
	}
});
new_entry.addEventListener("keyup", () => {key = false});
new_entry.addEventListener("keydown", event => {
	trimmedName = Trim(new_entry.value);
	if (trimmedName.length > maxNameLength) {
		error.innerText = "Name too long. Not more than " + String(maxNameLength) + " letters.";
		console.log("Error: name too long.")
	} else {
		error.innerText = "";
		if (!key && event.key == "Enter") {
			CreateEntry(trimmedName);
			key = true
		}	
	}
});

console.log(entries);

if (storedEntries != undefined && storedEntries != [] && storedEntries != null && storedEntries != 0 && storedEntries.length > 0) {
	for (let name of storedEntries) {
		CreateEntry(name)
	}
}

console.log(entries);

function SaveEntries () {
	if (entries.length > 0) {
		localStorage.setItem(fileName, JSON.stringify(entries))
	} else {
		localStorage.removeItem(fileName);
	}
}

function CreateEntry (name) {
	if (name != "") {
		if (!entries.includes(name)) {
			if (entries.length < maxEntries) {
				if (entries.length == 0) {
					entry_list = document.createElement("div");
					entry_list.classList.add("menu_list");
					menu_main.appendChild(entry_list)
				}

				entries.push(name);
			
				const menu_entry = document.createElement("div");
				menu_entry.classList.add("menu_entry");
				menu_entry.setAttribute("id", name);

					const menu_item = document.createElement("div");
					menu_item.classList.add("menu_item");
			
						const menu_input = document.createElement("input");
						menu_input.setAttribute("id", "menu_item" + String(entries.length));
						menu_input.setAttribute("type", "checkbox");

						const menu_label = document.createElement("label");
						menu_label.setAttribute("for", "menu_item" + String(entries.length));
						menu_label.innerText = name

						menu_item.appendChild(menu_input);
						menu_item.appendChild(menu_label);

					const menu_actions = document.createElement("div");
					menu_actions.classList.add("menu_actions");

						const menu_button1 = document.createElement("button");
							const menu_icon1 = document.createElement("i");
							menu_icon1.classList.add("fa-solid", "fa-pencil", "fa-xl");

							menu_button1.appendChild(menu_icon1);
							menu_button1.addEventListener("click", () => {
								const menu_edit = document.createElement("div");
								menu_edit.classList.add("menu_edit");

									const menu_edit_label = document.createElement("label");
									menu_edit_label.setAttribute("for", "menu_entry_name");
									menu_edit_label.innerText="Edit:";
		
									const menu_edit_input = document.createElement("input");
									menu_edit_input.setAttribute("id", "menu_entry_name");
									menu_edit_input.setAttribute("type", "text");
		
									const menu_edit_button = document.createElement("button");
									menu_edit_button.innerText = "Save";

									menu_edit.appendChild(menu_edit_label);
									menu_edit.appendChild(menu_edit_input);
									menu_edit.appendChild(menu_edit_button);

									menu_edit_input.value = menu_label.innerText;

									menu_edit_button.addEventListener("click", () => {
										trimmedName = Trim(menu_edit_input.value);
										if (trimmedName != "") {
											if (trimmedName == menu_label.innerText || !entries.includes(trimmedName)) {
												ReplaceEntry(trimmedName)
											} else {
												error.innerText ="Entry with this name already exists.";
												console.log("Error: entry already exists.")
											}
										} else {
											error.innerText = "Please enter a new name for the entry.";
											console.log("Error: no valid name for entry.")
										}
									});
									menu_edit_input.addEventListener("keydown", event => {
										trimmedName = Trim(menu_edit_input.value);
										if (trimmedName.length > maxNameLength) {
											error.innerText = "Name too long. Not more than " + String(maxNameLength) + " letters.";
											console.log("Error: name too long.")
										} else {
											error.innerText = "";
											if (event.key == "Enter") {
												if (trimmedName != "") {
													if (trimmedName == menu_label.innerText || !entries.includes(trimmedName)) {
														ReplaceEntry(trimmedName);
													} else {
														error.innerText ="Entry with this name already exists.";
														console.log("Error: entry already exists.")
													}
												} else {
													error.innerText = "Please enter a new name for the entry.";
													console.log("Error: no valid name for entry.")
												}
											}else if (event.key == "Escape") {
												entry_list.replaceChild(menu_entry, menu_edit);
												console.log(entries);																	
											}
										}
									})
									function ReplaceEntry(name) {
										menu_label.innerText = name;
										entries.splice(entries.indexOf(menu_entry.getAttribute("id")), 1, name);
										menu_entry.setAttribute("id", name);
										entry_list.replaceChild(menu_entry, menu_edit);
										SaveEntries();
										console.log(entries)								
									}

								entry_list.replaceChild(menu_edit, menu_entry);
								menu_edit_input.focus();
							});
						const menu_button2 = document.createElement("button");
							const menu_icon2 = document.createElement("i");
							menu_icon2.classList.add("fa-solid", "fa-trash-can", "fa-xl")

							menu_button2.appendChild(menu_icon2);
							menu_button2.addEventListener("click", () => {
								entries.splice(entries.indexOf(menu_entry.getAttribute("id")), 1);
								menu.style.height = String(menu_height + entries.length * entry_height) + "px";
								entry_list.removeChild(menu_entry);
								if (entries.length == 0){
									entry_list.remove()
								}
								SaveEntries();
								console.log(entries)
							});

						menu_actions.appendChild(menu_button1);
						menu_actions.appendChild(menu_button2);

				menu_entry.appendChild(menu_item);
				menu_entry.appendChild(menu_actions);

				menu_entry.style.height = String(entry_height) + "px";
				menu.style.height = String(menu_height + entries.length * entry_height) + "px";

				entry_list.appendChild(menu_entry);

				new_entry.value = "";
				error.innerText = "";
			
				SaveEntries();
			
				console.log(entries)
			} else {
				error.innerText ="Not more than " + String(maxEntries) + " entries.";
				console.log("Error: too many entries.")
			}		
		} else {
			error.innerText ="Entry with this name already exists.";
			console.log("Error: entry already exists.")
		}		
	} else {
		error.innerText = "Please enter a name for the new entry.";
		console.log("Error: no valid name for entry.")
	}
}

