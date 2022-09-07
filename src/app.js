const {extractCoinsData} = require('./script/dataExtractor')
const path = require('path')
const Express = require('express')
const hbs = require('hbs')

const app = Express()
const port = process.env.port || 3000

const partialFolder = path.join(__dirname, '../template/partials')
const dynamicFolder = path.join(__dirname, '../template/views')
const staticIndexPath = path.join(__dirname, '../public')
const modulePath = path.join(__dirname, '../node_modules')
app.use(Express.static(staticIndexPath))
app.use(Express.static(modulePath))

/*on va indiquer ou chercher les fichier partial (header) a bhs*/
hbs.registerPartials(partialFolder)
/*maintenant que nous avons vu comment integrer des pages static (html)
voyons comment remplacer ses page static en page dynamic avec hbs qui est une surcouche de
handlebars ... (pas besoin de require même si hbs à été installé avec npm)*/
app.set('view engine', 'hbs')
//changeons le dossier que express 'regarde' pour les fichier dynamiqye hbs (voir set dans la ref express)
app.set('views', dynamicFolder)

app.get('', (req,res) => {
  //extract data from the api and build the ichimoku cloud
  extractCoinsData( (response, error) => {
    //ici les données sont envoyées de l'app vers la page (dynamisme)
    //index va directement être rechercher dans le dossier view a la racine de projet
    //inutile de rajouter l'extension .hbs pour index
    const data = {title : 'coin chart signal', name : 'S2z', data_OHLC : JSON.stringify(response.coin_OHLC_data), data_Ichimoku_Cloud : JSON.stringify(response.ichimoku_Cloud_data)}
    res.render('index', {data : data})
  })
})

/*
app.get('*', (req,res) => {
  res.render('404', {
    title : '404',
    errorMsg : 'Page not found',
    name: 'S2z'
  })
})*/
app.listen(port, () =>{
  console.log('local server start at port' + port)
})
