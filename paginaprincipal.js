// --- 1. Variáveis Globais ---
let listaDeMidias = [];
let graficoInstance = null; 

// --- 2. Verificar Usuário Logado ---
// Tenta pegar quem está logado. Se não tiver ninguém, retorna null.
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

// Se tiver alguém logado, podemos usar o nome dele se quiser (opcional)
if (usuarioLogado) {
    console.log("Usuário ativo: " + usuarioLogado.nome);
}

// --- 3. Quando a página carregar ---
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se não tem usuário logado e redireciona para login (Segurança básica)
    // Se quiser permitir modo visitante, pode remover essas 3 linhas abaixo
    if (!usuarioLogado && window.location.pathname.includes('index.html')) {
        // window.location.href = 'login.html'; 
    }

    carregarDados();
    atualizarTela();
    inicializarGrafico();
    
    // Atualiza o nome no título se tiver usuário
    if(usuarioLogado) {
        const tituloBrand = document.querySelector('.navbar-brand');
        tituloBrand.innerHTML += ` <span style="font-size: 0.6em; opacity: 0.8">| Olá, ${usuarioLogado.nome}</span>`;
    }
});

// --- 4. Função para Definir onde Salvar ---
function getChaveDeArmazenamento() {
    if (usuarioLogado) {
        // Salva com o ID do usuário (ex: mediaVault_1731550000)
        return `mediaVault_${usuarioLogado.id}`;
    } else {
        // Se for visitante anônimo, usa a chave genérica
        return 'meuMediaVault_Visitante';
    }
}

// --- 5. Função para Adicionar ---
document.getElementById('formMedia').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const titulo = document.getElementById('titulo').value;
    const categoria = document.getElementById('categoria').value;
    const nota = document.getElementById('nota').value;

    const novaMidia = {
        id: Date.now(),
        titulo: titulo,
        categoria: categoria,
        nota: nota
    };

    listaDeMidias.unshift(novaMidia); 

    salvarDados();
    atualizarTela();
    document.getElementById('formMedia').reset(); 

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

// --- 6. Função para Atualizar a Lista no HTML ---
function atualizarTela() {
    const container = document.getElementById('listaItens');
    container.innerHTML = ''; 

    if (listaDeMidias.length === 0) {
        container.innerHTML = `
            <div class="text-center text-muted mt-5">
                <i class="fas fa-ghost fa-3x"></i>
                <p class="mt-2">Nenhum item cadastrado.</p>
            </div>`;
        atualizarGrafico();
        return;
    }

    listaDeMidias.forEach(midia => {
        let icone = 'fa-question';
        let corBadge = 'bg-secondary';

        if(midia.categoria === 'filme') { icone = 'fa-film'; corBadge = 'badge-movie'; }
        if(midia.categoria === 'jogo') { icone = 'fa-gamepad'; corBadge = 'badge-game'; }
        if(midia.categoria === 'livro') { icone = 'fa-book'; corBadge = 'badge-book'; }
        if(midia.categoria === 'serie') { icone = 'fa-tv'; corBadge = 'badge-series'; }

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

// --- 7. Funções de Armazenamento (AGORA INTELIGENTES) ---
function salvarDados() {
    try {
        const chave = getChaveDeArmazenamento(); // Pega a chave correta
        localStorage.setItem(chave, JSON.stringify(listaDeMidias));
    } catch (e) {
        console.error("Erro ao salvar: Navegador bloqueou LocalStorage.");
    }
}

function carregarDados() {
    try {
        const chave = getChaveDeArmazenamento(); // Pega a chave correta
        const dados = localStorage.getItem(chave);
        if (dados) {
            listaDeMidias = JSON.parse(dados);
        } else {
            listaDeMidias = []; // Importante zerar se não tiver dados
        }
    } catch (e) {
        console.error("Erro ao carregar dados.");
        listaDeMidias = [];
    }
}

// --- 8. Função de Deletar ---
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

// --- 9. Nova Função de LOGOUT ---
window.fazerLogout = function() {
    Swal.fire({
        title: 'Sair da conta?',
        text: "Você voltará para a tela de login.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, sair',
        background: '#1e1e1e',
        color: '#fff'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('usuarioLogado'); // Remove a sessão
            window.location.href = 'login.html'; // Manda pro login
        }
    });
}

// --- 10. Configuração do Gráfico ---
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

    let qtdFilmes = listaDeMidias.filter(m => m.categoria === 'filme').length;
    let qtdJogos = listaDeMidias.filter(m => m.categoria === 'jogo').length;
    let qtdLivros = listaDeMidias.filter(m => m.categoria === 'livro').length;
    let qtdSeries = listaDeMidias.filter(m => m.categoria === 'serie').length;

    graficoInstance.data.datasets[0].data = [qtdFilmes, qtdJogos, qtdLivros, qtdSeries];
    graficoInstance.update();
}