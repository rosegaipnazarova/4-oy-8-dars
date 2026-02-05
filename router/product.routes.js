const{Router} = require("express")
const { get_all_products, get_one_product, add_product, update_product, delete_product } = require("../controller/product.controller")

const productRouter = Router()

productRouter.get("./get_all_products",get_all_products)
productRouter.get("./get_one_product/:id",get_one_product)
productRouter.post("./add_product",autharization,add_product)
productRouter.put("./update_product/:id",autharization,update_product)
productRouter.delete("./delete_product/:id",autharization,delete_product)

module.exports = productRouter