'use strict';
const containerFor = document.querySelectorAll('.tabcontent'),
tabdata = document.querySelectorAll('.tabheader__item'),
parent = document.querySelector('.tabheader__items');

function hidetabs(){
containerFor.forEach(item => {
item.classList.add('hide');
item.classList.remove('show' , 'timur');

});

tabdata.forEach(item => {
item.classList.remove('tabheader__item_active')
});
}
function showtabs (t = 0){
containerFor[t].classList.add('show', 'timur');
containerFor[t].classList.remove('hide');
tabdata[t].classList.add('tabheader__item_active')

}


parent.addEventListener('click', (event) => {
const target = event.target;

if ( target && target.classList.contains('tabheader__item')){
tabdata.forEach((item,i) =>{
    if(target == item){
        hidetabs();
        showtabs(i);
    }
});
}
});

hidetabs();
showtabs();


//  timer

const deadline = '2023-01-01';

function getTimeRemaining (endtime){
const t = Date.parse(endtime) - Date.parse(new Date()),
    days = Math.floor(t / (1000 * 60 * 60 *24)),
    hours = Math.floor((t / (1000*60*60)%24)),
    minutes = Math.floor((t / (1000 * 60)%60)),
    seconds = Math.floor((t/1000)%60);
return{
'total': t,
'days' : days,
'hours' : hours,
'minutes': minutes,
'seconds' : seconds
};
}

function getZero(num){
if(num > 0 && num < 10){
return `0${num}`;
}else {
return num;
}
}

function setClock(selector,endtime){
const timer = document.querySelector(selector),
    days = timer.querySelector('#days'),
    hours = timer.querySelector('#hours'),
    minutes = timer.querySelector('#minutes'),
    seconds = timer.querySelector('#seconds'),
    timeInterval = setInterval(updateClock, 1000);
    updateClock();

function updateClock(){
const t = getTimeRemaining(endtime);

days.innerHTML = getZero(t.days);
hours.innerHTML = getZero(t.hours);
minutes.innerHTML = getZero(t.minutes);
seconds.innerHTML = getZero(t.seconds);

if (t.total <  0) {
    // clearInterval(timeInterval);
    document.querySelector('.timer').innerHTML = 'End of timer';
}
}
}
setClock('.timer' ,deadline);


//   modal

const modal = document.querySelectorAll('[data-modal]'),
modal__close = document.querySelector('[data-close]'),
mainModal = document.querySelector('.modal');


function openModal(){
mainModal.classList.add('show');
    mainModal.classList.remove('hide');
    document.body.classList.add('NotScroll');
    clearInterval(OpeningModal);
}

function closeModal(){
    mainModal.classList.add('hide');
    mainModal.classList.remove('show');
    document.body.classList.remove('NotScroll');
}
modal.forEach(btn =>{
btn.addEventListener('click', openModal);
});
mainModal.addEventListener(('click'), (e)=>{
if(e.target === mainModal){
    closeModal();
}
});

modal__close.addEventListener('click', closeModal);
//  open modal with setTimout
const OpeningModal = setTimeout(openModal, 500000);
function showModalByScroll(){
if(    window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
openModal();
window.removeEventListener('scroll', showModalByScroll)
}
}
window.addEventListener('scroll', showModalByScroll);

class MiniMenu{
constructor(src,alt,title,text,price, parentSel){
this.src = src;
this.alt = alt;
this.title = title;
this.text = text;
this.parent = document.querySelector(parentSel);
this.price = +price;
this.ChangeMoney();
}

ChangeMoney(){
Math.floor(this.price = this.price * 19.5);
}

render(){
const element = document.createElement('div');
element.innerHTML = `
<div class="menu__item">
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.text}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> TMT/день</div>
            </div>
        </div>
`;
this.parent.append(element);
}
}
new MiniMenu(
"img/tabs/vegy.jpg",
"vegy",
"Menu Vegy",
"Today We See Moe Than Card Vegy",
10,
'.menu .container'
).render();
new MiniMenu(
"img/tabs/post.jpg",
"Posy",
"Menu Post",
"Today We See Moe Than Card Post",
20,
'.menu .container'
).render();
new MiniMenu(
"img/tabs/elite.jpg",
"Elite",
"Menu Elite",
"Today We See Moe Than Card Elite",
50,
'.menu .container'
).render();

// forms
const forms = document.querySelectorAll('form');
forms.forEach(item =>{
data(item);
});

const message = {
load : 'ждите',
success : 'Отлично , мы перезвоним',
fail : 'повторите попытку позже'
};
function data(form){ 
form.addEventListener('submit' , (e)=>{
e.preventDefault();

const statusMessage = document.createElement('div');
statusMessage.textContent= message.load;
form.append(statusMessage);

const request = new XMLHttpRequest();
request.open('POST', 'server.php');
// request.setRequestHeader('Content-type', 'multipart/form-data');
const formDataPlus = new FormData(form);

request.send(formDataPlus);

request.addEventListener('load' , () =>{
    if(request.status === 200){
        console.log(request.response);
        statusMessage.textContent= message.success;
    }else{
        statusMessage.textContent= message.fail;
    }
});
});

}

const slider = document.querySelectorAll('.offer__slide'),
MainSlider = document.querySelector('.offer__slider'),
next = document.querySelector('.offer__slider-next'),
inner = document.querySelector('.offer__slider-inner'),
prev = document.querySelector('.offer__slider-prev'),
SlidesWrapper = document.querySelector('.offer__slider-wrapper'),
total = document.querySelector('#total'),
current = document.querySelector('#current'),
width = window.getComputedStyle(SlidesWrapper).width;
let count = 1,
offset = 0;

if(slider.length < 10){
total.textContent= `0${slider.length}`;
current.textContent = `0${count}`;
}
else{
total.textContent= slider.length;
current.textContent = count;
}

inner.style.width = 100 * slider.length + '%';
slider.forEach(slide =>{
slide.style.width = width;
});

MainSlider.style.position = 'relative';

const indicators = document.createElement('ol'),
dots = [];

indicators.classList.add('carousel');
MainSlider.append(indicators);

for( let i=0 ; i < slider.length; i++){
const dot = document.createElement('li');
dot.setAttribute('data-slide-to' , i + 1 );
dot.classList.add('dot');
if ( i == 0){
dot.style.opacity = 1;
}
indicators.append(dot);
dots.push(dot);
}

next.addEventListener('click', ()=>{
if (offset === +width.slice(0,width.length - 2) * (slider.length - 1)){
offset = 0;
}else{
offset += +width.slice(0,width.length - 2);
}
inner.style.transform = `translateX(-${offset}px)`;

if(count == slider.length){
count  = 1;
} else{
count++
}

CurrentTotal();

AboutDots();

});

prev.addEventListener('click', ()=>{
if (offset == 0){
offset = +width.slice(0,width.length - 2) * (slider.length - 1);
}else{
offset -= +width.slice(0,width.length - 2);
}
inner.style.transform = `translateX(-${offset}px)`;

if(count == 1){
count  = slider.length;
} else{
count--;
}

CurrentTotal();
AboutDots();
});

inner.style.display = 'flex';
inner.style.transition = '0.8s all';

SlidesWrapper.style.overflow = 'hidden';

dots.forEach(dot => {
dot.addEventListener('click', (e) => {
const slideTo = e.target.getAttribute('data-slide-to');

count = slideTo;
offset = +width.slice(0,width.length - 2) * (slideTo - 1);

inner.style.transform = `translateX(-${offset}px)`;

CurrentTotal();

AboutDots();
});
});


function CurrentTotal(){
if(slider.length < 10){
current.textContent = `0${count}`;
}
else{
current.textContent = count;
}
};
function AboutDots(){
dots.forEach(dot => {
dot.style.opacity = '.5';
dots[count - 1].style.opacity = 1;
});
}

// calcualte
const result = document.querySelector('.calculating__result span');

let pol,height,weight,age,ratio;

if(localStorage.getItem('pol')){
pol = localStorage.getItem('pol');
}else{
pol = 'female';
localStorage.setItem('pol' , 'female');
}

function initLocal(selector,ActiveClass){
const elements = document.querySelectorAll(selector);
elements.forEach(e =>{
e.classList.remove(ActiveClass);
if(e.getAttribute('id') === localStorage.getItem('pol')){
    e.classList.add(ActiveClass);
};
if(e.getAttribute('data-ratio') === localStorage.getItem('ratio')){
    e.classList.add(ActiveClass);
};
});

}
initLocal('#gender div','calculating__choose-item_active');
initLocal('.calculating__choose_big div' ,'calculating__choose-item_active');

if(localStorage.getItem('ratio')){
ratio = localStorage.getItem('ratio');
}else{
ratio = 1.375;
localStorage.setItem('ratio' , 1.375);
}
function calc(){
if(!pol || !age || !weight || !height || !ratio){
result.textContent = '____';
return
}
if(pol === 'female'){
result.textContent = Math.round((447.6 + (9.2 * weight) +(3.1*height)-(4.3*age)) * ratio);
}else{
result.textContent = Math.round((88.36 + (13.4 * weight) +(4.8*height)-(5.7*age)) * ratio);
}
};

calc();

function getStatc(selector,ActiveClass){
const element = document.querySelectorAll(selector);


element.forEach(elem =>{
elem.addEventListener('click', (e)=>{
    if(e.target.getAttribute('data-ratio')){
        ratio = +e.target.getAttribute('data-ratio');
        localStorage.setItem('ratio' , +e.target.getAttribute('data-ratio'));
    }else{
        pol = e.target.getAttribute('id');
        localStorage.setItem('pol' , e.target.getAttribute('id'));

    }
    // console.log(ratio, pol);

    element.forEach( elem => {
        elem.classList.remove(ActiveClass);
    });

    e.target.classList.add(ActiveClass);

    calc();
});
});
}
getStatc('#gender div','calculating__choose-item_active');
getStatc('.calculating__choose_big div' ,'calculating__choose-item_active');



function getDynamic(selector){
const input = document.querySelector(selector);

input.addEventListener('input',() =>{

if(input.value.match(/\D/g)){
    input.style.cssText = `
    border: 5px solid red;
    transition:0.2s all ;`
}else{
    input.style.border = 'none';

}

switch(input.getAttribute('id')){
    case 'height':
        height = +input.value;
        break;
    case 'weight':
        weight = +input.value;
        break;
    case 'age':
        age = +input.value;
        break;
}
calc();
});

}

getDynamic('#height');
getDynamic('#weight');
getDynamic('#age');







// showSlider(count);
// function showSlider(n){
//     if(n > slider.length){
//         count = 1
//     }
//     if (n < 1){
//         count = slider.length;
//     }

//     slider.forEach(item => item.style.display = 'none');
//     slider[count - 1].style.display = 'block';

//     if(slider.length < 10){
//         current.textContent= `0${count}`;
//     }
//     else{
//         current.textContent= count;
//     }

// }
// function plus(n){
// showSlider( count += n);
// }
// prev.addEventListener('click', ()=>{
//     plus(-1);
// });

// next.addEventListener('click', ()=>{
//     plus(1);
// });*