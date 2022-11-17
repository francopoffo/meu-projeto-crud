const $meuFormulario = document.querySelector('#form');
const $listaPostagens = document.querySelector('#listaPostagens')
const modelo = {
        postagens: [
        {
            id: Date.now(),
            owner: 'francopoffo',
            content: 'CTD'
        }
    ],
    criaTarefa(info, somenteHTML = false){
        idDoPost = Date.now();
        if(!somenteHTML){
        modelo.postagens.push({
            id: info.id || idDoPost,
            owner: info.owner,
            content: info.content
        })
        }
        $listaPostagens.insertAdjacentHTML('afterbegin', `
            <li data-id="${idDoPost}">
            <button class="botao__apagar">X</button>
            <span contenteditable>
            ${info.content}       
            </span>
            </li>
    
        `)
    },
    leTarefa(){
        modelo.postagens.forEach(({id, owner, content}) => {
            modelo.criaTarefa({id, owner: owner, content: content}, true);
        })
    },
    apagaTarefa(id) {
        const listaDeTarefasAtualizada = modelo.postagens.filter((tarefaAtual) => {
            return tarefaAtual.id !== Number(id);
        })
        modelo.postagens = listaDeTarefasAtualizada;
    },
    atualizaTarefa(id, novoConteudo) {
        const tarefaAtualizada = modelo.postagens.find((post) => {
            return post.id === Number(id);
        });
        tarefaAtualizada.content = novoConteudo
    }
    
    
}

// CREATE

$meuFormulario.addEventListener('submit', (e) =>{
    e.preventDefault();
    let $conteudoDaPostagem = document.querySelector('#inConteudo');
    
    modelo.criaTarefa({owner: 'francopoffo', content: $conteudoDaPostagem.value});

    $conteudoDaPostagem = '';
})


//READ

modelo.leTarefa();

//UPDATE

$listaPostagens.addEventListener('input', function (dados) {
    
    const itemAtual = dados.target;
    const id = itemAtual.parentNode.getAttribute('data-id');

    modelo.atualizaTarefa(id, itemAtual.innerText)
});


//DELETE

$listaPostagens.addEventListener('click', function(dados) {
    const itemAtual = dados.target;
    const botaoApaga = dados.target.classList.contains('botao__apagar');

    if (botaoApaga) {
        
        const id = itemAtual.parentNode.getAttribute('data-id');


        // Manipula o lado do arquivo
        modelo.apagaTarefa(id);
        // Manipula o HTML
        itemAtual.parentNode.remove();

}
}
)