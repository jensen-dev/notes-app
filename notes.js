const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    const notes = loadNotes();

    console.log(chalk.inverse('Your notes'))
    notes.forEach(note => {
        console.log(note.title);
    });
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
 
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.inverse.green('New note added'))
    }else {
        console.log(chalk.inverse.red('Note title taken!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataString = dataBuffer.toString()
        const dataJSON = JSON.parse(dataString)
        return dataJSON
    }catch(e) {
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    
    if (notesToKeep.length !== notes.length) {
        saveNotes(notesToKeep)
        const greenMsg = chalk.bgGreen('Note removed!')
        console.log(greenMsg)
    }else {
        const redMsg = chalk.bgRed('No note found!')
        console.log(redMsg)
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    
    if (note) {
        console.log(chalk.blue.inverse('Note title: ', note.title))
        console.log('Note body: ', note.body)
    }else {
        console.log(chalk.red('No note found'))
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote
}