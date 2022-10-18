const PORT = 8000
const express = require('express')
const cors = require('cors')
const { v1: uuidv1 } = require('uuid')
const { connect } = require('getstream')
const StreamChat = require('stream-chat').StreamChat

const app = express()
app.use(express.json())
app.use(cors())


app.post('/signup', async (req, res) => {
  
  try {
    const { ggToken, email, name } = req.body;
    const userId = uuidv1()
    const client = connect("tjrf7ngdzv5g", "57jbfp2gns73eta2en4h947tfwbk7fjnqjkbmsay9e4as5w22az5cpgjsafs84z2", "1215059")
    const timestamp = Math.floor(Date.now() / 1000) + (60 * 60)
    const token = client.createUserToken(userId,timestamp)
    const mail = email.toLowerCase()
    res.status(200).json({ ggToken, token, mail, userId, token, name});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});



app.listen(PORT, () => console.log('Server running on PORT ' + PORT))