document.getElementById('name').addEventListener('input', validateName);
document.getElementById('task').addEventListener('input', validateTask);

// Валидация имени
function validateName() {
    const nameInput = document.getElementById('name');
    const name = nameInput.value.trim();
    
    // Проверяем: только кириллица и пробелы, минимум 2 символа
    const nameRegex = /^[а-яёА-ЯЁ\s]{2,}$/;
    
    if (!nameRegex.test(name)) {
        showError(nameInput, 'Имя должно содержать только кириллицу и быть не менее 2 символов');
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
    
    if (task.length < 10) {
        showError(taskInput, 'Сообщение должно содержать минимум 10 символов');
        return false;
    } else {
        clearError(taskInput);
        return true;
    }
}

// Обработка ошибки
function showError(input, message) {
    input.classList.add('error-border');
    
    let errorElement = input.parentElement.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        input.parentElement.appendChild(errorElement);
    }
    errorElement.textContent = message;
}


function clearError(input) {
    // Убираем классы
    input.classList.remove('error-border');
    
    // Скрываем текст ошибки
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
    }
}
// Очистка ошибок при закрытии модалки
document.getElementById('cancel').addEventListener('click', function() {
    
    addTask.close();
    addTask.reset();

});
document.getElementById('addTask').addEventListener('click', function(event) {
    if (event.target === this) {
        this.close();
    }
});

// Общая проверка выполнения валидаций
function validateForm() {
    const isNameValid = validateName();
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

    alert('Задача добавлена!');
    addTask.close();
    form.reset();

}

function addTaskToList(taskData) {
    const taskList = document.querySelector('.diary__task-list');


    const taskElement = document.createElement('div');
    taskElement.className = 'task-item';
    taskElement.innerHTML = `
        <div class="task-item__header">
            <h4 class="task-item__title">${taskData.name}</h4>
            <span class="task-item__date">${taskData.date}</span>
        </div>
        <p class="task-item__description">${taskData.task}</p>
        <div class="task-item__actions">
            <button class="task-item__delete">Удалить</button>
        </div>
    `;

    taskList.appendChild(taskElement);

    taskElement.querySelector('.task-item__delete').addEventListener('click', function() {
        taskElement.remove();
    });
}

