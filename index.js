import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import KPI from "./models/KPI.js";
import { kpis, products, transactions } from "./data/data.js";
import kpiRoutes from "./routes/kpi.js";
import mongoose from "mongoose";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";
import Transaction from "./models/Transaction.js";
import Product from "./models/Product.js";

/* CONFIGURATION */
dotenv.config({ path: "./config/config.env" });
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("common"));
app.use(cors());

/* ROUTES */
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

/* MONGOOSE CONNECTION SETUP */
const PORT = process.env.PORT || 9000;
mongoose.Promise = global.Promise;
await mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port : ${PORT}`));

    /* ADD DATA ONE TIME ONLY OR AS NEEDED */
    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis);
    // Product.insertMany(products);
    // Transaction.insertMany(transactions);
  })
  .catch((error) => console.log(`Error connecting to MongoDB Atlas, ${error}`));
