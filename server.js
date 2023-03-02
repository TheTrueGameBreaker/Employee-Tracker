const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
	{
		host: "localhost",
		// MySQL username,
		user: "root",
		// MySQL password
		password: "Wii900wii900",
		database: "et_db",
	},
	console.log(`Connected to the et_db database.`)
);

function questionSelect() {
	inquirer
		.prompt([
			{
				type: "list",
				message: "what would you like to do today",
				name: "queryOptions",
				choices: [
					"View All Departments",
					"View All Roles",
					"View All Employees",
					"Add New Departments",
					"Add New Role",
					"Add New Employee",
					"Update Employee Role",
					"Exit",
				],
			},
		])
		.then((answer) => {
			switch (answer.queryOptions) {
				case "View All Departments":
					departmentManage();
					break;
				case "View All Roles":
					roleManage();
					break;
				case "View All Employees":
					employeeView();
					break;


				case "Add New Departments":
					departmentTarget();
					break;
				case "Add New Role":
					roleNew();
					break;
				case "Add New Employee":
					employeeNew();
					break;
				case "Update Employee Role":
					roleExistingUpdate();
					break;
				case "Exit":
					exit();
					break;
			}
		});
}

function departmentManage() {
	db.query("SELECT * FROM department order by id", (err, result) => {
		if (err) {
			console.log(err);
		}
		console.log("\n");
		console.table(result);
		questionSelect();
	});
}

function roleManage() {
	db.query("SELECT * FROM role", (err, result) => {
		if (err) {
			console.log(err);
		}
		console.log("\n");
		console.table(result);
		questionSelect();
	});
}

function employeeManage() {
	db.query("SELECT * FROM employee", (err, result) => {
		if (err) {
			console.log(err);
		}
		console.log("\n");
		console.table(result);
		questionSelect();
	});
}

function employeeView() {
	db.query("SELECT * FROM employee", (err, result) => {
		if (err) {
			console.log(err);
		}
		console.log("\n");
		console.table(result);
		questionSelect();
	});
}

function departmentTarget() {
	inquirer
		.prompt([
			{
				type: "input",
				message: "What is the name of the department you would like to add?",
				name: "addDepartment",
			},
		])
		.then((answer) => {
			db.query(
				`INSERT INTO department (name) VALUES (?)`,
				`${answer.addDepartment}`,
				(err, result) => {
					if (err) {
						console.log(err);
					}
					console.log(`\n`);
					console.table(result);
					questionSelect();
				}
			);
		});
}

function roleNew() {
	inquirer
		.prompt([
			{
				type: "input",
				message: "What is the title of the role you would like to add?",
				name: "addNewTitle",
			},
			{
				type: "input",
				message: "What is the salary of the role you would like to add?",
				name: "addNewSalary",
			},
			{
				type: "input",
				message: "What is the department of the role you would like to add?",
				name: "addNewDepartment",
			},
		])
		.then((answer) => {
			db.query(
				`INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)`,
				[answer.addNewTitle, answer.addNewSalary, answer.addNewDepartment],
				(err, result) => {
					if (err) {
						console.log(err);
					}
					console.log("\n");
					console.table(result);
					questionSelect();
				}
			);
		});
}

function employeeNew() {
	inquirer
		.prompt([
			{
				type: "input",
				message:
					"What is the first name of the employee you would like to add?",
				name: "addNewEmployeeFirstName",
			},
			{
				type: "input",
				message: "What is the employee last name ?",
				name: "addNewEmployeeLastName",
			},
			{
				type: "input",
				message: "What is the employee role id?",
				name: "addNewEmployeeRoleId",
			},
			{
				type: "input",
				message: "What is the manager for this employee?",
				name: "newEmployeeManager",
			},
		])
		.then((answer) => {
			db.query(
				`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
				[
					answer.addNewEmployeeFirstName,
					answer.addNewEmployeeLastName,
					answer.addNewEmployeeRoleId,
					answer.newEmployeeManager,
				],
				(err, result) => {
					if (err) {
						console.log(err);
					}
					console.log("\n");
					console.table(result);
					questionSelect();
				}
			);
		});
}

function roleExistingUpdate() {
	inquirer
		.prompt([
			{
				type: "input",
				name: "employee_id",
				message: "which employee id  would you like to update the role for",
			},
			{
				type: "input",
				message: "What is the role id you would like to choose ?",
				name: "role_id",
			},
		])
		.then((answer) => {
			db.query(
				"update employee set role_id = ? where id = ?",
				[answer.role_id, answer.employee_id],
				function (err, data) {
					questionSelect();
				}
			);
		});
}

function exit() {
	return;
}

questionSelect();

// Default response for any other request (Not Found)
app.use((req, res) => {
	res.status(404).end();
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
