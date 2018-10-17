document.addEventListener('DOMContentLoaded', function(){
    const URL = 'https://api.github.com/users';
    let listElements = document.getElementsByClassName('dropdown-item');
    let listValue = '';
    // getByAjax();
    
    // let currentState = document.querySelector('.dropdown-menu .active').innerHTML;
    (function(){
        for (let i = 0; i < listElements.length; i++) {
            listElements[i].addEventListener('click', function(){
                let current = document.getElementsByClassName("active");
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
                listValue = document.getElementById('navbarDropdownMenuLink').innerHTML = this.innerHTML;
                checkActiveState(listValue);
                
            })
        };
        function checkActiveState(value){
            
            switch(value){
            case 'Ajax':
                // html = '';
                return getByAjax();
                break;
            case 'JQuery':
                // html = '';
                return getByJQuery();
                break;
            case 'Fetch':
                return getByFetch();
                break;
            case 'Axios':
                return getByAxios();
                break;
                default:
                    getByAjax();
                
            }
        }  
        
    })();
    
    
    function getByAjax () {
        document.querySelector('.list-container .row').innerHTML = '';
        let html = '';
        let request = new XMLHttpRequest();
        request.open("GET", URL, true);
        request.send();
        request.onload=function () {
            let jsonResponse = JSON.parse(request.responseText);
            for(let i = 0; i<3; i++){
                let adminStatus = jsonResponse[i].site_admin ? "Yes" : "No";
                html += `
                
                <div class="user d-flex">
                    <div class="user-logo">
                        <img class="user_image" src="${jsonResponse[i].avatar_url}" alt="Image of ${jsonResponse[i].login}">
                    </div>
                    <div class="user-info">
                        <h2 class="user-name">${jsonResponse[i].login}</h2>
                        <p class="admin-value"><strong>Site Administrator:</strong> ${adminStatus}!</p>
                    </div>
                </div>
                <div class="user_hyperlink">
                    <a class="btn btn-primary" href="${jsonResponse[i].html_url}">Profile</a>
                </div>`;
                // let userList = '';
                
            }
            document.querySelector('.list-container .row').innerHTML=html;
            
        }
    };
    function getByJQuery(){
        let html = '';
        $( ".list-container .row" ).html('');
        $.ajax({
            url: URL,
            type: "GET",
            success: function (result) {
                for(let i = 4; i<9; i++){
                    let adminStatus = result[i].site_admin ? "Yes" : "No";
                    html += `
                    <div class="list-container container">
                    <div class="row justify-content-between">
                    <div class="user d-flex">
                    <div class="user-logo">
                    <img class="user_image" src="${result[i].avatar_url}" alt="Image of ${result[i].login}">
                    </div>
                    <div class="user-info">
                    <h2 class="user-name">${result[i].login}</h2>
                    <p class="admin-value"><strong>Site Administrator:</strong> ${adminStatus}!</p>
                    </div>
                    </div>
                    <div class="user_hyperlink">
                    <a class="btn btn-primary" href="${result[i].html_url}">Profile</a>
                    </div>
                    </div>
                    </div>`;
                    // let userList = '';
                    
                }
                $( ".list-container .row" ).append(html);
            },
            error: function (error) {
                console.log(`Error${error}`);
            }
        });
        
        // $.get(URL, function(data, status){
        //     console.log(`${data[0].stringify()}`);
        // });
        
        
        // $.getJSON(URL, function (result) {
        //     console.log(result);
        // }
    };  
    async function getByFetch(){
        let html = '';
        document.querySelector('.list-container .row').innerHTML = '';
        await fetch(URL)
        .then(data=>{return data.json()})
        .then(res=>{
            for(let i = 8; i<13; i++){
                let adminStatus = res[i].site_admin ? "Yes" : "No";
                html += `
                <div class="list-container container">
                <div class="row justify-content-between">
                <div class="user d-flex">
                <div class="user-logo">
                <img class="user_image" src="${res[i].avatar_url}" alt="Image of ${res[i].login}">
                </div>
                <div class="user-info">
                <h2 class="user-name">${res[i].login}</h2>
                <p class="admin-value"><strong>Site Administrator:</strong> ${adminStatus}!</p>
                </div>
                </div>
                <div class="user_hyperlink">
                <a class="btn btn-primary" href="${res[i].html_url}">Profile</a>
                </div>
                </div>
                </div>`;
                // let userList = '';
                
            }
            document.querySelector('.list-container .row').innerHTML=html;
            
        })
    }
    function getByAxios(){
        let html = '';
        document.querySelector('.list-container .row').innerHTML = '';
        axios.get(URL)
        // .then(data=>console.log(data.data))
        .then(data=>{for(let i = 21; i<27; i++){
            let adminStatus = data.data[i].site_admin ? "Yes" : "No";
            html += `
            <div class="list-container container">
            <div class="row justify-content-between">
            <div class="user d-flex">
            <div class="user-logo">
            <img class="user_image" src="${data.data[i].avatar_url}" alt="Image of ${data.data[i].login}">
            </div>
            <div class="user-info">
            <h2 class="user-name">${data.data[i].login}</h2>
            <p class="admin-value"><strong>Site Administrator:</strong> ${adminStatus}!</p>
            </div>
            </div>
            <div class="user_hyperlink">
            <a class="btn btn-primary" href="${data.data[i].html_url}">Profile</a>
            </div>
            </div>
            </div>`;
            // let userList = '';
            
        }
        document.querySelector('.list-container .row').innerHTML+=html;
        
    })
    .catch(err=>console.log(err))
    }
    getByAjax();
});