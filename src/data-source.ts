import "dotenv/config";
import { DataSource } from "typeorm";
import path from "path";

const { PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE, NODE_ENV } =
    process.env;
const AppDataSource = new DataSource(
    NODE_ENV === "test"
        ? {
              type: "sqlite",
              database: ":memory:",
              synchronize: true,
              entities: ["src/entities/*.ts"],
          }
        : {
              type: "postgres",
              host: PGHOST,
              port: +PGPORT!,
              username: PGUSER,
              password: PGPASSWORD,
              database: PGDATABASE,
              logging: false,
              synchronize: false,
              entities: [path.join(__dirname, "./entities/**.{js,ts}")],
              migrations: [path.join(__dirname, "./migrations/**.{js,ts}")],
          }
);

export default AppDataSource;
