import express from "express";
import { getDB } from "../backend.js";

const NPDLRouter = express.Router();

NPDLRouter.route("/").get((req, res) => {
  res.render("pages/index");
});

NPDLRouter.route("/servicos").get((req, res) => {
  res.render("pages/servicos");
});

NPDLRouter.route("/sobre").get((req, res) => {
  res.render("pages/sobre");
});

NPDLRouter.route("/contactos").get((req, res) => {
  res.render("pages/contactos");
});

NPDLRouter.route("*").get((req, res) => {
  res.render("pages/login");
});

export default NPDLRouter;
