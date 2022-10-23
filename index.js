const PORT = 8000
const express = require('express')
const cors = require('cors')
const { v1: uuidv1 } = require('uuid')
const { connect, } = require('getstream')
const StreamChat = require('stream-chat').StreamChat

const app = express()
app.use(express.json())
app.use(cors())


const client = connect("tjrf7ngdzv5g", "57jbfp2gns73eta2en4h947tfwbk7fjnqjkbmsay9e4as5w22az5cpgjsafs84z2", "1215059")

app.post('/signup', async (req, res) => {
  
  try {
    const { ggToken, email, name, id } = req.body;
    const mail = email
    const userId = id
    const timestamp = Math.floor(Date.now() / 1000) + (60 * 60)
    const token = client.createUserToken(userId,timestamp)
    res.status(200).json({ ggToken, token, mail, userId, token, name});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

app.put('/member', async (req, res) => {
  const {ID} = req.body
  try {
    console.log(ID);


   const update = {
  id: ID, role: "member",
      
  
};
  const chatClient = await StreamChat.getInstance("tjrf7ngdzv5g", "57jbfp2gns73eta2en4h947tfwbk7fjnqjkbmsay9e4as5w22az5cpgjsafs84z2")
  const response = await chatClient.upsertUser(update) // member로 업데이트하는 기능

   res.status(200).send(response);
  } catch (error) {
    
    console.log(error);
    res.status(500).json({ message: error });
  }
})



app.listen(PORT, () => console.log('Server running on PORT ' + PORT))


