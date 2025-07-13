const apiKeyInput = document.getElementById('apiKey')
const gameSelect = document.getElementById('gameSelect')
const questionInput = document.getElementById('questionInput')
const askButton = document.getElementById('askButton')
const aiResponse = document.getElementById('aiResponse')
const form = document.getElementById('form')


const markdownToHTML = (text) => {
    const converter = new showdown.Converter()
    return converter.makeHtml(text)
}

const perguntarAI = async (question, game, apiKey) => {
//async: Sair da minha aplicação, ir para alguma aplicação em algum lugar do mundo, esperar uma resposta e receber aqui//
//Chave de API: cloud.google.com//
    const model = "gemini-2.0-flash"
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
    const pergunta = `
    ## Especialidade
    Você é um especialista assistente de meta para o jogo ${game}

    ## Tarefa
    Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, builds e dicas

    ## Regras
    - Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
    - Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo'
    - Considere a data atual ${new Date().toLocaleDateString()}
    - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
    - Nunca responda itens que você não tenha certeza de que existe no patch atual.

    ## Resposta
    - Economize na resposta, seja direto e responda no máximo 500 caracteres. 
    - Responda em markdown
    - Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

    ## Exemplo de resposta
    Pergunta do usuário: Melhor build rengar jungle
    Resposta: A build mais atual é: \n\n **Itens:**\n\n coloque os itens aqui \n\n**Runas**\n\nexemplo de runas\n\n

    ---
    Aqui está a pergunta do usuário ${question}
    `
    // \n: quebra de linha / 

    //DESAFIO: Usar a engenharia de prompt para os jogos valorant, cs:go e dota 2 utilizando o "const pergunta" e o if


    const contents = [{
        role: "user",
        parts: [{
            text: pergunta
        }]
    }]

    const tools = [{
        google_search: {}
    }
    ]

    //chamada API
    //Estou lançando algo e estou esperando uma resposta//
    const response = await fetch (geminiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents,
            tools
        })
    }) 

    const data = await response.json()
    return data.candidates[0].content.parts[0].text
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
        const text = await perguntarAI(question, game, apiKey)
        aiResponse.querySelector('.response-content').innerHTML = markdownToHTML(text)
        aiResponse.classList.remove('hidden')

    } catch(error) {
        console.log('Erro: ', error)
    } finally {
        askButton.disabled = false
        askButton.textContent = "Perguntar"
        askButton.classList.remove('loading')
    //Para fazer o botão voltar ao normal//
    }
    
}

form.addEventListener('submit', enviarFormulario)
