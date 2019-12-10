// src/index.ts
import 'reflect-metadata'
import { createKoaServer } from "routing-controllers"
import Controller from "./controller"

const port = process.env.PORT || 4000

const app = createKoaServer({
  controllers: [Controller]
})

console.log("HIII")

app.listen(port, () => console.log(`Listening on port ${port}`))