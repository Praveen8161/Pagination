//Creating Containers
let main = document.createElement("main");
main.setAttribute("class","container");
document.body.append(main);

let paginator = document.createElement("nav");
paginator.setAttribute("class","nav-bar");

let data_container = document.createElement("div");
data_container.setAttribute("class","datas");

main.append(paginator,data_container);

//Data Container
//Main data container HTML Elements
let siNo = document.createElement("div");
siNo.setAttribute("class","si-no data-style");
let uName = document.createElement("div");
uName.setAttribute("class","name data-style");
let email = document.createElement("div");
email.setAttribute("class","email data-style");

data_container.append(siNo,uName,email);

//data Title HTML Elemnets
let siNoTitle = document.createElement("span");
siNoTitle.setAttribute("class","title ");
siNoTitle.innerHTML = "SI.NO";

let uNameTitle = document.createElement("span");
uNameTitle.setAttribute("class","title");
uNameTitle.innerHTML = "Name";

let emailTitle = document.createElement("span");
emailTitle.setAttribute("class","title");
emailTitle.innerHTML = "Email";

//data display HTML Elements
let siNoData = document.createElement("span");
siNoData.setAttribute("class","data_content");
let uNameData = document.createElement("span");
uNameData.setAttribute("class","data_content");
let emailData = document.createElement("span");
emailData.setAttribute("class","data_content");

siNo.append(siNoTitle,siNoData);
uName.append(uNameTitle,uNameData);
email.append(emailTitle,emailData);

//Create and Append Buttons 
//First and Previous
let btnFirst = document.createElement("button");
let btnPre = document.createElement("button");

btnFirst.setAttribute("class", "btn-first btn--wid");
btnPre.setAttribute("class", "btn-pre btn--wid");

btnFirst.innerHTML = "First";
btnPre.innerHTML = "Previous";

paginator.append(btnFirst,btnPre);

//Middle 9 Buttons
for (var i=1; i<10; i++){
    let btn = document.createElement("button");
    i === 1 ? btn.setAttribute("class",`btn${i} pg-btn active`) :
    btn.setAttribute("class",`btn${i} pg-btn`);
    btn.innerHTML = i;
    paginator.appendChild(btn);
}

//Last and next
let btnNext = document.createElement("button");
let btnLast = document.createElement("button");

btnNext.setAttribute("class", "btn-next btn--wid");
btnLast.setAttribute("class", "btn-last btn--wid");

btnNext.innerHTML = "Next";
btnLast.innerHTML = "Last";

paginator.append(btnNext,btnLast);
//----------------------------------buttons Ended------------------------------------//

//Getting value from button
let btns = document.querySelectorAll("button");

let pg_btns = document.querySelectorAll(".pg-btn");


let main_val;

let act_btn = document.querySelector(".active");
let act_val = parseInt(act_btn.textContent);


//------------------Pagination-Nav-Bar-Start----------------------------
for(var b=0; b<btns.length; b++){

    btns[b].addEventListener("click",(e) => {

        //main value
        main_val = e.target.textContent;

        main_val = main_val == "First" ? 1 :
        main_val == "Last"  ? 100:
        main_val == "Previous" ? act_val-1 :
        main_val == "Next" ? act_val+1 : 
        parseInt(main_val);

        //removing class active
        for (var r=0; r<btns.length; r++){
            btns[r].classList.remove("active");
        }

        //setting the page numbers and active class using main_val
        let num = 9;
        let count;
        if(main_val+9 > 100){
            count = main_val;
            for(var j=8; j>=0; j--){
                pg_btns[j].innerHTML = count;
                count === main_val ? pg_btns[j].classList.add("active") : "";
                count--;
            }
        }else{
            count = main_val;
            for(var a=0; a<9; a++){
                pg_btns[a].innerHTML = count;
                count === main_val ? pg_btns[a].classList.add("active") : "";
                count++;
            }
        }
        getData(main_val);
        extraBtn();
        
    });
}

//the extraBtn refers to FIRST,LAST,NEXT and PREVIOUS buttons 
// when there is no next or previous page available
function extraBtn(){
    act_btn = document.querySelector(".active");
    act_val = parseInt(act_btn.textContent);
    if(act_val == "1"){
        btnFirst.style.display = "none";
        btnPre.style.display = "none";
    }else{
        btnFirst.style.display = "block";
        btnPre.style.display = "block";
    }
    
    if(act_val == "100"){
        btnNext.style.display = "none";
        btnLast.style.display = "none";
    }else{
        btnNext.style.display = "block";
        btnLast.style.display = "block";
    }
}

//to get a initial data and button manupilation
extraBtn();
getData(1);
//------------------------Pagination-Nav-Bar-Ended-------------------------

//GETTING DATA FROM JSON file
function getData(main_val){
    let xhr = new XMLHttpRequest();
    xhr.open("GET","https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json");
    xhr.send();

    xhr.onload = function(){
        const dataFile = JSON.parse(xhr.response);
        siNoData.innerHTML = dataFile[main_val-1].id;
        uNameData.innerHTML = dataFile[main_val-1].name;
        emailData.innerHTML = dataFile[main_val-1].email;
    }
}

