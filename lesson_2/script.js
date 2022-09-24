// Практическое задание

/* 
1. Добавьте пустые классы для Корзины товаров и Элемента корзины товаров. Продумайте,
какие методы понадобятся для работы с этими сущностями.
2. Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров
 */

// Решение:

// Общий код:

'use strict';

class GoodsItem {
    constructor(title = '', price = 0) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div
    class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }

    // 2) 
    // Добавил метод priceAllGoods(). После его вызываю.

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
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.priceAllGoods();


// 1)

const cartItem = new GoodsItem();

class CartList extends GoodsList { }

