/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1128614704")

  // update collection data
  unmarshal({
    "createRule": "",
    "listRule": ""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1128614704")

  // update collection data
  unmarshal({
    "createRule": null,
    "listRule": null
  }, collection)

  return app.save(collection)
})
