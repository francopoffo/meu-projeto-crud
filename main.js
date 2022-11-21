const $meuFormulario = document.querySelector('#form');
const $listaTarefas = document.querySelector('#listaTarefas')
const tarefas = JSON.parse(localStorage.getItem("Tarefas")) || [];


const modelo = {
        tarefas: [
        {
            id: 1,
            owner: 'francopoffo',
            content: 'CTD'
        }
    ],
    criaTarefa(info, somenteHTML = false){
        
        if(!somenteHTML){
        tarefas.push(info);
        }
        $listaTarefas.insertAdjacentHTML('afterbegin', `
            <li data-id="${info.id}">
            <button class="botao__apagar">X</button>
            <span contenteditable>
            ${info.content}       
            </span>
            </li>
    
        `)
        
    },
    leTarefa(){
        modelo.tarefas.forEach(({id, owner, content}) => {
            modelo.criaTarefa({id, owner: owner, content: content}, true);
            
        })
        tarefas.forEach((tarefa) =>{
            modelo.criaTarefa(tarefa);
        })
    },
    apagaTarefa(id) {
        const listaDeTarefasAtualizada = modelo.tarefas.filter((tarefaAtual) => {
            return tarefaAtual.id !== Number(id);
        })
        modelo.tarefas = listaDeTarefasAtualizada;
        
    },
    atualizaTarefa(id, novoConteudo) {
        const tarefaAtualizada = modelo.tarefas.find((post) => {
            return post.id === Number(id);
        });
        tarefaAtualizada.content = novoConteudo
    }
    
    
}

// CREATE


$meuFormulario.addEventListener('submit', (e) =>{
    e.preventDefault();
    let $conteudoDaTarefa = document.querySelector('#inConteudo');

    idDoPost = Date.now();

    const novaTarefa = {
        id: idDoPost,
        owner: 'francopoffo',
        content: $conteudoDaTarefa.value
    }
    
    modelo.criaTarefa(novaTarefa);
    localStorage.setItem("Tarefas", JSON.stringify(tarefas))

    $meuFormulario.reset();
    $meuFormulario.inConteudo.focus();
})


//READ

modelo.leTarefa();

//UPDATE

$listaTarefas.addEventListener('input', function (dados) {
    
    const itemAtual = dados.target;
    const id = itemAtual.parentNode.getAttribute('data-id');

    modelo.atualizaTarefa(id, itemAtual.innerText)
});


//DELETE

$listaTarefas.addEventListener('click', function(dados) {
    const itemAtual = dados.target;
    const botaoApaga = dados.target.classList.contains('botao__apagar');

    if (botaoApaga) {
        
        const id = itemAtual.parentNode.getAttribute('data-id');


        // Manipula o lado do arquivo
        modelo.apagaTarefa(id);
        // Manipula o HTML
        itemAtual.parentNode.remove();
    }   
})