const express = require("express");
const { createEmployee, getEmployee, getSingleEmployee, deleteEmployee, updateEmployee, getDeletedEmployee, deleteEmployeePermanently, restoreEmployee } = require("../controller/EmployeeController");
const router = express.Router();

router.route("/").post(createEmployee).get(getEmployee)
router.route("/:id").get(getSingleEmployee).put(updateEmployee).delete(deleteEmployee)
router.route("/counter/ceck").post()
router.route("/deletedemployee/d").get(getDeletedEmployee)
router.route("/deletedemployee/delete/:id").delete(deleteEmployeePermanently)
router.route("/deletedemployee/restoreemployee/:id").post(restoreEmployee);


module.exports = router