"use strict";

const optList = [
  { name: "Main Page", link: "#main-page" },
  { name: "Conversation", link: "#conversation" },
  { name: "Source", link: "#source" },
  { name: "References", link: "#references" },
];

//generates li with a-children tags
class MenuList {
  constructor(list) {
    this.list = list;
    this.items = [];
  }

  executeList() {
    this.list.map((element) => {
      this.li = document.createElement("li");
      this.li.className = "nav-item";
      this.anchor = document.createElement("a");
      this.anchor.setAttribute("href", element.link);
      this.anchor.innerText = element.name;
      this.li.append(this.anchor);
      this.items.push(this.li);
    });
    return this.items;
  }
}

//generates nav menu
class NavMenu {
  constructor(parent, items) {
    this.parent = parent;
    this.items = items;
    this.nav = document.createElement("nav");
    this.ul = document.createElement("ul");
    this.ul.setAttribute("id", "main-menu");
    this.ul.className = "nav-menu";
  }

  executeNav() {
    this.items.map((element) => this.ul.append(element));
    this.nav.append(this.ul);
    this.parent.prepend(this.nav);
  }
}

// shift focus to the next/previous item
class MoveHandler {
  constructor() {
    this.nav = document.getElementById("main-menu");
    this.activeItems = document.getElementsByClassName("nav-item");
    this.active = this.activeItems[0];
    this.selectMenuItem();

    this.nav.addEventListener("keydown", this.move.bind(this));
  }

  selectMenuItem() {
    this.active.firstElementChild.focus();
    this.active.firstElementChild.click();
    this.active.classList.add("borders");
  }

  move(event) {
    switch (event.code) {
      case "ArrowRight":
        this.active.classList.remove("borders");
        this.active = this.active.nextElementSibling || this.activeItems[0];
        this.active.classList.add("borders");
        break;
      case "ArrowLeft":
        this.active.classList.remove("borders");
        this.active =
          this.active.previousElementSibling ||
          this.activeItems[this.activeItems.length - 1];
        this.active.classList.add("borders");
        break;
    }
    this.selectMenuItem();
  }
}

const menuList = new MenuList(optList);
const listExe = menuList.executeList();
const navigation = new NavMenu(document.body, listExe);
const renderNav = navigation.executeNav();
const activeItem = new MoveHandler();
