const projects = {
    project1: {
        title: "Сайт-визитка",
        description: "Сайт-портфолио на HTML, CSS и Bootstrap с адаптивным дизайном.",
        images: ["../images/project1-900.jpg"],
        codeLink: "https://github.com/me1lkom/project-2",
        demoLink: "https://me1lkom.github.io/project-2/index_v1.html"
    },
    project2: {
        title: "Todo приложение",
        description: "Приложение для управления задачами с использованием JavaScript.",
        images: ["../images/project2-900.jpg"],
        codeLink: "#",
        demoLink: "#"
    },
    project3: {
        title: "Интернет магазин", 
        description: "Прототип интернет-магазина с корзиной товаров и фильтрацией.",
        images: ["../images/project3-900.jpg"],
        codeLink: "https://github.com/me1lkom/project-2",
        demoLink: "https://me1lkom.github.io/project-2/pages/goods_v1.html"
    }
}

const projectCards = document.querySelectorAll('.project-page__card');
const projectModal = document.getElementById('projectModal');
let previousActiveElement = null;

// Функция открытия модалки
function openModal(projectId) {
    previousActiveElement = document.activeElement;
    const project = projects[projectId];

    if (!project) return;

    document.getElementById('modalImage').src = project.images[0];
    document.getElementById('modalImage').alt = `Скриншот проекта ${project.title}`;
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDescription').textContent = project.description;
    document.getElementById('modalCodeLink').href = project.codeLink;
    document.getElementById('modalDemoLink').href = project.demoLink;

    projectModal.showModal();
}

function closeModal() {
    projectModal.close();
    if (previousActiveElement) {
        previousActiveElement.focus();
    }
}

projectCards.forEach(card => {
    card.addEventListener('click', function() {
        openModal(this.dataset.project);
    });

    card.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openModal(this.dataset.project);
        }
    });
});

document.getElementById('close').addEventListener('click', closeModal);

projectModal.addEventListener('close', () => {
    if (previousActiveElement) {
        previousActiveElement.focus();
    }
});


projectModal.addEventListener('click', (event) => {
    if (event.target === projectModal) {
        closeModal();
    }
});


projectModal.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
        const focusableElements = projectModal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (focusableElements.length === 0) return;

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }
});