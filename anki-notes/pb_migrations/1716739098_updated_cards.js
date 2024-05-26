/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ahunbmuqy2alihs")

  collection.indexes = [
    "CREATE INDEX `idx_mam09Qf` ON `cards` (`deck`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dnkginku",
    "name": "deck",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "xu27bdpnw47labc",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ahunbmuqy2alihs")

  collection.indexes = []

  // remove
  collection.schema.removeField("dnkginku")

  return dao.saveCollection(collection)
})
