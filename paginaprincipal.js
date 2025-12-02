let listaDeMidias = [];
let filtroAtual = 'todos';
let graficoInstance = null;
let usuarioAtual = null;
let chaveStorage = null;

document.addEventListener('DOMContentLoaded', () => {
    usuarioAtual = localStorage.getItem('usuarioLogado');
    if (!usuarioAtual) window.location.href = 'login.html';
    chaveStorage = `mediaVault_${usuarioAtual}`;
    carregarDados();
    atualizarTela();
    inicializarGrafico();
    sincronizarTierList();
});

document.getElementById('formMedia').addEventListener('submit', function(event) {
    event.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const categoria = document.getElementById('categoria').value;
    const nota = document.getElementById('nota').value;
    const novaMidia = { id: Date.now(), titulo: titulo, categoria: categoria, nota: nota };
    listaDeMidias.unshift(novaMidia);
    salvarDados();
    atualizarTela();
    enviarParaTierList();
    document.getElementById('formMedia').reset();
    Swal.fire({
        icon: 'success',
        title: 'Adicionado!',
        background: '#1e1e1e',
        color: '#fff',
        timer: 1500,
        showConfirmButton: false
    });
});

window.filtrar = function(categoria) {
    filtroAtual = categoria;
    const botoes = document.querySelectorAll('.btn-outline-light, .btn-outline-warning, .btn-outline-danger, .btn-outline-success, .btn-outline-info');
    botoes.forEach(btn => {
        btn.classList.remove('active');
        btn.style.opacity = "0.6";
    });
    const btnAtivo = document.getElementById(`btn-${categoria}`);
    if(btnAtivo) {
        btnAtivo.classList.add('active');
        btnAtivo.style.opacity = "1";
    }
    atualizarTela();
}

function atualizarTela() {
    const container = document.getElementById('listaItens');
    container.innerHTML = '';
    let listaParaExibir = listaDeMidias;
    if (filtroAtual !== 'todos') {
        listaParaExibir = listaDeMidias.filter(item => item.categoria === filtroAtual);
    }
    if (listaParaExibir.length === 0) {
        container.innerHTML = `
            <div class="text-center text-muted mt-5">
                <i class="fas fa-ghost fa-3x"></i>
                <p class="mt-2">Nada por aqui.</p>
            </div>`;
        atualizarGrafico();
        return;
    }
    listaParaExibir.forEach(midia => {
        let icone = 'fa-question';
        let corBadge = 'bg-secondary';
        if(midia.categoria === 'filme') { icone = 'fa-film'; corBadge = 'badge-movie'; }
        if(midia.categoria === 'jogo') { icone = 'fa-gamepad'; corBadge = 'badge-game'; }
        if(midia.categoria === 'livro') { icone = 'fa-book'; corBadge = 'badge-book'; }
        if(midia.categoria === 'serie') { icone = 'fa-tv'; corBadge = 'badge-series'; }
        container.innerHTML += `
            <div class="media-item">
                <div class="media-icon"><i class="fas ${icone}"></i></div>
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
    });
    atualizarGrafico();
}

function salvarDados() {
    localStorage.setItem(chaveStorage, JSON.stringify(listaDeMidias));
}

function carregarDados() {
    const dados = localStorage.getItem(chaveStorage);
    if (dados) listaDeMidias = JSON.parse(dados);
}

window.deletarItem = function(id) {
    Swal.fire({
        title: 'Deletar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Sim',
        background: '#1e1e1e',
        color: '#fff'
    }).then((result) => {
        if (result.isConfirmed) {
            listaDeMidias = listaDeMidias.filter(item => item.id !== id);
            salvarDados();
            atualizarTela();
            enviarParaTierList();
        }
    });
}

window.limparTudo = function() {
    if(listaDeMidias.length === 0) return;
    Swal.fire({
        title: 'Limpar tudo?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Sim',
        background: '#1e1e1e',
        color: '#fff'
    }).then((result) => {
        if (result.isConfirmed) {
            listaDeMidias = [];
            salvarDados();
            atualizarTela();
            enviarParaTierList();
        }
    });
}

window.fazerLogout = function() {
    localStorage.removeItem('estaLogado');
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'login.html';
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
                legend: { position: 'bottom', labels: { color: '#e0e0e0' } }
            }
        }
    });
}

function atualizarGrafico() {
    if (!graficoInstance) return;
    let qtdFilmes = listaDeMidias.filter(m => m.categoria === 'filme').length;
    let qtdJogos = listaDeMidias.filter(m => m.categoria === 'jogo').length;
    let qtdLivros = listaDeMidias.filter(m => m.categoria === 'livro').length;
    let qtdSeries = listaDeMidias.filter(m => m.categoria === 'serie').length;
    graficoInstance.data.datasets[0].data = [qtdFilmes, qtdJogos, qtdLivros, qtdSeries];
    graficoInstance.update();
}

function enviarParaTierList() {
    localStorage.setItem(`tierlist_${usuarioAtual}`, JSON.stringify(listaDeMidias));
}

function sincronizarTierList() {
    window.addEventListener('storage', () => {
        const dados = localStorage.getItem(`tierlist_${usuarioAtual}`);
        if (dados) {
            listaDeMidias = JSON.parse(dados);
            salvarDados();
            atualizarTela();
        }
    });
}
