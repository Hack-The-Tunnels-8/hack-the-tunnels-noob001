import express, { Request, Response } from "express";
import { ProductService } from "../../../services";
import { success, error, verifyAuthorization } from "../utils";
import { Product } from "@prisma/client";

const router = express.Router();

const getProducts = async (_: Request, response: Response) => {
  const products = await ProductService.all();

  return success(response, {
    data: {
      products: products,
    },
    statusCode: 200,
  });
};

const getProduct = async (request: Request, response: Response) => {
  const id = request.params.id;
  const search_term = request.query.searchTerm as string;
  let product: Product;
  if (search_term) {
    product = await ProductService.search(search_term);
  } else {
    product = await ProductService.find(id);
  }

  if (product === null) {
    return error(response, {
      error: "Product not found.",
      statusCode: 404,
    });
  }

  return success(response, {
    data: {
      product: product,
    },
    statusCode: 200,
  });
};

const createProduct = async (request: Request, response: Response) => {
  const authorization = await verifyAuthorization(
    request.headers.authorization
  );

  if (authorization.err) {
    return error(response, {
      error: authorization.val.message,
      statusCode: 401,
    });
  }

  const product = await ProductService.create(
    request.body.title,
    request.body.description,
    request.body.price
  );

  return success(response, {
    data: {
      product: product,
    },
    statusCode: 201,
  });
};

const updateProduct = async (request: Request, response: Response) => {
  const authorization = await verifyAuthorization(
    request.headers.authorization
  );

  if (authorization.err) {
    return error(response, {
      error: authorization.val.message,
      statusCode: 401,
    });
  }

  const product = await ProductService.update(
    parseInt(request.params.id),
    request.body.title,
    request.body.description,
    request.body.price
  );

  return success(response, {
    data: {
      product: product,
    },
    statusCode: 201,
  });
};

const deleteProduct = async (request: Request, response: Response) => {
  const authorization = await verifyAuthorization(
    request.headers.authorization
  );

  if (authorization.err) {
    return error(response, {
      error: authorization.val.message,
      statusCode: 401,
    });
  }

  const product = await ProductService.Delete(parseInt(request.params.id));

  return success(response, {
    data: {
      product: product,
    },
    statusCode: 201,
  });
};

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
