import crypto from "crypto";
import express from "express";
import pgp from "pg-promise";
import { validate } from "./validateCpf";
const app = express();
app.use(express.json());

const INVALID_CAR_PLATE = -5;
const USER_ALREAY_EXISTS = -4;
const INVALID_USER_NAME = -3;
const INVALID_EMAIL_ADDRESS = -2;
const INVALID_CPF = -1;

function isNameValid(fullName: string) {
	return fullName.match(/[a-zA-Z] [a-zA-Z]+/);
}

function isEmailValid(email: string) {
	return email.match(/^(.+)@(.+)$/);
}

function isCarPlateValid(carPlate: string) {
	return carPlate.match(/[A-Z]{3}[0-9]{4}/);
}

app.post("/signup", async function (req, res) {
	const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
	try {
		const id = crypto.randomUUID();
		const [acc] = await connection.query("select * from cccat16.account where email = $1", [req.body.email]);
		if (acc) throw USER_ALREAY_EXISTS;
		if (!isNameValid(req.body.name)) throw INVALID_USER_NAME;
		if (!isEmailValid(req.body.email)) throw INVALID_EMAIL_ADDRESS;
		if (!validate(req.body.cpf)) throw INVALID_CPF;
		if (req.body.isDriver && !isCarPlateValid(req.body.carPlate)) throw INVALID_CAR_PLATE;
		await connection.query("insert into cccat16.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)", [id, req.body.name, req.body.email, req.body.cpf, req.body.carPlate, !!req.body.isPassenger, !!req.body.isDriver]);
		const response = {
			accountId: id
		};
		res.json(response);
	} catch (error) {
		res.status(422).send(String(error));
	} finally {
		await connection.$pool.end();
	}
}); 

app.listen(3000);
