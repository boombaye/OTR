const Koa = require('koa');
const app = new Koa();
const koaRouter = require('koa-router');
const booleans = require('./routes/BooleanFunctionsInterface');
const router = new koaRouter();
const parseInputdata = require('./routes/parseInputData');
const records = require('./routes/records');
const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
router.get('/',(ctx,next)=>{ctx.body = 'homepage'});
router.post('/records', async (ctx,next) =>{
    await next();
    let body = ctx.request.body;
    let inputData = [];
    let boolFirstName;
    let boolLastName;
    let boolColor;
    let boolGender;
    let boolBirthdate;
    if(body.match(/[|]/g)){
        inputData = parseInputdata(',',body.match(/[|]/g).length,body);
        boolLastName = booleans.isName(inputData[0]);
        console.log('boolLastName is '+boolLastName);
        boolFirstName = booleans.isName(inputData[1]);
        console.log('boolFirstName is '+boolFirstName);
        boolGender = booleans.isGender(inputData[2]);
        console.log('boolGender is '+boolGender);
        boolColor = booleans.isName(inputData[3]);
        console.log('boolColor is '+boolColor);
        boolBirthdate = booleans.isBirthDate(inputData[4]);
        console.log('boolBirthdate is '+boolBirthdate);
        if(!(boolLastName && boolFirstName && boolGender && boolColor && boolBirthdate)){
            let err = new Error('Failed Boolean checks');
            err.message = "Error! the boolean checks failed";
            console.log(err.message);
            throw err;
        }
        else{
            createRecords();
        }
    }
    else if(body.match(/[,]/g)){
        inputData = parseInputdata(',',body.match(/[,]/g).length,body);
        boolLastName = booleans.isName(inputData[0]);
        console.log('boolLastName is '+boolLastName);
        boolFirstName = booleans.isName(inputData[1]);
        console.log('boolFirstName is '+boolFirstName);
        boolGender = booleans.isGender(inputData[2]);
        console.log('boolGender is '+boolGender);
        boolColor = booleans.isName(inputData[3]);
        console.log('boolColor is '+boolColor);
        boolBirthdate = booleans.isBirthDate(inputData[4]);
        console.log('boolBirthdate is '+boolBirthdate);
        if(!(boolLastName && boolFirstName && boolGender && boolColor && boolBirthdate)){
            let err = new Error('Failed Boolean checks');
            err.message = "Error! the boolean checks failed";
            console.log(err.message);
            throw err;
        }
        else{
            createRecords();
        }
    }
    else if(body.match(/[" "]/g)){
        inputData = parseInputdata(" ",body.match(/[" "]/g).length,body);
        boolLastName = booleans.isName(inputData[0]);
        console.log('boolLastName is '+boolLastName);
        boolFirstName = booleans.isName(inputData[1]);
        console.log('boolFirstName is '+boolFirstName);
        boolGender = booleans.isGender(inputData[2]);
        console.log('boolGender is '+boolGender);
        boolColor = booleans.isName(inputData[3]);
        console.log('boolColor is '+boolColor);
        boolBirthdate = booleans.isBirthDate(inputData[4]);
        console.log('boolBirthdate is '+boolBirthdate);
        if(!(boolLastName && boolFirstName && boolGender && boolColor && boolBirthdate)){
            let err = new Error('Failed Boolean checks');
            err.message = "Error! the boolean checks failed";
            console.log(err.message);
            throw err;
        }
        else{
            createRecords();
        }
    }
    else{
        let err = new Error('Missing fields');
        err.message = "Error! none of the required delimeters are present";
        console.log(err.message);
        throw err;
    }
      function createRecords() {
        records.push({
            last_name: inputData[0].charAt(0).toUpperCase() +inputData[0].slice(1),
            first_name: inputData[1].charAt(0).toUpperCase() +inputData[1].slice(1),
            gender: inputData[2].charAt(0).toUpperCase()+inputData[2].slice(1),
            favorite_color: inputData[3],
            date_of_birth: inputData[4]
        });
    }
});
router.get('/records/gender', (ctx, next) => {
    records.sort(function(a,b){
        if(a.gender < b.gender){return -1};
        if(a.gender > b.gender){return 1};
        if(a.date_of_birth < b.date_of_birth){return -1};
        if(a.date_of_birth > b.date_of_birth){return 1};
        return 0;
    });
    ctx.body = records;
});
router.get('/records/birthdate', (ctx, next) => {
    records.sort(function(a,b){
        if(a.date_of_birth < b.date_of_birth){return -1};
        if(a.date_of_birth > b.date_of_birth){return 1};
        return 0;
    })
    ctx.body = records;
});
router.get('/records/name', (ctx, next) => {
    records.sort(function(a,b){
        if(a.last_name < b.last_name){return -1};
        if(a.last_name > b.last_name){return 1};
        return 0;
    });
    ctx.body = records;
});
app.use(router.routes()).use(router.allowedMethods());
app.use(koaBody());
app.use(bodyParser({multipart: true,
    urlencoded: true}));
app.listen(3000);