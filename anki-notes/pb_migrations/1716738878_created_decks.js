/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "xu27bdpnw47labc",
    "created": "2024-05-26 15:54:38.811Z",
    "updated": "2024-05-26 15:54:38.811Z",
    "name": "decks",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hjxaqxwa",
        "name": "cards",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "ahunbmuqy2alihs",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": null
        }
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
  const collection = dao.findCollectionByNameOrId("xu27bdpnw47labc");

  return dao.deleteCollection(collection);
})
