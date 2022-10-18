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

export default {
    app: app
};
