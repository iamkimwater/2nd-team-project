// Custom errors defined here

class DatabaseError extends Error {
    constructor(message) {
      super(message)
      this.name = "DatabaseError"
    }
  }
  
  export {
    DatabaseError
  }