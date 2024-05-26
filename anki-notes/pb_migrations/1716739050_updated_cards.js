/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ahunbmuqy2alihs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2w77tl8h",
    "name": "nextPractice",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ahunbmuqy2alihs")

  // remove
  collection.schema.removeField("2w77tl8h")

  return dao.saveCollection(collection)
})
