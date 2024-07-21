const Product = require("../../models/product.model");

const filterStatusHelper = require("../../helpers/filterStatus");

const searchHelper = require('../../helpers/search');

// [GET] /admin/products
module.exports.index = async (req, res) => {
    // bộ lọc
    const filterStatus = filterStatusHelper(req.query);

    let find = {
        deleted: false,
    };
    if (req.query.status) {
        find.status = req.query.status;
    }

    //tìm kiếm
    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex){
        find.title = objectSearch.regex
    }
    // let keyword = "";
    // if (req.query.keyword) {
    //     keyword = req.query.keyword;
    //     const regex = new RegExp(keyword, "i");
    //     find.title = regex;
    // }

    const products = await Product.find(find);

    res.render("admin/pages/products/index.pug", {
        titlePage: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
    });
};
