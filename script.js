class SPA {
    constructor() {
      this.elements = JSON.parse(localStorage.getItem('elements')) || ['Task 1', 'Task 2', 'Task 3'];
      this.renderElements();
      this.setupEventListeners();
    }
  
    renderElements() {
      const elementList = document.getElementById('elementList');
      elementList.innerHTML = '';
  
      this.elements.forEach((element, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-item');
  
        const numberSpan = document.createElement('span');
        const contentSpan = document.createElement('span');
  
        numberSpan.textContent = `${index + 1}.`;
        contentSpan.textContent = element;
  
        const updateButton = this.createButton('Actualiza tus datos', () => this.updateElement(index));
        const deleteButton = this.createButton('Eliminar Reserva', () => this.deleteElement(index));
  
        listItem.appendChild(numberSpan);
        listItem.appendChild(contentSpan);
        listItem.appendChild(updateButton);
        listItem.appendChild(deleteButton);
  
        elementList.appendChild(listItem);
      });
    }
  
    createButton(text, onClick) {
      const button = document.createElement('button');
      button.classList.add('button');
      button.textContent = text;
      button.onclick = onClick;
      return button;
    }
  
    createElement() {
      const input = document.querySelector('.create-input');
      const value = input.value.trim();
  
      if (value) {
        this.elements.push(value);
        this.saveToLocalStorage();
        this.renderElements();
        input.value = '';
      }
    }
  
    updateElement(index) {
      const updatedElement = prompt('Ingresa tu información actualizada:');
      if (updatedElement) {
        this.elements[index] = updatedElement;
        this.saveToLocalStorage();
        this.renderElements();
      }
    }
  
    deleteElement(index) {
      const confirmDelete = confirm('Estás seguro de borrarlo?');
      if (confirmDelete) {
        this.elements.splice(index, 1);
        this.saveToLocalStorage();
        this.renderElements();
      }
    }
  
    saveToLocalStorage() {
      localStorage.setItem('elements', JSON.stringify(this.elements));
    }
  
    setupEventListeners() {
      const createButton = document.getElementById('createButton');
      createButton.addEventListener('click', () => this.createElement());
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    new SPA();
  });
  