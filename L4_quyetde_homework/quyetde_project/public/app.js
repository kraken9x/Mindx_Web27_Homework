window.onload = () => {

    const mainForm = document.querySelector('.main-form');
    const textArea = document.querySelector('#ask-question');
    if (textArea) {
        console.log(textArea);
        textArea.addEventListener('input', (e) => {
            const letter = document.querySelector('.letter');
            if (letter && textArea.value.length <= 200) {
                letter.innerHTML = 200 - textArea.value.length;
            }
        })
    }

    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const textAreaValue = document.querySelector('.question-content').value;


            fetch('/create-question', {
                method: 'POST', // hoặc 'PUSH'
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    questionContent : textAreaValue,
                }),
                
            })
                .then((response) => {
                   
                    return response.json(); 
                })
                .then((data) => {
                    
                    const id = data.data.id;
                    window.location.href = `/questions/${id}`;
                })
                .catch((error) => {
                    
                    console.log(error);
                    window.alert(error.message);
                })
        })
    }
}


