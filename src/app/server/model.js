const fs = require('fs')
const path = require('path')

class Subject {
  constructor(name, id) {
    this.name = name
    this.id = id
  }

  toJSON() {
    return {
      name: this.name,
      id: this.id
    }
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, 'subjects.json'),
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

  static async getById(id) {
    const subjects = await Subject.getAll()
    return subjects.find(subject => subject.id === +id)
  }

  async save() {
    const subjects = await Subject.getAll()
    subjects.push(this.toJSON())
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, 'subjects.json'),
        JSON.stringify(subjects),
        (err) => {
        if (err) {
          reject(err)
        } else { resolve() }
      })
    })
  }

  static async updateSubject(subject) {
    const subjects = await Subject.getAll();
    const ids = subjects.findIndex(i => i.id === subject.id);
    subjects[ids]=subject;

    return new Promise((resolve,reject)=>{
      fs.writeFile(path.join(__dirname,'subjects.json'),
        JSON.stringify(subjects), (err)=>{
          if (err) {
            reject(err)
          } else { resolve() }
        })
    })
  }

  static async deleteSubject(id) {
    let subjects = await Subject.getAll();
    let index = -1;

    for (let i = 0; i < subjects.length; i++) {
      if (subjects[i].id == id) {
        index = i;
        break;
      }
    }
    if (index > -1) {
      const subject = subjects.splice(index, 1)[0];
      subjects = JSON.stringify(subjects);
      fs.writeFileSync("subjects.json", subjects);
      return subject
    } else {
      return null
    }
  }
}
module.exports = Subject
