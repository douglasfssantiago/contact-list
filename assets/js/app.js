'use strict';

const inputText = select('.input-text');
const addButton = select('.button-add');
const contactDisplay = select('.contact-display');
const alert = select('.alert');
const counterDisplay = select('.counter-display');
const contacts = [];
let counter = 0;

class Contact {
  #name;
  #city;
  #email;

  constructor(name, city, email) {
    this.#name = name;
    this.#city = city;
    this.#email = email;
  }

  set name(name) {
    this.#name = name;
  }

  set city(city) {
    this.#city = city;
  }

  set email(email) {
    this.#email = email;
  }

  get name() {
    return this.#name;
  }

  get city() {
    return this.#city;
  }

  get email() {
    return this.#email;
  }
}

function select(selector, scope = document) {
    return scope.querySelector(selector);
}

function listen(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function listContacts() {

  const inputValues = inputText.value.split(',').map(value => value.trim());
  
  const [name, city, email] = inputValues.map(value => value.trim()); 
  const newContact = new Contact(name, city, email); 
  contacts.unshift(newContact); 
  
  const contactBox = document.createElement('div'); 
  contactBox.className = 'box'; 
  
  const contactName = document.createElement('p'); 
  contactName.textContent = `Name: ${newContact.name}`; 
  contactBox.appendChild(contactName); 
  
  const contactCity = document.createElement('p'); 
  contactCity.textContent = `City: ${newContact.city}`; 
  contactBox.appendChild(contactCity); 
  
  const contactEmail = document.createElement('p'); 
  contactEmail.textContent = `Email: ${newContact.email}`; 
  contactBox.appendChild(contactEmail);

  addContactListener(contactBox);
  addContact(contactBox);
}

function addContact(contactBox) { 
  contactDisplay.insertBefore(contactBox, contactDisplay.firstChild); 
  counter++; updateCounter(); 
  inputText.value = ''; 
  alert.textContent = ''; 
}

function addContactListener(contactBox) { 
  listen('click', contactBox, function () { 
    deleteContact(contactBox); 
  }); 
}

function validateContact() {
  const inputValue = inputText.value.trim();

  if (!inputValue) {
    alert.textContent = 'Please enter the required information!';
    inputText.focus();
    return false;
  }

  if (!inputValue.includes(',')) {
    alert.textContent = 'Separate the information with commas!';
    
    return false;
  }

  const [name, city, email] = inputValue.split(',').map(value => value.trim()); 
  if (!email.includes('@')) { 
    alert.textContent = 'Include a valid email!'; 
    inputText.focus(); 
    return false; 
  }

  alert.textContent = '';
  return true;
}

listen('click', addButton, function () {
  if (validateContact()) {
    listContacts();
    } else {
      inputText.focus();
    }
  });

function deleteContact(contactBox) { 
  contactDisplay.removeChild(contactBox); 
  counter--; 
  updateCounter(); 
} 

function updateCounter() { 
  counterDisplay.innerHTML = `<p>Contacts saved: ${counter}</p>`; 
}

