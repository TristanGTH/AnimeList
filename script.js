document.getElementById('btn').addEventListener("click", function () {
    let query = document.getElementById('select').value
    let searched = document.getElementById('search').value
    let display = document.getElementById('container')
    display.innerHTML = ""


    if(searched.length >= 3){
        fetch(`https://api.jikan.moe/v3/search/${query}?q=${searched}&page=1`).then((response)=>{
            response.json().then((datas)=>{
                console.log(datas.results)
                let head
                let content
                let type
                let moreInfo

                if(datas.results.length !== 0){
                    for (let i = 0 ; i < datas.results.length; i++){

                        if (query == 'manga'){
                            head = 'title'
                            content = 'synopsis'
                            type = 'volumes'
                            moreInfo =   `<p>${datas.results[i][content]}</p>\n`+`<p>${datas.results[i][type]} ${type}</p>`
                        }
                        else if(query == 'anime'){
                            head = 'title'
                            content = 'synopsis'
                            type = 'episodes'
                            moreInfo =   `<p>${datas.results[i][content]}</p>\n`+`<p>${datas.results[i][type]} ${type}</p>`
                        }
                        else if(query == 'people'){
                            head = 'name'
                            moreInfo = ""
                        }
                        else if(query == 'character'){
                            head = 'name'
                            content = 'alternative_names'
                            moreInfo = `<p>${datas.results[i][content]}</p>`
                        }

                        display.insertAdjacentHTML("beforeend", `
                         <article class="infoArticle">
                            <img src="${datas.results[i].image_url}">
                            <h1><a href="${datas.results[i].url}">${datas.results[i][head]}</a></h1>
                            ${moreInfo}
                        </article>`)


                    }
                }

                else {
                    function presentAlert() {
                        const alert = document.createElement('ion-alert');
                        alert.cssClass = 'my-custom-class';
                        alert.header = 'Erreur';
                        alert.subHeader = 'API';
                        alert.message = 'Pas de resultat trouvé';
                        alert.buttons = ['OK'];

                        document.body.appendChild(alert);
                        return alert.present();
                    }
                    presentAlert()
                }

            })
        })
    }
    else{
        function presentAlert() {
            const alert = document.createElement('ion-alert');
            alert.cssClass = 'my-custom-class';
            alert.header = 'Erreur';
            alert.subHeader = 'Barre de recherche';
            alert.message = 'Veuillez rentrer minimum 3 caratères';
            alert.buttons = ['OK'];

            document.body.appendChild(alert);
            return alert.present();
        }
        presentAlert()
    }


})
