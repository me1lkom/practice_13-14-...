document.getElementById('name').addEventListener('input', validateName);
document.getElementById('email').addEventListener('input', validateEmail);
document.getElementById('message').addEventListener('input', validateMassage);

function validateName(){
    const nameInput = document.getElementById('name');
    const name = nameInput.value.trim();

    const nameRegex = /^[а-яёА-ЯЁ\s]{2,}$/;

    if(!nameRegex.test(name)){
        showError(nameInput, 'Имя должно содержать только кириллицу и быть не менее 2 символов');
        return false;
    } else {
        clearError(nameInput);
        return true;
    }
}

function validateEmail(){
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
    
    const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        showError(emailInput, 'Введите корректный email (например: ivanov@mail.ru)');
        emailField.setAttribute('aria-invalid', 'true');
        emailError.textContent = 'Некорректный email';
        emailError.classList.remove('visually-hidden');
        return false;
    } else {
        clearError(emailInput);
        return true;
    }
}

function validateMassage(){
    const textInput = document.getElementById('message');
    const text = textInput.value.trim();
    
    if (text.length < 10) {
        showError(textInput, 'Сообщение должно содержать минимум 10 символов');
        return false;
    } else {
        clearError(textInput);
        return true;
    }
}

document.querySelectorAll('input, textarea').forEach(field => {
    field.setAttribute('aria-invalid', 'false');
});

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
        screenReaderError.classList.remove('visually-hidden');
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
        screenReaderError.textContent = '';
        screenReaderError.classList.add('visually-hidden');
    }
}


function validateForm(){
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMassageValid = validateMassage();

    return isNameValid && isEmailValid && isMassageValid;
}

function submitForm(){
    if(!validateForm()){
        return;
    }

    const form = document.getElementById('feedbackForm');
    const formData = new FormData(form);

    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        massage: formData.get('massage')
    }
    console.log(data)

    document.getElementById('form-status').textContent = 'Сообщение отправлено!';

    form.reset();

    clearError();
}