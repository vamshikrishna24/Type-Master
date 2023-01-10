const RANDOM_QUOTE_API_URL='https://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
let correct = true
const timerElement = document.getElementById('timer')
const bottom = document.getElementById('bottom')



quoteInputElement.addEventListener('input',()=>{
    const ArrayQuote = quoteDisplayElement.querySelectorAll('span')
    const Arrayvalue = quoteInputElement.value.split('')
    ArrayQuote.forEach((element,index)=>{
        const character = Arrayvalue[index]
        if(character == null)
        {
            element.classList.remove('incorrect')
            element.classList.remove('correct')
            correct = false
        }
        else if (character === element.innerText)
        {
            element.classList.add('correct')
            element.classList.remove('incorrect')
            correct = true
        }
        else{
            element.classList.add('incorrect')
            element.classList.remove('correct')
            correct = false
        }
    })
    const arr = quoteInputElement.value.split(' ')
    if(correct)
    {
        bottom.innerText = arr.length+" Words per "
        randomNewQuote()
    }
})

function getRandomQuote(){
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function randomNewQuote(){
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML =''
    quote.split('').forEach(element => {
        const characterspan = document.createElement('span')
        characterspan.innerText = element
        quoteDisplayElement.appendChild(characterspan)
    });
    quoteInputElement.value = null;
    startTimer()    
}
let start,end=0
function startTimer(){
    timerElement.innerText = 0
    start = new Date()
    setInterval(()=>{
        end = timerElement.innerText = Math.floor((new Date - start)/1000)
    })
    bottom.append(end+"s")
}



randomNewQuote()

