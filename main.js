const $meuFormulario = document.querySelector('#form');
const $listaPostagens = document.querySelector('#listaPostagens')
const modelo = {
    usuarios: [
        {
            username: 'francopoffo',
            username: 'foquinha',
        }
    ],
    postagens: [
        {
            id: Date.now(),
            owner: 'francopoffo',
            content: 'Meu primeiro post'
        }
    ]
}

function criaPostagem(info){
    idDoPost = Date.now();
    modelo.postagens.push({
        id: info.id || idDoPost,
        owner: info.owner,
        content: info.content
    })

    $listaPostagens.insertAdjacentHTML('afterbegin', `
        <li id="${idDoPost}">
        <span>
        ${info.content}       
        </span>
        </li>

    `)

}

$meuFormulario.addEventListener('submit', (e) =>{
    e.preventDefault();
    let $conteudoDaPostagem = document.querySelector('#inConteudo');
    
    criaPostagem({owner: 'francopoffo', content: $conteudoDaPostagem.value});

    $conteudoDaPostagem = '';
})