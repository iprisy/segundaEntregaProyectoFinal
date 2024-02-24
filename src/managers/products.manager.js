const productsModel = require ('../model/products.model');
class ProductManager {
  getAllProducts = async () => {
    try {
      const products = await productsModel.find ({});
      return products;
    } catch (error) {
      console.log (
        '🚀 ~ ProductManager ~ getAllProducts=async ~ error:',
        error
      );
    }
  };

  getProductById = async id => {
    try {
      const product = await productsModel.find ({_id: id});
      console.log (
        '🚀 ~ ProductManager ~ getStudentById=async ~ product:',
        product
      );
      return product;
    } catch (error) {
      console.log (
        '🚀 ~ ProductManager ~ getStudentById=async ~ error:',
        error
      );
    }
  };
  createProduct = async bodyProduct => {
    try {
      //Reviso si el producto ha sido ya creado antes
      const productDetail = await productsModel.findOne ({
        descripcion: bodyProduct.descripcion,
      });
      if (productDetail && Object.keys (productDetail).length !== 0) {
        return null;
      }
      const newProduct = await productsModel.create (bodyProduct);
      return newProduct;
    } catch (error) {
      console.log ('🚀 ~ createProduct=async ~ error:', error);
    }
  };
}
module.exports = ProductManager;
