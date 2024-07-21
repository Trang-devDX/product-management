const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    try {
        // Bộ lọc
        const filterStatus = filterStatusHelper(req.query);

        let find = {
            deleted: false,
        };
        if (req.query.status && req.query.status.trim() !== '') {
            find.status = req.query.status;
        }
        // end bộ lọc

        // Tìm kiếm
        const objectSearch = searchHelper(req.query);
        if (objectSearch.regex) {
            find.title = objectSearch.regex;
        }
        // end tìm kiếm

        // Phân trang
        const countProducts = await Product.countDocuments(find);  // Sử dụng countDocuments thay vì countx`
        let objectPagination = paginationHelper(
            {
            limitItems: 4,
            currentPage: 1,
            },
            req.query,
            countProducts
        );
        // end phân trang
        

        const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);

        res.render("admin/pages/products/index.pug", {
            titlePage: "Danh sách sản phẩm",
            products: products,
            filterStatus: filterStatus,
            keyword: objectSearch.keyword,
            pagination: objectPagination
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
    }
};
