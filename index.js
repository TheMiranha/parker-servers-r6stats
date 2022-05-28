const cors = require('cors')
const app = require('express')()
app.use(cors({ origin: '*' }))
const R6 = require('r6s-stats-api')

app.get('/', (req, res) => {
  res.send({ status: 'OK!' })
})

app.get('/api/:type/:platform/:nickname', async (req, res) => {
  var { platform, nickname, type } = req.params
  let casual = false;
  let rank = false;
  let unrank = false;
  let general = false;
  switch (type) {
    case 'all':
      casual = await R6.casual(platform, nickname)
      rank = await R6.rank(platform, nickname)
      unrank = await R6.unrank(platform, nickname)
      general = await R6.general(platform, nickname)
      res.send({ casual, rank, unrank, general })
      break
    case 'casual':
      casual = await R6.casual(platform, nickname)
      res.send(casual)
      break
    case 'rank':
      rank = await R6.rank(platform, nickname)
      res.send(rank)
      break
    case 'unrank':
      unrank = await R6.unrank(platform, nickname)
      res.send(unrank)
      break
    case 'deathmatch':
      let deathmatch = await R6.deathmatch(platform, nickname)
      res.send(deathmatch)
      break
    default:
      general = await R6.general(platform, nickname)
      res.send(general)
      break
  }
})

app.get('/api/:type/:platform/:nickname/:operator', async (req, res) => {
  var { platform, nickname, operator } = req.params
  let response = await R6.operator(platform, nickname, operator)
  res.send(response)
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor aberto!')
})
