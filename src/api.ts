import express from "express";
import { validate } from "./validateCpf";
import { Account } from "./Account";
const app = express();
app.use(express.json());

const INVALID_CAR_PLATE = -5;
const USER_ALREAY_EXISTS = -4;
const INVALID_USER_NAME = -3;
const INVALID_EMAIL_ADDRESS = -2;
const INVALID_CPF = -1;

const HTTP_UNPROCESSABLE_CONTENT = 422

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
	try {
		const { name, email, cpf, carPlate, isPassenger, isDriver } = req.body;
		const account = await Account.findByEmail(email);
		if (account) throw USER_ALREAY_EXISTS;
		if (!isNameValid(name)) throw INVALID_USER_NAME;
		if (!isEmailValid(email)) throw INVALID_EMAIL_ADDRESS;
		if (!validate(cpf)) throw INVALID_CPF;
		if (isDriver && !isCarPlateValid(carPlate)) throw INVALID_CAR_PLATE;
		const newAccount = Account.create(name, email, cpf, carPlate, isPassenger, isDriver);
		await newAccount.save();
		const response = {
			accountId: newAccount.account_id
		};
		res.json(response);
	} catch (error) {
		res.status(HTTP_UNPROCESSABLE_CONTENT).send(String(error));
	}
});

app.listen(3000);
