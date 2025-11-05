function openModal() {
            document.getElementById('modal').classList.add('active');
        }

        function closeModal() {
            document.getElementById('modal').classList.remove('active');
            document.getElementById('addForm').reset();
        }

        function updateEmptyState() {
            const contentGrid = document.getElementById('contentGrid');
            const emptyState = document.getElementById('emptyState');
            
            if (contentGrid.children.length === 0) {
                emptyState.classList.remove('hidden');
                contentGrid.classList.add('hidden');
            } else {
                emptyState.classList.add('hidden');
                contentGrid.classList.remove('hidden');
            }
        }

        document.getElementById('addForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const categoryIcons = {
                'filme': '🎬',
                'serie': '📺',
                'game': '🎮',
                'musica': '🎵'
            };

            const category = document.getElementById('category').value;
            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;

            const newCard = document.createElement('div');
            newCard.className = 'content-card';
            newCard.innerHTML = `
                <div class="card-icon">${categoryIcons[category]}</div>
                <div class="card-title">${title}</div>
                <div class="card-description">${description || 'Sem descrição'}</div>
            `;

            document.getElementById('contentGrid').appendChild(newCard);
            updateEmptyState();
            closeModal();
        });

        document.getElementById('modal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // Inicializa o estado vazio
        updateEmptyState();
