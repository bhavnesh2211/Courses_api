const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

// Courses

fs.access("courses.json", (err) => {
    if (!err){
       let data = fs.readFileSync("courses.json");
        return; 
    } else {
        writeJsonFile("courses.json",[]);
    } 
});
app.get("/courses", (req,res) => {
    return res.json(readFile("courses.json"));
});

app.use(express.json());
app.use(express.static("public"));

const readFile = (filename) => {
    let contents = fs.readFileSync(filename)
        return JSON.parse(contents);
    
};
// console.log(readFile("data.json"));
const writeJsonFile = (filename,data) => {
    let json = JSON.stringify(data,null,2);
    fs.writeFileSync(filename,json);
}
app.post("/courses",(req,res)=>{
    // console.log(req.body);
    if (req.body.hasOwnProperty("name") && req.body.hasOwnProperty("description")){
        let file = fs.readFileSync("courses.json");
        var courses = JSON.parse(file.toString());
        let course = req.body;
        course.id = courses.length+1;
        courses.push(course);
        writeJsonFile("courses.json",courses);
        return res.json(course);
    } else {
        return res.json({errMsg: "Aapka JSON galat hai."});
    } 
})

app.get('/courses/:id', (req,res) => {
    let courseId = fs.readFileSync("courses.json");
    let idOfCourse = JSON.parse(courseId.toString());
    // console.log(idOfCourse)
    let id = req.params.id;

    let length = idOfCourse.length;

    if (id === 0){
        return res.json({errMsg: "Aapne galat id dalli hai"})

    } else if (id <= length){
        return res.json (idOfCourse[id - 1]);

    } else {
        return res.json ({errMsg: "Aapne galat id dalli hai"});
    }    
})
app.put('/courses/:id', (req,res) => {
    let courseId = fs.readFileSync("courses.json");
    let idOfCourse = JSON.parse(courseId);
    let id = req.params.id;
    let length = idOfCourse.length

    if (id === 0){
        return res.json({errMsg: "Aapne galat id dalli hai"})

    } else if (id <= length){

        var courseDetails = idOfCourse[id - 1];
        if (req.body.hasOwnProperty("name")){
            idOfCourse[id - 1].name = req.body.name;

        }if (req.body.hasOwnProperty("description")){
            idOfCourse[id - 1].description = req.body.description;

        }else {
            return res.json({errMsg:"Aapne galat JSON dalla hai"})
        }
        writeJsonFile("courses.json",idOfCourse);
        return res.json(idOfCourse[id -1]);
        
    } else {
        return res.json ({errMsg: "Aapne galat id dalli hai"});
    }    
})

// Exercise of cources

fs.access("exercise.json", (err) => {
    if (!err){
       let data = fs.readFileSync("exercise.json");
        return; 
    } else {
        writeExerciseFile("exercise.json",[]);
    } 
});
app.get("/courses/:id/exercise", (req,res) => {
    let coursename = fs.readFileSync("courses.json");
    let idOfCourse = JSON.parse(coursename);
    let id = req.params.id;
    let length = idOfCourse.length;
    if (id <= length && id > 0){
        return res.json(readExerciseFile("exercise.json"));
    } else {
        return res.json({errMsg:"Aapne galat id dalli hai "})
    }

});

app.use(express.json());
app.use(express.static("public"));

const readExerciseFile = (filename) => {
    let contents = fs.readFileSync(filename)
        return JSON.parse(contents);
    
};
const writeExerciseFile = (filename,data) => {
    let json = JSON.stringify(data,null,2);
    fs.writeFileSync(filename,json);
}

app.post("/courses/:id/exercise",(req,res)=>{
    let coursename = fs.readFileSync("courses.json");
    let idOfCourse = JSON.parse(coursename);
    let id = req.params.id;
    let length = idOfCourse.length;
    if (id <= length && id > 0){
        if (req.body.hasOwnProperty("name") && req.body.hasOwnProperty("content") && req.body.hasOwnProperty("hint")){
            let file = fs.readFileSync("exercise.json");
            var exercises = JSON.parse(file.toString());
            let exercise = req.body;
            exercise.exerciseId = exercises.length+1;
            exercise.courseId = id
            exercises.push(exercise);
            writeExerciseFile("exercise.json",exercises);
            return res.json(exercise);
        } else {
            return res.json({errMsg: "Aapka JSON galat hai."});
        } 
    }else {
        return res.json({errMsg:"Aapne galat id dalli hai"});
    }  
})

app.get('/courses/:id/exercise/:eid', (req,res) => {
    let exerciseId = fs.readFileSync("exercise.json");
    let idOfExercise = JSON.parse(exerciseId.toString());
    // console.log(idOfCourse)
    let id = req.params.eid;

    let length = idOfExercise.length;

    if (id === 0){
        return res.json({errMsg: "Aapne galat id dalli hai"})

    } else if (id <= length){
        return res.json (idOfExercise[id - 1]);

    } else {
        return res.json ({errMsg: "Aapne galat id dalli hai"});
    }    
})

app.put('/courses/:cid/exercise/:eid', (req,res) => {
    let exerciseId = fs.readFileSync("exercise.json");
    let idOfExercise = JSON.parse(exerciseId);
    let id = req.params.eid;
    let length = idOfExercise.length

    if (id === 0){
        return res.json({errMsg: "Aapne galat id dalli hai"})

    } else if (id <= length){

        var courseDetails = idOfExercise[id - 1];
        if (req.body.hasOwnProperty("name")){
            idOfExercise[id - 1].name = req.body.name;

        }if (req.body.hasOwnProperty("content")){
            idOfExercise[id - 1].content = req.body.content;

        }if (req.body.hasOwnProperty("hint")){
            idOfExercise[id - 1].hint = req.body.hint;
        }
        else {
            return res.json({errMsg:"Aapne galat JSON dalla hai"})
        }
        writeJsonFile("exercise.json",idOfExercise);
        return res.json(idOfExercise[id -1]);
        
    } else {
        return res.json ({errMsg: "Aapne galat id dalli hai"});
    }    
})

// Summission of Exercise

fs.access("summission.json", (err) => {
    if (!err){
       let data = fs.readFileSync("summission.json");
        return; 
    } else {
        writeExerciseFile("summission.json",[]);
    } 
});
app.get("/courses/:id/exercise/:eid/summission", (req,res) => {
    let coursename = fs.readFileSync("courses.json");
    let idOfCourse = JSON.parse(coursename);
    let exerciseName = fs.readFileSync("exercise.json");
    let idOfExercise = JSON.parse(exerciseName);
    let id = req.params.id;
    let eId = req.params.eid;
    let length = idOfCourse.length;
    let length1 = idOfExercise.length;
    if (id <= length && id > 0){
        if (eId <= length1 && eId > 0){
            console.log("bhavnesh")
            return res.json(readSummissionFile("summission.json"));
        }else {
            return res.json({errMsg:"Aapne galat id dalli hai "})
        }
    } else {
        return res.json({errMsg:"Aapne galat id dalli hai "})
    }

});


app.use(express.json());
app.use(express.static("public"));

const readSummissionFile = (filename) => {
    let contents = fs.readFileSync(filename)
        return JSON.parse(contents);
    
};
const writeSummissionFile = (filename,data) => {
    let json = JSON.stringify(data,null,2);
    fs.writeFileSync(filename,json);
}

app.post("/courses/:id/exercise/:eid/summission",(req,res)=>{
    let coursename = fs.readFileSync("courses.json");
    let idOfCourse = JSON.parse(coursename);
    let exercisename = fs.readFileSync("exercise.json");
    let idOfExercise = JSON.parse(exercisename);
    let id = req.params.id;
    let length = idOfCourse.length;
    let eid = req.params.eid;
    let length1 = idOfExercise.length
    if (id <= length && id > 0){
        if (eid <= length1 && id > 0) {
            if (req.body.hasOwnProperty("username") && req.body.hasOwnProperty("content")){
                let file = fs.readFileSync("summission.json");
                var summissions = JSON.parse(file.toString());
                let summission = req.body;
                summission.summissionId = summissions.length+1;
                summission.courseId = id;
                summission.exerciseId = eid;
                summissions.push(summission);
                writeExerciseFile("summission.json",summissions);
                return res.json(summission);
            } else {
                return res.json({errMsg: "Aapka JSON galat hai."});
            } 
        }else {
            return res.json ({errMsg: "Apane galat id dalli hai"});
        }
        
    }else {
        return res.json({errMsg:"Aapne galat id dalli hai"});
    }  
})

// Port

const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
    console.log(`Listning on port ${PORT}`);
});
