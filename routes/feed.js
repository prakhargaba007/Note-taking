const express = require("express");

const feedCntroller = require("../controllers/feed");

const router = express.Router();

router.post("/note", feedCntroller.postNote);

router.get("/notes", feedCntroller.getNotes);

router.get("/note/:noteId", feedCntroller.getNote);

router.put("/note/:noteId", feedCntroller.editNote); // Endpoint to edit a note

router.delete("/note/:noteId", feedCntroller.deleteNote); // Endpoint to delete a note

module.exports = router;
