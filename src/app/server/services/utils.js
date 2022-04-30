const fs = require('fs')
const path = require('path')

exports.getAll = function () {
      return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '../data/subjects.json'),
        'utf-8', (err, content) => {
          if (err) {
            reject(err)
          } else {
            resolve(JSON.parse(content))
          }
        }
      )
    })
}

exports.getById = async function (id) {
  console.log('sss')
    const subjects = await this.getAll()
  console.log('www')
    return subjects.find(subject => subject.id === id)
}

exports.save = async function(subject) {
   const subjects = await this.getAll()
    subjects.push(subject.toJSON())
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '../data/subjects.json'),
        JSON.stringify(subjects),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
    })
}

exports.update = async function(subject) {
  const subjects = await this.getAll();
    const ids = subjects.findIndex(i => i.id === subject.id);
    subjects[ids] = subject;

    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, '../data/subjects.json'),
        JSON.stringify(subjects), (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
    })
}

exports.delete = async function(id) {
  let subjects = await this.getAll();
  let index = -1;

  for (let i = 0; i < subjects.length; i++) {
    if (subjects[i].id === id) {
      index = i;
      break;
    }
  }

  if (index > -1) {
    const subject = subjects.splice(index, 1)[0];
    subjects = JSON.stringify(subjects);
    fs.writeFileSync(path.join(__dirname, '../data/subjects.json'), subjects);
    return subject
  } else {
    return null
  }
}
