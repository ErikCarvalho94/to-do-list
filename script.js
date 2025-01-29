const listaTarefas = document.getElementById('lista-tarefas')
const tarefas = []

function atualizarGrafico() {
    const total = tarefas.length
    const completas = tarefas.filter(tarefa =>tarefa.completa).length
    const progresso = total ? (completas / total) * 100 : 0

    graficoProgresso.data.datasets[0].data = [progresso, 100 - progresso]
    graficoProgresso.update()
}

function adicionarTarefa() {
    const titulo = document.getElementById('titulo').value
    const sutitulo = document.getElementById('subtitulo').value

    if(!titulo){
        alert("Por favor, insira um título para a tarefa.")
        return
    }

    const tarefa= {
        id: Date.now,
        titulo,
        subtitulo,
        completa: false
    }

    tarefas.push(tarefa)
    renderizarTarefas()
    atualizarGrafico()

    document.getElementById('titulo').value = ''
    document.getElementById('subtitulo').value = ''
}

function renderizarTarefas() {
    listaTarefas.innerHTML = ''

    tarefas.forEach(tarefa => {
        const li = document.createElement('li')
        li.className = 'list-group-item d-flex justify-content-between align-items-center'

        const conteudo = document.createElement('div')
        conteudo.innerHTML = `<strong>${tarefa.titulo}</strong><br><small>${tarefa.subtitulo}`

        const botoes = document.createElement('div')
        botoes.className = 'btn-group'

        const btnCompletar = document.createElement('button')
        btnCompletar.className = 'btn btn-success btn-sm'
        btnCompletar.textContent = tarefa.completa ? 'Reabrir' : 'Completar'
        btnCompletar.onclick = () => {
            tarefa.completa = !tarefa.completa
            renderizarTarefas()
            atualizarGrafico()
        }
    })
}