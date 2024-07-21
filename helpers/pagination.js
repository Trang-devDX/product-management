module.exports = (objectPagination, query, countProducts) => {
    if (query.page) {
        const page = parseInt(query.page);
        if (!isNaN(page) && page > 0) {
            objectPagination.currentPage = page;
        }
    }
    // Số sản phẩm bỏ qua = (số trang hiện tại - 1) * số sản phẩm mỗi trang
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;

    const totalPage = Math.ceil(countProducts / objectPagination.limitItems);
    objectPagination.totalPage = totalPage;

    return objectPagination;
}