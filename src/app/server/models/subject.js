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
}

module.exports = Subject
