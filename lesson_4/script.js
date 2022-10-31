// Практическое задание

/* 
1. Дан большой текст, в котором для оформления прямой речи используются одинарные
кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.
2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на
двойную.
 */

// Решение:

'use strict';


// 1) 

const str = `
One: 'Hi Mary.'
Two: 'Oh, hi.'
One: 'How are you doing?'
Two: 'I'm doing alright.How about you ?'
One: 'Not too bad. The weather is great isn't it ?'
Two: 'Yes. It's absolutely beautiful today.'
One: 'I wish it was like this more frequently.'
Two: 'Me too.'
One: 'So where are you going now?'
Two: 'I'm going to meet a friend of mine at the department store.'
One: 'Going to do a little shopping?'
Two: 'Yeah, I have to buy some presents for my parents.'
One: 'What's the occasion ? '
Two: 'It's their anniversary.'
One: 'That's great.Well, you better get going.You don't want to be late.'
Two: 'I'll see you next time.'
One: 'Sure. Bye.'
`;

const regexp = /'/g;
const replacedStr = str.replace(regexp, '"')
console.log(replacedStr);


// 2)

const regexp2 = /\b"/g;
const replacedStr2 = replacedStr.replace(regexp2, "'")
console.log(replacedStr2);


// Общий код:

class GoodsItem {
    constructor(product_name = '', price = 0) {
        this.product_name = product_name;
        this.price = price;
    }
    render() {
        return `<div
        class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
    }
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url) {
    return new Promise((resolve) => {
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                resolve(xhr.responseText);
            }
        }
        xhr.open('GET', url, true);
        xhr.send();
    })
}

class GoodsList {
    constructor() {
        this.goods = [];
        this.filteredGoods = [];
    }

    fetchGoods(cb) {
        makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);
            cb();
        })
    }

    priceAllGoods() {

        let totalCost = 0;
        this.goods.forEach(good => {
            totalCost += good.price;
        })
        console.log(`Стоимость всех товаров = ${totalCost}.`);
    }

    filterGoods(value) {
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(good =>
            regexp.test(good.product_name));
        this.render();

    }

    render() {
        let listHtml = '';
        this.filteredGoods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}

const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.goods-search');

const list = new GoodsList();

list.fetchGoods(() => {
    list.render();
    list.priceAllGoods();
});

searchButton.addEventListener('click', (e) => {
    const value = searchInput.value;
    list.filterGoods(value);
});


const cartItem = new GoodsItem();

class CartList {

    constructor() {
        this.goods = [
        ];
    }

    addGoodToCart(good) {
        this.goods.push(good);
    }

    removeGoodFromCart(good) {
        this.goods.find(good).pop();
    }

    renderGoodToCart() {
        {
            let listHtml = '';
            this.goods.forEach(good => {
                const goodItem = new GoodsItem(good.product_name, good.price);
                listHtml += goodItem.render();
            });
            document.querySelector('.goods-list').innerHTML = listHtml;
        }
    }

    priceAllGoodsInCart() {

        let totalCost = 0;
        this.goods.forEach(good => {
            totalCost += good.price;
        })
        console.log(`Стоимость всех товаров в корзине = ${totalCost}.`);
    }
}

const listOfCart = new CartList();

cartItem.render();
listOfCart.renderGoodToCart();
listOfCart.priceAllGoodsInCart();










