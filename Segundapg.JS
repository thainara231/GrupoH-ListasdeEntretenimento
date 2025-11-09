const categoryStyles = {
    'filme': { icon: '🎬', color: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)' },
    'serie': { icon: '📺', color: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)' },
    'game':  { icon: '🎮', color: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)' },
    'musica':{ icon: '🎵', color: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)' }
};

let items = [];

function openModal() {
    document.getElementById('modal').classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.getElementById('addForm').reset();
}

function openAboutModal() {
    document.getElementById('aboutModal').classList.add('active');
}

function closeAboutModal() {
    document.getElementById('aboutModal').classList.remove('active');
}

function updateEmptyState() {
    const contentGrid = document.getElementById('contentGrid');
    const emptyState = document.getElementById('emptyState');
    
    const visibleCards = contentGrid.querySelectorAll('.content-card:not(.hidden)').length;

    if (visibleCards === 0) {
        if (items.length === 0) {
            emptyState.innerHTML = `
                <div class="empty-state-icon">📭</div>
                <h2>Nenhum entretenimento adicionado</h2>
                <p>Clique no botão "Adicionar" para começar sua coleção</p>
            `;
        } else {
            emptyState.innerHTML = `
                <div class="empty-state-icon">x</div>
                <h2>Nenhum item encontrado</h2>
                <p>Não há itens que correspondam ao filtro selecionado.</p>
            `;
        }
        emptyState.classList.remove('hidden');
        contentGrid.classList.add('hidden');
    } else {
        emptyState.classList.add('hidden');
        contentGrid.classList.remove('hidden');
    }
}

function deleteItem(id) {
    items = items.filter(item => item.id !== id);
    saveItems();
    const card = document.querySelector(`.content-card[data-id="${id}"]`);
    if (card) {
        card.remove();
    }
    updateEmptyState();
}

function saveItems() {
    localStorage.setItem('entertainmentItems', JSON.stringify(items));
}

function loadItems() {
    const itemsString = localStorage.getItem('entertainmentItems');
    if (itemsString) {
        items = JSON.parse(itemsString);
        items.forEach(item => {
            createCard(item);
        });
    }
    updateEmptyState();
}

function filterCards(category) {
    const cards = document.querySelectorAll('.content-card');
    
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });

    updateEmptyState();
}

function createCard(item) {
    const newCard = document.createElement('div');
    newCard.className = 'content-card';
    newCard.dataset.id = item.id;
    newCard.dataset.category = item.category;

    const style = categoryStyles[item.category] || { icon: '?', color: '#888' };

    newCard.innerHTML = `
        <div class="card-icon" style="background: ${style.color};">${style.icon}</div>
        <div class="card-title">${item.title}</div>
        <div class="card-description">${item.description || 'Sem descrição'}</div>
        <button class="delete-btn">x</button>
    `;

    newCard.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation(); 
        if (confirm(`Tem certeza que quer excluir "${item.title}"?`)) {
            deleteItem(item.id);
        }
    });

    document.getElementById('contentGrid').appendChild(newCard);
}


document.getElementById('addForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const category = document.getElementById('category').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const newItem = {
        id: Date.now(), 
        category: category,
        title: title,
        description: description
    };

    items.push(newItem);
    saveItems();
    createCard(newItem);
    
    document.getElementById('filterCategory').value = 'all';
    filterCards('all');
    
    closeModal();
});

document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

document.getElementById('aboutModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeAboutModal();
    }
});

document.getElementById('filterCategory').addEventListener('change', function(e) {
    filterCards(e.target.value);
});

loadItems();