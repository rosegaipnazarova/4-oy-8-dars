const {v4} = require("uuid")

const { read_file, write_file } = require("../api/file-system")




const get_all_products = async(req,res) =>{
    try{

    //    const {title, desc} = req.body
    //    const foundedUser = fileData.find((item) => item.email === email)
        const products = read_file("product.json")
        res.status(201).json(products)
       

    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const get_one_product = async(req,res) =>{
    try{
        const {id} = req.params
        const products = read_file("product.json")
        const founded = products.find((item) => item.id === id)

         if (!founded) {
            return res.status(400).json({
                message:"Product not found!"
            })
        }
        


        res.status(201).json(founded)
       

    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const add_product = async(req,res) =>{
    try{

       const {title, desc} = req.body
        const products = read_file("product.json")

        products.push({
            id: v4(),
            title,
            desc
        })

        write_file("product.json", products)
        res.status(201).json({
            message: "Added new product"
        })
       

    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const update_product = async(req,res) =>{
    try{
        const {title, desc} = req.body
        const {id} = req.params
        const products = read_file("product.json")
        const founded = products.find((item) => item.id === id)

         if (!founded) {
            return res.status(400).json({
                message:"Product not found!"
            })
        }

        products,forEach((item) => {
            if (item.id === id) {
                item.item = title ? title : item.title
                item.desc = desc ? desc : item.desc
            }
        })
        
        write_file("product.json",products)

        res.status(201).json({
            message: "Updated product"
        })
       

    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const delete_product = async(req,res) =>{
    try{
        const {id} = req.params
        const products = read_file("product.json")
        const founded = products.find((item) => item.id === id)

         if (!founded) {
            return res.status(400).json({
                message:"Product not found!"
            })
        }

        products,forEach((item, idx) => {
            if (item.id === id) {
                products.splice(idx, 1)
            }
        })
        
        write_file("product.json",products)

        res.status(201).json({
            message: "Deleted product"
        })
       

    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}
module.exports = {
   get_all_products,
   add_product,
    get_one_product,
    update_product,
    delete_product
}