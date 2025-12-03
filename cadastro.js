document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formCadastro");
    
    // Elementos da Senha (para o botão de ver senha)
    const btnVerSenha = document.getElementById("btnVerSenhaCadastro");
    const inputSenha = document.getElementById("senhaCadastro");

    //Lógica do Botão "Ver Senha" (O Olhinho)
    if(btnVerSenha && inputSenha) {
        btnVerSenha.addEventListener("click", () => {
            // Verifica se é 'password' ou 'text' e troca
            const tipoAtual = inputSenha.getAttribute("type");
            const novoTipo = tipoAtual === "password" ? "text" : "password";
            inputSenha.setAttribute("type", novoTipo);
            
            // Troca o ícone (Olho aberto / Olho fechado)
            const icone = btnVerSenha.querySelector("i");
            icone.classList.toggle("fa-eye");
            icone.classList.toggle("fa-eye-slash");
        });
    }

    //Lógica de Salvar o Cadastro
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nome = document.getElementById("nomeCadastro").value;
        const email = document.getElementById("emailCadastro").value;
        const senha = document.getElementById("senhaCadastro").value;
        const confirma = document.getElementById("confirmaSenhaCadastro").value;

        
        if (senha !== confirma) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'As senhas não coincidem!',
                background: '#1f1f1f',
                color: '#fff'
            });
            return;
        }

        
        if (senha.length < 6) {
            Swal.fire({
                icon: 'warning',
                title: 'Senha Fraca',
                text: 'A senha deve ter pelo menos 6 caracteres.',
                background: '#1f1f1f',
                color: '#fff'
            });
            return;
        }

        // Cria o objeto do usuário
        const novoUsuario = {
            nome: nome,
            email: email,
            senha: senha
        };

        // Salva no LocalStorage (Substitui o anterior para simplificar o trabalho)
        localStorage.setItem('usuarioCadastrado', JSON.stringify(novoUsuario));

        // Sucesso!
        Swal.fire({
            icon: 'success',
            title: 'Conta Criada!',
            text: 'Você será redirecionado para o login.',
            background: '#1f1f1f',
            color: '#fff',
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
            window.location.href = 'login.html';
        });
    });
});