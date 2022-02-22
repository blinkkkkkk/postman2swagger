var express = require('express');
const asyncHandler = require('express-async-handler');
const postmanToOpenApi = require('postman-to-openapi');
const postmanCollection = './store/tmp.json';
const outputFile = './store/collection.yml';


var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/postman2swagger',asyncHandler(postman2swagger))

async function postman2swagger(req,res){
    try {
        const result = await postmanToOpenApi(postmanCollection, outputFile, { defaultTag: 'General' })
        // Without save the result in a file
        const result2 = await postmanToOpenApi(postmanCollection, null, { defaultTag: 'General' })
        console.log(`OpenAPI specs: ${result}`)
    } catch (err) {
        console.log(err)
    }
    
    // Promise callback style
    postmanToOpenApi(postmanCollection, outputFile, { defaultTag: 'General' })
        .then(result => {
            console.log(`OpenAPI specs: ${result}`)
        })
        .catch(err => {
            console.log(err)
        })

    res.json({"status":"finish"})
  
}

module.exports = router;
