const apiKeyInput = document.getElementById('apiKey')
const gameSelect = document.getElementById('gameSelect')
const questionInput = document.getElementById('questionInput')
const askButton = document.getElementById('askButton')
const aiResponse = document.getElementById('aiResponse')
const form = document.getElementById('form')

const perguntarAI = async (question, game, apiKey) => {
//async: Sair da minha aplicação, ir para alguma aplicação em algum lugar do mundo, esperar uma resposta e receber aqui//
//Chave de API: AIzaSyBLvgLS5htNfO9Wbm_EOACYPlTnkw_RW-U//
    const model = "gemini-2.0-flash"
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent=${apiKey}`
    const pergunta = `
    
    `

    const contents = [{
        parts: [{
            text: pergunta
        }]
    }]

    //chamada API
    //Estou lançando algo e estou esperando uma resposta//
    const response = await fetch (geminiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents
        })
    }) 

    const data = await response.json()
    console.log ({data})
    return
}


const enviarFormulario = async (event) => {
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
    askButton.classList.add('loading')

    try {
    //Perguntar para a IA//
        await perguntarAI(question, game, apiKey)
    } catch(error) {
        console.log('Erro: ', error)
    } finally {
        askButton.disabled = false
        askButton.textContent = "Perguntar"
        askButton.classList.remove ('loading')
    //Para fazer o botão voltar ao normal//
    }
    
}

form.addEventListener('submit', enviarFormulario)
