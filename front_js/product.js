class Product {
    constructor(id, name, description, price, option, quantity, imgurl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.option = option;
        this.quantity = +quantity;
        this.imgurl = imgurl;
    }
}