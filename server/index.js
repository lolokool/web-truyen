const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = process.env.PORT || 8888;
const cors = require("cors");
const multer = require('multer')
const path = require('path')
const deleteAllFilesInDir = require("./utils/deleteFile");
const { db } = require('./db');
const router = require("./auth/auth.routes");
const dotenv = require('dotenv');
const authMiddleware = require('./auth/auth.middlewares');

const con = db();
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage })
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// const checkIsAuth = auth.isAuth();

// app.use("/product", checkIsAuth)

// PRODUCT
app
  .route("/product")
  .get(function (req, res) {
    let sql = "SELECT * FROM Product";
    con.query(sql, (err, response) => {
      if (err) {
        res.send({ status: "error", message: err });
      } else {
        res.send({ status: "success", data: response });
      }
    });
  })
  .post(function (req, res) {
    let sql = `INSERT INTO Product SET ?`;
    const { body } = req;
    if (!body.ProductId) {
      res
        .status(400)
        .send({ status: "error", message: "Dữ liệu đầu vào không tồn tại." });
    } else {
      con.query(sql, body, function (err) {
        if (err) {
          res.send({ status: "error", message: err });
        } else {
          res.send({ status: "success", data: body });
        }
      });
    }
  });

app
  .route("/product/:productId")
  .get(function (req, res) {
    const { productId } = req.params;
    let sql = "SELECT * FROM Product WHERE ProductId = ?";
    con.query(sql, productId, (err, response) => {
      if (err) throw err;
      const data =
        response && Array.isArray(response)
          ? response.find((el) => el.ProductId == productId)
          : null;
      if (data) {
        res.send({ status: "success", data: data });
      } else {
        res.send({ status: "error", message: "ProductId không tồn tại." });
      }
    });
  })
  .put(function (req, res) {
    let sql = `UPDATE Product 
              SET ?
              WHERE ProductId = ?`;
    const { body, params } = req;
    const { productId } = params;
    if (!body.ProductId) {
      res
        .status(400)
        .send({ status: "error", message: "ProductId vào không tồn tại." });
    } else {
      con.query(sql, [body, productId], function (err) {
        if (err) {
          res.send({ status: "error", message: err });
        } else {
          res.send({ status: "success", data: body });
        }
      });
    }
  })
  .delete(function (req, res) {
    const { productId } = req.params;
    let sql = `DELETE FROM Product WHERE ProductId = ? `;
    con.query(sql, productId, function (err) {
      if (err) {
        res.send({ status: "error", message: err });
      } else {
        res.send({ status: "success", data: productId });
      }
    });
  });

// CATEGORY
app
  .route("/category")
  .get(function (req, res) {
    let sql = "SELECT * FROM Category";
    con.query(sql, (err, response) => {
      if (err) {
        res.send({ status: "error", message: err });
      } else {
        res.send({ status: "success", data: response });
      }
    });
  })
  .post(function (req, res) {
    let sql = `INSERT INTO Category SET ?`;
    const { body } = req;
    if (!body.CategoryId) {
      res
        .status(400)
        .send({ status: "error", message: "Dữ liệu đầu vào không tồn tại." });
    } else {
      con.query(sql, body, function (err) {
        if (err) {
          res.send({ status: "error", message: err });
        } else {
          res.send({ status: "success", data: body });
        }
      });
    }
  });

app
  .route("/category/:categoryId")
  .get(function (req, res) {
    const { categoryId } = req.params;
    let sql = "SELECT * FROM Category WHERE CategoryId = ?";
    con.query(sql, categoryId, (err, response) => {
      if (err) throw err;
      const data =
        response && Array.isArray(response)
          ? response.find((el) => el.CategoryId == categoryId)
          : null;
      if (data) {
        res.send({ status: "success", data: data });
      } else {
        res.send({ status: "error", message: "CategoryId không tồn tại." });
      }
    });
  })
  .put(function (req, res) {
    let sql = `UPDATE Category 
              SET ?
              WHERE CategoryId = ?`;
    const { body, params } = req;
    const { categoryId } = params;
    if (!body.CategoryId) {
      res
        .status(400)
        .send({ status: "error", message: "CategoryId vào không tồn tại." });
    } else {
      con.query(sql, [body, categoryId], function (err) {
        if (err) {
          res.send({ status: "error", message: err });
        } else {
          res.send({ status: "success", data: body });
        }
      });
    }
  })
  .delete(function (req, res) {
    const { categoryId } = req.params;
    let sql = `DELETE FROM Category WHERE CategoryId = ? `;
    con.query(sql, categoryId, function (err) {
      if (err) {
        res.send({ status: "error", message: err });
      } else {
        res.send({ status: "success", data: categoryId });
      }
    });
  });

// Manufacturer
app
  .route("/manufacturer")
  .get(function (req, res) {
    let sql = "SELECT * FROM Manufacturer";
    con.query(sql, (err, response) => {
      if (err) {
        res.send({ status: "error", message: err });
      } else {
        res.send({ status: "success", data: response });
      }
    });
  })
  .post(function (req, res) {
    let sql = `INSERT INTO Manufacturer SET ?`;
    const { body } = req;
    if (!body.ManufacturerId) {
      res
        .status(400)
        .send({ status: "error", message: "Dữ liệu đầu vào không tồn tại." });
    } else {
      con.query(sql, body, function (err) {
        if (err) {
          res.send({ status: "error", message: err });
        } else {
          res.send({ status: "success", data: body });
        }
      });
    }
  });

app
  .route("/manufacturer/:manufacturerId")
  .get(function (req, res) {
    const { manufacturerId } = req.params;
    let sql = "SELECT * FROM Manufacturer WHERE ManufacturerId = ?";
    con.query(sql, manufacturerId, (err, response) => {
      if (err) throw err;
      const data =
        response && Array.isArray(response)
          ? response.find((el) => el.ManufacturerId == manufacturerId)
          : null;
      if (data) {
        res.send({ status: "success", data: data });
      } else {
        res.send({ status: "error", message: "ManufacturerId không tồn tại." });
      }
    });
  })
  .put(function (req, res) {
    let sql = `UPDATE Manufacturer 
              SET ?
              WHERE ManufacturerId = ?`;
    const { body, params } = req;
    const { manufacturerId } = params;
    if (!body.ManufacturerId) {
      res.status(400).send({
        status: "error",
        message: "ManufacturerId vào không tồn tại.",
      });
    } else {
      con.query(sql, [body, manufacturerId], function (err) {
        if (err) {
          res.send({ status: "error", message: err });
        } else {
          res.send({ status: "success", data: body });
        }
      });
    }
  })
  .delete(function (req, res) {
    const { manufacturerId } = req.params;
    let sql = `DELETE FROM Manufacturer WHERE ManufacturerId = ? `;
    con.query(sql, manufacturerId, function (err) {
      if (err) {
        res.send({ status: "error", message: err });
      } else {
        res.send({ status: "success", data: manufacturerId });
      }
    });
  });
// Account
app
  .route("/account")
  .get(authMiddleware.isAuth, function (req, res) {
    let sql = "SELECT * FROM Account";
    con.query(sql, (err, response) => {
      if (err) {
        res.send({ status: "error", message: err });
      } else {
        res.send({ status: "success", data: response });
      }
    });
  })
  .post(function (req, res) {
    let sql = `INSERT INTO Account SET ?`;
    const { body } = req;
    if (!body.AccountID) {
      res
        .status(400)
        .send({ status: "error", message: "Dữ liệu đầu vào không tồn tại." });
    } else {
      con.query(sql, body, function (err) {
        if (err) {
          res.send({ status: "error", message: err });
        } else {
          res.send({ status: "success", data: body });
        }
      });
    }
  });

app
  .route("/account/:accountId")
  .get(function (req, res) {
    const { accountId } = req.params;
    let sql = "SELECT * FROM Account WHERE AccountID = ?";
    con.query(sql, accountId, (err, response) => {
      if (err) throw err;
      const data =
        response && Array.isArray(response)
          ? response.find((el) => el.AccountID == accountId)
          : null;
      if (data) {
        res.send({ status: "success", data: data });
      } else {
        res.send({ status: "error", message: "AccountID không tồn tại." });
      }
    });
  })
  .put(function (req, res) {
    let sql = `UPDATE Account 
              SET ?
              WHERE AccountID = ?`;
    const { body, params } = req;
    const { accountId } = params;
    if (!body.AccountID) {
      res
        .status(400)
        .send({ status: "error", message: "AccountID vào không tồn tại." });
    } else {
      con.query(sql, [body, accountId], function (err) {
        if (err) {
          res.send({ status: "error", message: err });
        } else {
          res.send({ status: "success", data: body });
        }
      });
    }
  })
  .delete(function (req, res) {
    const { accountId } = req.params;
    let sql = `DELETE FROM Account WHERE AccountID = ? `;
    con.query(sql, accountId, function (err) {
      if (err) {
        res.send({ status: "error", message: err });
      } else {
        res.send({ status: "success", data: accountId });
      }
    });
  });

app.post('/uploadfile', upload.single('myFile'), function (req, res, next) {
  const file = req.file;

  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(file)
});

app.get('/getPhoto/:imageId', function (req, res) {
  const { imageId } = req.params;
  res.sendFile(__dirname + `/images/${imageId}`);
});

app.delete('/remove-all-images', async function () {
  const directory = "/images";
  await deleteAllFilesInDir(__dirname + directory);
});

app.use('/auth', router);

app.get('/profile', authMiddleware.isAuth, async (req, res) => {
  res.send(req.user);
})

app.listen(port);
console.log("Server started at http://localhost:" + port);
