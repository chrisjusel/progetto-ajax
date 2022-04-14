const old = `http://api.mediastack.com/v1/news
    ?access_key=55afcfcd43bae1f328356d967b5916b8
    &countries=us,gb,de`


let apiKey = "?access_key=55afcfcd43bae1f328356d967b5916b8";
let lingua = "&languages=it";
let sortBy = "&sort=popularity";
let richiesta = "http://api.mediastack.com/v1/news"+apiKey+lingua+sortBy;

let notizie = [];

document.addEventListener('DOMContentLoaded', function(){
    let container = document.getElementById('ultimeNotizie');
    console.log(container);



    populateUltimeNotizie(container);
})

function populateUltimeNotizie(container){
    let $News = fetch(richiesta).then(response => response.json());
    $News.then(response => {
        notizie = response.data
        for(let i=0; i<notizie.length; i++){

            let data = new Date(Date.parse(notizie[i].published_at));
            let formattedData = new Intl.DateTimeFormat('it-IT', { dateStyle: 'full', timeStyle: 'short' }).format(data);

            let notizia = document.createElement('div');
            notizia.innerHTML =         
            `
            <div class="d-flex justify-content-between notizia">
                <h6>${formattedData}</h6>
                <h6>Categoria: ${notizie[i].category}</h6>
            </div>
            <h4>${notizie[i].title}</h4>
            <p>${notizie[i].description}</p>
            `
            container.appendChild(notizia);
            
        }
    })
}

