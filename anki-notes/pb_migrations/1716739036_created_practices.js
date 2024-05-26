/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "e7bd4q64ydvz8rw",
    "created": "2024-05-26 15:57:16.517Z",
    "updated": "2024-05-26 15:57:16.517Z",
    "name": "practices",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wwpjgdn2",
        "name": "card",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "ahunbmuqy2alihs",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "wduobpcw",
        "name": "correct",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "l4auowmm",
        "name": "fail",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("e7bd4q64ydvz8rw");

  return dao.deleteCollection(collection);
})
