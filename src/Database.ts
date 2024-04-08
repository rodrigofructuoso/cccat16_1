import pgp from "pg-promise";

const database = pgp()("postgres://postgres:123456@localhost:5432/app");

export const Database = database;