const c = (el)=> document.querySelector(el);
const cs = (el)=> document.querySelectorAll(el);
var modalQt = 1;
let cart = [];
let modalKey = 0;
// função de querySelector


//Lista as Pizzas
pizzaJson.map((item, index) => {
   // Preencher informações em PizzaItem   // Preencher informações em PizzaItem
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
    // Adiciona as pizzas no html
   c('.pizza-area').append( pizzaItem );
   //Colocar elementos no HTML
   pizzaItem.setAttribute('data-key', index);
   pizzaItem.querySelector('.pizza-item--img img').src = item.img;

   pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
   pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
   pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
  
  //Coloca informaç
   pizzaItem.querySelector('a').addEventListener('click', (e)=>{
    e.preventDefault();
    //pega o element E , e com target ele procura o mais perto com o nome pizza-item na classe
    let key =  e.target.closest('.pizza-item').getAttribute('data-key');
    modalKey = key;
    c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
    c('.pizzaBig img').src = pizzaJson[key].img;
    c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
    c('.pizzaInfo--size.selected').classList.remove('selected');
   
    cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
        
        if(sizeIndex == 2){
                size.classList.add('selected');
        };

        size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
    });


    c('.pizzaInfo--qt').innerHTML = modalQt;
  
    c('.pizzaWindowArea').style.opacity = 0;
    c('.pizzaWindowArea').style.display = 'flex';
    setTimeout(()=>{  c('.pizzaWindowArea').style.opacity = 1, 200})});
});

//eventos Modal

function closeModal(){
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
          c('.pizzaWindowArea').style.display = 'none', 500
        });

}

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{

    item.addEventListener('click', closeModal);
}) 
c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if (modalQt > 1 ){
    modalQt--;
    c('.pizzaInfo--qt').innerHTML = modalQt;
    }
});

c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;
});

cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
        
size.addEventListener('click', (e)=>{
    c('.pizzaInfo--size.selected').classList.remove('selected');
    size.classList.add('selected');
});
});

c('.pizzaInfo--addButton').addEventListener('click',() =>{ 

    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
    let identifier = pizzaJson[modalKey].id+'@'+size;
    
    let key = cart.findIndex((item)=>item.identifier == identifier ); 

    if (key != -1){
cart[key].qt += modalQt;
    }else{
        cart.push({
            identifier,
            id:pizzaJson[modalKey].id,
            size,
            qt:modalQt
        });
    }

   
   closeModal();
});