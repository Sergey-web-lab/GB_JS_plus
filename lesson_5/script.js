// Практическое задание

/* 
Все пункты выполняются с использованием Vue.js.

1. Добавить методы и обработчики событий для поля поиска. Создать в объекте данных поле
searchLine и привязать к нему содержимое поля ввода. На кнопку Искать добавить
обработчик клика, вызывающий метод FilterGoods.

2. Добавить корзину. В html-шаблон добавить разметку корзины. Добавить в объект данных поле
isVisibleCart, управляющее видимостью корзины.
 */

// Решение:


// 1) Создал в объекте данных поле
// searchLine и привязал к нему содержимое поля ввода. На кнопку Искать добавил
// обработчик клика, вызывающий метод FilterGoods.

// 2) Добавил разметку корзины в вёрстку, Добавил в объект данных поле isVisibleCart, метод isVisibleCartToggle(),
//  обработчик события на кнопку "Корзина", вызывающий метод isVisibleCartToggle(). Сам этот метод переключает состояне видимости 
// разметки корзины, меняя свойство поля данных isVisibleCart.


// Общий код:

'use strict';


const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        isVisibleCart: true
    },
    methods: {
        isVisibleCartToggle() {
            if (this.isVisibleCart == false) {
                this.isVisibleCart = true;
            }
            else if (this.isVisibleCart == true) {
                this.isVisibleCart = false;
            }
        },
        makeGETRequest(url, callback) {
            const API_URL =
                'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
            var xhr;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    callback(xhr.responseText);
                }
            }
            xhr.open('GET', url, true);
            xhr.send();
        },
        mounted() {
            this.makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
                this.goods = goods;
                this.filteredGoods = goods;
            });
        },
        fetchGoods() {
            makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
                this.goods = JSON.parse(goods);
                this.filteredGoods = JSON.parse(goods);
            })
        },

        priceAllGoods() {

            let totalCost = 0;
            this.goods.forEach(good => {
                totalCost += good.price;
            })
            console.log(`Стоимость всех товаров = ${totalCost}.`);
        },

        filterGoods(value) {
            const regexp = new RegExp(value, 'i');
            this.filteredGoods = this.goods.filter(good =>
                regexp.test(good.product_name));
            this.render();

        },

        render() {
            let listHtml = '';
            this.filteredGoods.forEach(good => {
                const goodItem = new GoodsItem(good.product_name, good.price);
                listHtml += goodItem.render();
            });
            document.querySelector('.goods-list').innerHTML = listHtml;
        },
    }
});


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










