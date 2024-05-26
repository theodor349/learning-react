/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ahunbmuqy2alihs")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "irfb61vg",
    "name": "Question",
    "type": "editor",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y7ynb5zu",
    "name": "Answer",
    "type": "editor",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2w77tl8h",
    "name": "nextPractice",
    "type": "date",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dnkginku",
    "name": "deck",
    "type": "relation",
    "required": true,
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "irfb61vg",
    "name": "Question",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y7ynb5zu",
    "name": "Answer",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  // update
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

  // update
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
})
