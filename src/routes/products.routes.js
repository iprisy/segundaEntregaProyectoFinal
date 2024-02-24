const {Router} = require ('express');
const productsData = require ('../init-data/products');
const productsModel = require ('../model/products.model');
const ProductManager = require ('../managers/products.manager');
class ProductsRoutes {
  path = '/products';
  router = Router ();
  ProductManager = new ProductManager ();

  constructor () {
    this.initProductsRoutes ();
  }
  initProductsRoutes () {
    this.router.get (`${this.path}/insertion`, async (req, res) => {
      try {
        const products = await productsModel.insertMany (productsData);
        return res.json ({
          message: 'products insert successfully',
          productsInserted: products,
        });
      } catch (error) {
        console.log ('🚀 ~ ProductsRoutes ~ this.router.get ~ error:', error);
      }
    });

    //Retornar todos los productos

    this.router.get (`${this.path}`, async (req, res) => {
      try {
        const products = await this.ProductManager.getAllProducts ();
        return res
          .status (200)
          .json ({ok: true, message: `getAllProducts`, products});
      } catch (error) {}
    });
    this.router.post (`${this.path}`, async (req, res) => {
      try {
        const productBody = req.body;
        const newProduct = await this.ProductManager.createProduct (
          productBody
        );
        if (!newProduct) {
          return res.json ({
            message: `El producto descrito ${productBody.descripcion} ya ha sido registrado`,
          });
        }
        return res.json ({
          message: `producto creado de forma correcta`,
          product: newProduct,
        });
      } catch (error) {
        console.log("🚀 ~ ProductsRoutes ~ this.router.post ~ error:", error)
        
      }
    });

    this.router.get (`${this.path}/:pid`, async (req, res) => {
      try {
        const productId = req.params.pid;
        const product = await this.ProductManager.getProductById (productId);
        if (!product) {
          return res.status (404).json ({
            ok: true,
            message: 'the product does not exist',
          });
        }

        return res
          .status (200)
          .json ({ok: true, message: `getProductById`, product});
      } catch (error) {
        console.log ('🚀 ~ ProductsRoutes ~ this.router.get ~ error:', error);
      }
      return res.status (500).json ({
        ok: false,
        message: 'something WRONG!!!',
      });
    });
  }
}
module.exports = ProductsRoutes;
