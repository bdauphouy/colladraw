// import Colladraw from "../../../client/src/scripts/colladraw/build/module/index"

// // const canvas = document.querySelector("#canvas")
// new Colladraw()
require("./bootstrap")

Echo.channel("canvas").listen("Draw", (e) => {
  console.log(e.action)
})
