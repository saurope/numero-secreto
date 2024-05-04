let listaNumerosSorteadors = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female',{rate:1.2});
}

function exibirMensagensIniciais() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 100');
}

exibirMensagensIniciais();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou');
        let palavraTentativa = tentativas >1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Parabéns! Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(chute>numeroSecreto){
            exibirTextoNaTela('h1', 'Número secreto é menor que chute');
        } else {
        exibirTextoNaTela('h1', 'Número secreto é maior que chute');
        }
        tentativas++;
        limparCampo();
    }
    
}

function gerarNumeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
   let quantidadeDeElementosNaLista = listaNumerosSorteadors.length;

   if (quantidadeDeElementosNaLista == numeroLimite) {
        listaNumerosSorteadors = [];
    
   }
   if(listaNumerosSorteadors.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
   } else {
        listaNumerosSorteadors.push(numeroEscolhido);
        console.log(listaNumerosSorteadors);
        return numeroEscolhido;
   }
}

function limparCampo() {
    chute=document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagensIniciais();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}