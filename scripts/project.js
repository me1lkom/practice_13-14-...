const projects = {
    project1: {
        title: "Сайт-визитка",
        description: "Сайт-портфолио на HTML, CSS и Bootstrap с адаптивным дизайном.",
        images: ["../images/project1.jpg"],
        codeLink: "https://github.com/me1lkom/project-2",
        demoLink: "https://me1lkom.github.io/project-2/index_v1.html"
    },
    project2: {
        title: "Todo приложение",
        description: "Приложение для управления задачами с использованием JavaScript.",
        images: ["../images/project2.png"],
        codeLink: "https://github.com/..",
        demoLink: "https://mysite.com"  
    },
    project3: {
        title: "Интернет магазин",
        description: "Прототип интернет-магазина с корзиной товаров и фильтрацией.",
        images: ["../images/project3.png"],
        codeLink: "https://github.com/me1lkom/project-2",
        demoLink: "https://me1lkom.github.io/project-2/pages/goods_v1.html"  
    }
}

// Находим все карточки
const projectCards = document.querySelectorAll('.project-page__card');

// Добавляем обработчики
projectCards.forEach(card => {
    card.addEventListener('click', function() {
        const projectId = this.dataset.project;
        const project = projects[projectId];
        
        // Заполняем модалку данными
        document.getElementById('modalImage').src = project.images[0];
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDescription').textContent = project.description;
        document.getElementById('modalCodeLink').href = project.codeLink;
        document.getElementById('modalDemoLink').href = project.demoLink;
        
        // Показываем модалку
        document.getElementById('projectModal').showModal();
    });
});

document.getElementById('close').addEventListener('click', function() {
    
    projectModal.close();
    projectModal.reset();

});