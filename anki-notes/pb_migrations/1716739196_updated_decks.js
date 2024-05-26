/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xu27bdpnw47labc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c2pmzsbp",
    "name": "Title",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xu27bdpnw47labc")

  // remove
  collection.schema.removeField("c2pmzsbp")

  return dao.saveCollection(collection)
})
