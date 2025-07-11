const apiKeyInput = document.getElementById('apiKey')
const gameSelect = document.getElementById('gameSelect')
const questionInput = document.getElementById('questionInput')
const askButton = document.getElementById('askbutton')
const aiResponse = document.getElementById('aiResponse')
const form = document.getElementById('form')

const enviarFormulario = (event) => {
    event.preventDefault() //faz com que a página deixe de fazer o padrão, que é submeter o formulário, dar reload na página//
    const apiKey = apiKeyInput.value 
    const game = gameSelect.value
    const question = questionInput.value

    console.log ({apiKey, game, question})

    if(apiKey == '' || game == '' || question == '') {
        alert('Por favor, preencha todos os campos')
        return
    }

    askButton.disabled = true
    askButton.textContent = 'Perguntando...'
}

form.addEventListener('submit', enviarFormulario)
