 let listaDeMidias = [];
        let graficoInstance = null;  // Para guardar a referência do gráfico

       
        document.addEventListener('DOMContentLoaded', () => {
            carregarDados();
            atualizarTela();
            inicializarGrafico();
        });

        
        document.getElementById('formMedia').addEventListener('submit', function(event) {
            event.preventDefault(); // Impede a página de recarregar

            // Pegar valores dos inputs
            const titulo = document.getElementById('titulo').value;
            const categoria = document.getElementById('categoria').value;
            const nota = document.getElementById('nota').value;

            // Criar objeto
            const novaMidia = {
                id: Date.now(), // ID único baseado no tempo
                titulo: titulo,
                categoria: categoria,
                nota: nota
            };

            // Adicionar ao array
            listaDeMidias.unshift(novaMidia); // Adiciona no começo

            // Salvar e Limpar
            salvarDados();
            atualizarTela();
            document.getElementById('formMedia').reset(); // Limpa o formulário

            // Alerta Bonito
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Item adicionado à coleção.',
                background: '#1e1e1e',
                color: '#fff',
                timer: 1500,
                showConfirmButton: false
            });
        });

        function atualizarTela() {
            const container = document.getElementById('listaItens');
            container.innerHTML = ''; // Limpa a lista atual

            if (listaDeMidias.length === 0) {
                container.innerHTML = `
                    <div class="text-center text-muted mt-5">
                        <i class="fas fa-ghost fa-3x"></i>
                        <p class="mt-2">Nenhum item cadastrado.</p>
                    </div>`;
                atualizarGrafico();
                return;
            }
           // Loop para criar cada item
            listaDeMidias.forEach(midia => {
                // Definir ícone e cor baseados na categoria
                let icone = 'fa-question';
                let corBadge = 'bg-secondary';

                if(midia.categoria === 'filme') { icone = 'fa-film'; corBadge = 'badge-movie'; }
                if(midia.categoria === 'jogo') { icone = 'fa-gamepad'; corBadge = 'badge-game'; }
                if(midia.categoria === 'livro') { icone = 'fa-book'; corBadge = 'badge-book'; }
                if(midia.categoria === 'serie') { icone = 'fa-tv'; corBadge = 'badge-series'; }

                // Criar HTML do item
                const itemHTML = `
                    <div class="media-item">
                        <div class="media-icon">
                            <i class="fas ${icone}"></i>
                        </div>
                        <div class="media-info">
                            <div class="media-title">${midia.titulo}</div>
                            <div class="media-meta">
                                <span class="badge ${corBadge}">${midia.categoria.toUpperCase()}</span>
                                <span class="ms-2"><i class="fas fa-star text-warning"></i> ${midia.nota}/10</span>
                            </div>
                        </div>
                        <button onclick="deletarItem(${midia.id})" class="btn btn-sm btn-outline-danger">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `;
                container.innerHTML += itemHTML;
            });

            atualizarGrafico();
        }

       
        function salvarDados() {
            try {
                localStorage.setItem('meuMediaVault', JSON.stringify(listaDeMidias));
            } catch (e) {
                console.error("Erro ao salvar: Navegador bloqueou LocalStorage.");
            }
        }

        function carregarDados() {
            try {
                const dados = localStorage.getItem('meuMediaVault');
                if (dados) {
                    listaDeMidias = JSON.parse(dados);
                }
            } catch (e) {
                console.error("Erro ao carregar dados.");
            }
        }

        window.deletarItem = function(id) {
            Swal.fire({
                title: 'Tem certeza?',
                text: "Não será possível recuperar este item!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sim, deletar!',
                background: '#1e1e1e',
                color: '#fff'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Filtra a lista removendo o ID clicado
                    listaDeMidias = listaDeMidias.filter(item => item.id !== id);
                    salvarDados();
                    atualizarTela();
                    Swal.fire({
                        title: 'Deletado!',
                        icon: 'success',
                        background: '#1e1e1e',
                        color: '#fff',
                        timer: 1000,
                        showConfirmButton: false
                    });
                }
            });
        }

        window.limparTudo = function() {
            if(listaDeMidias.length === 0) return;
            
            Swal.fire({
                title: 'Apagar tudo?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Sim, apagar tudo',
                background: '#1e1e1e',
                color: '#fff'
            }).then((result) => {
                if (result.isConfirmed) {
                    listaDeMidias = [];
                    salvarDados();
                    atualizarTela();
                }
            });
        }

     
        function inicializarGrafico() {
            const ctx = document.getElementById('meuGrafico');
            if(!ctx) return;

            graficoInstance = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Filmes', 'Jogos', 'Livros', 'Séries'],
                    datasets: [{
                        data: [0, 0, 0, 0],
                        backgroundColor: ['#ffa726', '#ef5350', '#66bb6a', '#42a5f5'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { color: '#e0e0e0' }
                        }
                    }
                }
            });
        }

        function atualizarGrafico() {
            if (!graficoInstance) return;

            // Contar quantos itens de cada categoria existem
            let qtdFilmes = listaDeMidias.filter(m => m.categoria === 'filme').length;
            let qtdJogos = listaDeMidias.filter(m => m.categoria === 'jogo').length;
            let qtdLivros = listaDeMidias.filter(m => m.categoria === 'livro').length;
            let qtdSeries = listaDeMidias.filter(m => m.categoria === 'serie').length;

            // Atualizar os dados do gráfico
            graficoInstance.data.datasets[0].data = [qtdFilmes, qtdJogos, qtdLivros, qtdSeries];
            graficoInstance.update();
        }



