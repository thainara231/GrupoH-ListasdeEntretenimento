document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formCadastro");
    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");
    const confirmaInput = document.getElementById("confirmaSenha");
    const barraForca = document.getElementById("barraForca");
    const textoForca = document.getElementById("textoForca");
    const btnVerSenha = document.getElementById("btnVerSenha");

    // --- 1. Lógica de Força da Senha (Do seu amigo, adaptada) ---
    senhaInput.addEventListener("input", () => {
        const senha = senhaInput.value;
        let forca = 0;
        let mensagem = "Muito Fraca";
        let cor = "bg-danger";

        // Critérios
        if (senha.length >= 8) forca += 25;
        if (/[a-z]/.test(senha) && /[A-Z]/.test(senha)) forca += 25;
        if (/[0-9]/.test(senha)) forca += 25;
        if (/[!@#$%^&*()]/.test(senha)) forca += 25;

        // Definir Mensagem e Cor
        if (forca >= 50) { mensagem = "Média"; cor = "bg-warning"; }
        if (forca >= 100) { mensagem = "Forte"; cor = "bg-success"; }

        // Atualizar visual (Bootstrap)
        barraForca.style.width = forca + "%";
        barraForca.className = `progress-bar ${cor}`; // Troca a classe de cor do Bootstrap
        textoForca.innerText = `Força: ${mensagem}`;
        textoForca.style.color = forca >= 100 ? '#00ff00' : '#aaa';
    });

    // --- 2. Ver Senha (Olhinho) ---
    btnVerSenha.addEventListener("click", () => {
        const tipo = senhaInput.type === "password" ? "text" : "password";
        senhaInput.type = tipo;
        // Troca o ícone
        btnVerSenha.innerHTML = tipo === "password" ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });

    // --- 3. Salvar Cadastro (LocalStorage) ---
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Validar se senhas batem
        if (senhaInput.value !== confirmaInput.value) {
            Swal.fire({
                icon: 'error',
                title: 'Ops!',
                text: 'As senhas não coincidem!',
                background: '#1e1e1e',
                color: '#fff'
            });
            return;
        }

        // Criar usuário
        const novoUsuario = {
            id: Date.now(),
            nome: nomeInput.value,
            email: emailInput.value,
            senha: senhaInput.value // Em site real, nunca salva senha pura, mas pra TP pode.
        };

        // Salvar no LocalStorage (simulando banco de dados)
        let usuarios = JSON.parse(localStorage.getItem('mediaVaultUsers')) || [];
        
        // Verifica se email já existe
        const existe = usuarios.find(u => u.email === novoUsuario.email);
        if(existe) {
            Swal.fire({
                icon: 'warning',
                title: 'Atenção',
                text: 'Este email já está cadastrado.',
                background: '#1e1e1e',
                color: '#fff'
            });
            return;
        }

        usuarios.push(novoUsuario);
        localStorage.setItem('mediaVaultUsers', JSON.stringify(usuarios));

        // Sucesso
        Swal.fire({
            icon: 'success',
            title: 'Cadastrado!',
            text: 'Conta criada com sucesso.',
            background: '#1e1e1e',
            color: '#fff',
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
            // Redirecionar (Pode ser para login.html ou index.html)
            window.location.href = 'index.html'; 
        });
    });
});