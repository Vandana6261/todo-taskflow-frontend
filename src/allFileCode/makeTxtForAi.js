import fs from 'fs'
let files=fs.readdirSync('../components', 'utf-8');
let files2 = fs.readdirSync('../pages', 'utf-8');

files.forEach(file=>{
    
    fs.readFile(`../components/${file}`,'utf-8',(err,data)=>{
        if(err)
            throw err;
        fs.appendFileSync('AI_Prompt.txt', data+"\n")
    })
})

// files2.forEach(file => {
//     fs.readFile(`../pages/${file}`, 'utf-8', (err, data) => {
//         if(err)
//             throw err;
//         fs.appendFileSync('AI_Prompt.txt', data+"\n")
//     })
// })