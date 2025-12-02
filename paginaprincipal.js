let listaDeMidias = [];
let filtroAtual = 'todos';
let graficoInstance = null;
let usuarioAtual = null;
let chaveStorage = null;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificação de Segurança
    usuarioAtual = localStorage.getItem('usuarioLogado');
    if (!usuarioAtual) {
        window.location.href = 'login.html';
        return;
    }

    // 2. Define onde salvar os dados desse usuário específico
    chaveStorage = `mediaVault_dados_${usuarioAtual}`;
    
    // 3. Inicializa tudo
    carregarDados();
    inicializarGrafico(); // Cria o gráfico vazio primeiro
    atualizarTela();      // Preenche a lista e atualiza o gráfico
});

// --- Lógica do Gráfico (Chart.js) ---
function inicializarGrafico() {
    const ctx = document.getElementById('meuGrafico');
    if(!ctx) return;

    graficoInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Filmes', 'Jogos', 'Livros', 'Séries'],
            datasets: [{
                data: [0, 0, 0, 0],
                backgroundColor: ['#ffc107', '#dc3545', '#198754', '#0dcaf0'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: '#e0e0e0' } }
            }
        }
    });
}

function atualizarGrafico() {
    if (!graficoInstance) return;

    // Conta quantos itens de cada tipo existem
    const qtdFilmes = listaDeMidias.filter(m => m.categoria === 'filme').length;
    const qtdJogos = listaDeMidias.filter(m => m.categoria === 'jogo').length;
    const qtdLivros = listaDeMidias.filter(m => m.categoria === 'livro').length;
    const qtdSeries = listaDeMidias.filter(m => m.categoria === 'serie').length;

    // Atualiza os dados do gráfico
    graficoInstance.data.datasets[0].data = [qtdFilmes, qtdJogos, qtdLivros, qtdSeries];
    graficoInstance.update();
}

// --- Funções Principais ---
document.getElementById('formMedia').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const novaMidia = {
        id: Date.now(),
        titulo: document.getElementById('titulo').value,
        categoria: document.getElementById('categoria').value,
        nota: document.getElementById('nota').value
    };

    listaDeMidias.unshift(novaMidia); // Adiciona no começo
    salvarDados();
    atualizarTela();
    
    document.getElementById('formMedia').reset();
    
    Swal.fire({
        icon: 'success',
        title: 'Adicionado!',
        background: '#1f1f1f',
        color: '#fff',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });
});

function atualizarTela() {
    const container = document.getElementById('listaItens');
    container.innerHTML = '';

    // Filtra a lista se necessário
    let listaExibicao = listaDeMidias;
    if (filtroAtual !== 'todos') {
        listaExibicao = listaDeMidias.filter(item => item.categoria === filtroAtual);
    }

    if (listaExibicao.length === 0) {
        container.innerHTML = `
            <div class="text-center text-muted py-5">
                <i class="fas fa-ghost fa-3x mb-3"></i>
                <p>Nenhum item encontrado.</p>
            </div>`;
    } else {
        listaExibicao.forEach(midia => {
            // Define ícone e cor baseada na categoria
            let icone = 'fa-question';
            let cor = 'text-white';
            
            if(midia.categoria === 'filme') { icone = 'fa-film'; cor = 'text-warning'; }
            else if(midia.categoria === 'jogo') { icone = 'fa-gamepad'; cor = 'text-danger'; }
            else if(midia.categoria === 'livro') { icone = 'fa-book'; cor = 'text-success'; }
            else if(midia.categoria === 'serie') { icone = 'fa-tv'; cor = 'text-info'; }

            container.innerHTML += `
                <div class="d-flex align-items-center justify-content-between p-3 mb-2 rounded" style="background: #252525; border-left: 4px solid var(--primary);">
                    <div class="d-flex align-items-center">
                        <div class="me-3 fs-4 ${cor}" style="width: 40px; text-align: center;">
                            <i class="fas ${icone}"></i>
                        </div>
                        <div>
                            <h6 class="mb-0 fw-bold">${midia.titulo}</h6>
                            <small class="text-muted">
                                ${midia.categoria.toUpperCase()} • 
                                <i class="fas fa-star text-warning ms-1"></i> ${midia.nota}/10
                            </small>
                        </div>
                    </div>
                    <button onclick="deletarItem(${midia.id})" class="btn btn-sm btn-outline-danger border-0">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        });
    }
    
    // IMPORTANTE: Sempre atualizar o gráfico quando a tela mudar
    atualizarGrafico();
    atualizarBotoesFiltro();
}

// --- Utilitários ---
function salvarDados() {
    localStorage.setItem(chaveStorage, JSON.stringify(listaDeMidias));
}

function carregarDados() {
    const dados = localStorage.getItem(chaveStorage);
    if (dados) listaDeMidias = JSON.parse(dados);
}

window.filtrar = function(cat) {
    filtroAtual = cat;
    atualizarTela();
}

function atualizarBotoesFiltro() {
    // Remove classe 'active' de todos e adiciona no atual
    document.querySelectorAll('.btn-sm').forEach(btn => btn.classList.remove('active'));
    const btnAtivo = document.getElementById(`btn-${filtroAtual}`);
    if(btnAtivo) btnAtivo.classList.add('active');
}

window.deletarItem = function(id) {
    listaDeMidias = listaDeMidias.filter(item => item.id !== id);
    salvarDados();
    atualizarTela();
}

window.limparTudo = function() {
    Swal.fire({
        title: 'Tem certeza?',
        text: "Isso apagará toda a sua lista!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, apagar',
        background: '#1f1f1f',
        color: '#fff'
    }).then((result) => {
        if (result.isConfirmed) {
            listaDeMidias = [];
            salvarDados();
            atualizarTela();
        }
    });
}

window.fazerLogout = function() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'login.html';
}