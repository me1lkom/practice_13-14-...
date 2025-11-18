document.getElementById('name').addEventListener('input', validateTaskName);
document.getElementById('task').addEventListener('input', validateTask);

// Валидация имени
function validateTaskName() {
    const nameInput = document.getElementById('name');
    const name = nameInput.value.trim();
    
    // Проверяем: только кириллица и пробелы, минимум 2 символа
    const nameRegex = /^.{2,}$/;

    if (!nameRegex.test(name)) {
        showError(nameInput, 'Название задачи должно содержать не менее 2 символов');
        return false;
    } else {
        clearError(nameInput);
        return true;
    }
}

// Валидация задачи
function validateTask() {
    const taskInput = document.getElementById('task');
    const task = taskInput.value.trim();

    if (task.length < 5 || task.length > 70) {
        showError(taskInput, 'Сообщение должно содержать от 5 до 70');
        return false;
    } else {
        clearError(taskInput);
        return true;
    }
}



function showError(input, message) {
    input.style.borderColor = '#dc3545';
    input.style.boxShadow = '0 0 5px rgba(220, 53, 69, 0.3)';
    
    let errorElement = input.parentElement.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.style.color = '#dc3545';
        errorElement.style.fontSize = '12px';
        errorElement.style.marginTop = '5px';
        errorElement.style.display = 'block';
        input.parentElement.appendChild(errorElement);
    }
    errorElement.textContent = message;

    input.setAttribute('aria-invalid', 'true');
    const screenReaderError = document.getElementById(input.id + '-error');
    if (screenReaderError) {
        screenReaderError.textContent = message;
    }
}



function clearError(input) {
    input.style.borderColor = '';
    input.style.boxShadow = '';
    
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
    }

    input.setAttribute('aria-invalid', 'false');
    const screenReaderError = document.getElementById(input.id + '-error');
    if (screenReaderError) {
        screenReaderError.textContent = 'Поле заполнено правильно';
    }
}


document.getElementById('cancel').addEventListener('click', function() {
    
    addTask.close();
    addTask.reset();

});

document.getElementById('addTask').addEventListener('click', function(event) {
    if (event.target === this) {
        this.close();
    }
});

function validateForm() {
    const isNameValid = validateTaskName();
    const isTaskValid = validateTask();
    
    return isNameValid && isTaskValid;
}



function submitForm() {
    
    if (!validateForm()) {
        return;
    }

    const form = document.getElementById('feedbackForm');
    const formData = new FormData(form);

    const data = {
        name: formData.get('name'),
        task: formData.get('task'),
        date: new Date().toLocaleDateString('ru-RU')
    };

    addTaskToList(data);

    document.getElementById('task-status').textContent = 'Задача добавлена!';


    addTask.close();
    form.reset();

}

function addTaskToList(taskData) {
    const taskList = document.querySelector('.diary__task-list');
    const status = document.getElementById('task-status');

    const taskElement = document.createElement('div');
    taskElement.className = 'task__card';
    taskElement.setAttribute('tabindex', '0');
    taskElement.setAttribute('role', 'article');
    taskElement.setAttribute('aria-label', `Задача: ${taskData.name}. Описание: ${taskData.task}. Дата: ${taskData.date}. Удалить задача.`);
    
    taskElement.innerHTML = `
        <div class="task-item__header">
            <h4 class="task-item__title">${taskData.name}</h4>
            <span class="task-item__date">${taskData.date}</span>
        </div>
        <p class="task-item__description">${taskData.task}</p>
        <div class="task-item__actions">
            <button class="task-item__delete" aria-label="Удалить задачу ${taskData.name}">Удалить</button>
        </div>
    `;

    taskList.appendChild(taskElement);

    if (status) {
        status.textContent = `Задача "${taskData.name}" добавлена`;
        setTimeout(() => status.textContent = '', 3000);
    }

    taskElement.querySelector('.task-item__delete').addEventListener('click', function() {
        const taskName = taskData.name;
        taskElement.remove();
        
        if (status) {
            status.textContent = `Задача "${taskName}" удалена`;
            setTimeout(() => status.textContent = '', 3000);
        }
    });

    return taskElement;
}
