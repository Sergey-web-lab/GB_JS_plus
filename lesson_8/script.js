// Практическое задание

/* 
1. Вынести компоненты интернет-магазина в отдельные модули и настроить сборку.
2. Найти в официальной документации способ автоматически перезапускать webpack при
изменении файла. Изменить скрипт build, добавив туда этот способ. Подсказка: при запуске
нужно использовать определённый флаг
 */

// Решение:

// 1. Вынес компоненты интернет-магазина в отдельные модули и настроил сборку.
// 2. Нашёл в официальной документации способ автоматически перезапускать webpack при
// изменении файла. Изменил файл webpack.config.js, добавив туда этот способ.


// Общий код:

'use strict';

import module from './vue_module';
const vueModule = module.app;

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
















