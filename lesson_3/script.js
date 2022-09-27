// Практическое задание

/* 
1. Переделайте makeGETRequest() так, чтобы она использовала промисы.
2. Добавьте в соответствующие классы методы добавления товара в корзину, удаления товара из
корзины и получения списка товаров корзины.
 */

// Решение:

// Общий код:

'use strict';

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

// 1) Переделал функцию так makeGETRequest(), чтобы она использовала промисы:
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
    }

    fetchGoods(cb) {
        makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {

            this.goods = JSON.parse(goods);
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

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}

const list = new GoodsList();

list.fetchGoods(() => {
    list.render();
    list.priceAllGoods();
});

const cartItem = new GoodsItem();

// 2) Добавил метод добавления товаров в корзину, удаления товара из
// корзины и получения списка товаров корзины:

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







