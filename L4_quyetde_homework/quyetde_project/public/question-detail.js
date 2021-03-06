window.onload = () => {

    const pathName = window.location.pathname;
    const pathNameParts = pathName.split('/');
    const questionId = pathNameParts[pathNameParts.length - 1];

    //UI
    const UIquestionContent = document.querySelector('.question-content');
    const UIvoteNumber = document.querySelector('.vote-number');
    const UIdislike = document.querySelector('.dislike');
    const UIlike = document.querySelector('.like');




    fetch(`/get-question-by-id?questionId=${questionId}`, {
        method: 'GET',
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then((response) => {        
        return response.json(); 
    })
    .then((data) => {        
        //console.log(data);
        const questionContent = data.questionContent;
        console.log(questionContent);
        if (UIquestionContent) {
            UIquestionContent.innerHTML = questionContent.content;
        }
        if (UIvoteNumber) {
            UIvoteNumber.innerHTML = questionContent.like + questionContent.dislike;
        }
        if (UIdislike && UIlike) {
            if (questionContent.like == 0 && questionContent.dislike == 0) {
                UIdislike.innerHTML = '50%';
                UIlike.innerHTML = '50%';
            }else{
                UIdislike.innerHTML = questionContent.dislike/(questionContent.dislike+questionContent.like) * 100 + '%';
                UIdislike.style.width = questionContent.dislike/(questionContent.dislike+questionContent.like)*100 + '%';
                UIlike.innerHTML = questionContent.like/(questionContent.dislike+questionContent.like) * 100 + '%';
                UIlike.style.width = questionContent.like/(questionContent.dislike+questionContent.like)*100 + '%';
            }
        }
    })
    .catch((error) => {
        console.log(error);
        window.alert(error.message);
    })

    const UIbtn = document.getElementById('btn');
    if (UIbtn) {
        UIbtn.addEventListener('click', () => {
           //console.log('add event');
            window.location.href = '/';

        })
    }

}

