import { Router } from "express";
import { createProduct } from "./handlers/products";

const router = Router()

router.get("/", (req, res) => {
    res.json("desde get")
} )

router.post("/", createProduct)

router.put("/", (req, res) => {
    res.json("desde put")
} )

router.patch("/", (req, res) => {
    res.json("Desde patch")
} )

router.delete("/", (req, res) => {
    res.json("desde delete")
} )

export default router
