// Практическое задание

/* 
1. Привязать добавление товара в корзину к реальному API.
2. Добавить API для удаления товара из корзины.
 */

// Решение:

// Общий код:

'use strict';

const API_URL =
    'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('goods-list', {
    props: ['goods'],
    template: /*html*/ `
<div class="goods-list">
    <goods-item v-for="good in goods" :good="good"></goods-item>
</div>
    `
});

Vue.component('goods-item', {
    props: ['good'],
    template: /*html*/ `
<div class="goods-item">
    <h3>{{ good.product_name }}</h3>
<p>{{ good.price }}</p>
</div>
`
});

Vue.component('goods-search', {
    template: /*html*/ `
<div class="goods-search">
    <input type="text" class="goods-search" v-model="$parent.searchLine">
    <button class="search-button" type="button" @click="$parent.filterGoods">Искать</button>
</div>
`
});

Vue.component('goods-cart', {
    template: /*html*/ `
<div>
    <button class="cart-button" type="button" @click="$parent.isVisibleCartToggle">Корзина</button>
    <div class="cart" v-show="$parent.isVisibleCart">Cart is visible</div>
</div>
`
});

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        isVisibleCart: true,
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
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
        makePOSTRequest(url, data, callback) {
            let xhr;
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
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            xhr.send(data);
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
    },

    mounted() {
        this.makeGETRequest(`/catalogData`, (goods) => {
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);
        });
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

    addGoodToCart(good) {
        this.goods.push(good);
    }

    removeGoodFromCart(good) {
        this.goods.find(good).pop();
    }

    priceAllGoodsInCart() {

        let totalCost = 0;
        this.goods.forEach(good => {
            totalCost += good.price;
        })
        console.log(`Стоимость всех товаров в корзине = ${totalCost}.`);
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

const list = new GoodsList();

list.fetchGoods(() => {
    list.render();
    list.priceAllGoods();
});











