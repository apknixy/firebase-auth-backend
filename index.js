const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://airaview-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const app = express();
app.use(cors());
app.use(express.json());

app.post("/createCustomToken", async (req, res) => {
  const { uid } = req.body;

  try {
    const customToken = await admin.auth().createCustomToken(uid);
    res.json({ token: customToken });
  } catch (error) {
    console.error("Error creating custom token:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
