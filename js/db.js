var dbPromised = idb.open("info-bola-v01", 1, function(upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore("bola", {
    keyPath: "id"
  });
  articlesObjectStore.createIndex("name", "name", {
    unique: false
  });
});

function saveForLater(club) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("bola", "readwrite");
      var store = tx.objectStore("bola");
       store.add(club);
	   return tx.complete;
    })
    .then(function() {
      console.log("Club Favorite berhasil di simpan.!!!");
    });
}
function delFavorite(club) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("bola", "readwrite");
      var store = tx.objectStore("bola");
       store.delete(club.id);
	   return tx.complete;
    })
    .then(function() {
      console.log("Club Favorite berhasil di hapus!!.");
    });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("bola", "readonly");
        var store = tx.objectStore("bola");
        return store.getAll();
      })
      .then(function(club) {
        resolve(club);
      });
  });
}

function getAllByTitle(title) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("bola", "readonly");
      var store = tx.objectStore("bola");
      var titleIndex = store.index("name");
      var range = IDBKeyRange.bound(title, title + "\uffff");
      return titleIndex.getAll(range);
    })
    .then(function(club) {
      console.log(club);
    });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("bola", "readonly");
        var store = tx.objectStore("bola");
        return store.get(Number(id));
      })
      .then(function(club) {
        resolve(club);
      });
  });
}

function checkFavorite(id) {
    return new Promise(function (resolve) {
        dbPromised.then(function (db) {
            const transaction = db.transaction("bola", "readonly");
            return transaction.objectStore("bola").get(id)
        }).then(function (favorite) {
            if(favorite !== undefined){
                resolve(true);
            } else {
                resolve(false);
            }
        })
    })
}
