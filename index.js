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
