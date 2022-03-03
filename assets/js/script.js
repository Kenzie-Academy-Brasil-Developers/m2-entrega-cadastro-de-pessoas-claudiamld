

class Pessoa{
    constructor(nome, sobrenome, dataNascimento, email, contato, telefone, cargo){
        this._nome = nome
        this._sobrenome = sobrenome
        this._dataNascimento = dataNascimento
        this._email = email
        this._contato = contato
        this._telefone = telefone
        this._cargo = cargo
    }
    static renderizarUsuario(){
        const totalAlunos = document.querySelector('#lista-de-alunos')
        const novoUsuario = document.createElement('li')

        const nome = document.createElement('span')
        nome.innerText = `${this._nome} ${this._sobrenome}`
        const email = document.createElement('span')
        email.innerText = this._email
        const cargo = document.createElement('span')
        cargo.innerText = this._cargo

        novoUsuario.appendChild(nome)
        novoUsuario.appendChild(email)
        novoUsuario.appendChild(cargo)

        totalAlunos.appendChild(novoUsuario)
    }
}

const cadastrados = []

const alunos = []
const facilitadores = []
const instrutores = []

const total = document.querySelector('#total-alunos')
total.innerText = cadastrados.length


function cadastrarPessoa(event){
    event.preventDefault()
    const array = event.target.querySelectorAll('input')
    const cargo = event.target.querySelector('select').value
    
    let info = [] 
    array.forEach((elem) => {
        info.push(elem.value)
    })
    
    const [nome, sobrenome, dataNascimento, email, contato, telefone] = info
    let usuario = new Pessoa(nome, sobrenome, dataNascimento, email, contato, telefone, cargo)

    validateEmail(usuario, email)
    total.innerText = cadastrados.length
} 

const form = document.querySelector('form')
form.addEventListener('submit', cadastrarPessoa)

function validateEmail(usuario, email){
    let validation = cadastrados.some(elem => elem._email === usuario._email)
    
    if(!validation){
        cadastrados.push(usuario)
        Pessoa.renderizarUsuario.call(usuario)
        if(usuario._cargo === 'Aluno'){
            alunos.push(usuario)
        }
        if(usuario._cargo === 'Facilitador'){
            facilitadores.push(usuario)
        }
        if(usuario._cargo === 'Instrutor'){
            instrutores.push(usuario)
        }
    } else {
        alert("Esse email já está cadastrado! Tente novamente")
    }
}

function filtrarPorCargo(cargoFiltrado){
    const listaAlunos = document.querySelector('#lista-de-alunos')

    if(cargoFiltrado.value === 'Todos'){
        listaAlunos.innerHTML = ""
        cadastrados.forEach((usuario) => {
            Pessoa.renderizarUsuario.call(usuario)
        })
    }
    if(cargoFiltrado.value === 'Aluno'){
        listaAlunos.innerHTML = ""
        alunos.forEach((usuario) => {
            Pessoa.renderizarUsuario.call(usuario)
        })
    }
    if(cargoFiltrado.value === 'Facilitador'){
        listaAlunos.innerHTML = ""
        facilitadores.forEach((usuario) => {
            Pessoa.renderizarUsuario.call(usuario)
        })
    }
    if(cargoFiltrado.value === 'Instrutor'){
        listaAlunos.innerHTML = ""
        instrutores.forEach((usuario) => {
            Pessoa.renderizarUsuario.call(usuario)
        })
    }
}

const valorPesquisa = document.querySelector('#cargoOption')
const btnPesquisar = document.querySelector('#btn')
btnPesquisar.addEventListener('click', function(){
        filtrarPorCargo(valorPesquisa)
    } 
)
