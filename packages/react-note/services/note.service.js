export class NoteService {
  
  
  constructor({ retrieveAuthToken, createNoteUrl, editNoteUrl, deleteNoteUrl }){
    this.retrieveAuthToken = retrieveAuthToken;
    this.createNoteUrl = createNoteUrl;
    this.editNoteUrl = editNoteUrl;
    this.deleteNoteUrl = deleteNoteUrl;
  };

  //   /api/jobapp/:jobAppId/note/create
  async createNote({ content, jobAppId }){
    const url = this.createNoteUrl.replace(/\/:\w+\//, `/${jobAppId}/`);
    const body = { content };
    try {
      const res = await fetch(url, {
        headers: {
          authorization: `Bearer ${this.retrieveAuthToken()}`,
          'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(body)
      });
      const json = await res.json();
      if(json.error){
        throw new Error(json.error.message);
      }
      return json;
    } catch (err) {
      throw err;
    }
  }

  //   /api/jobapp/:jobAppId/note/:noteId/edit
  async editNote({ content, jobAppId, noteId }){
    const url = this.editNoteUrl.replace(/\/:\w+\//, `${jobAppId}/`).replace(/\/:\w+\//, `${noteId}/`);
    const body = { content };
    try {
      const res = await fetch(url, {
        headers: {
          authorization: `Bearer ${this.retrieveAuthToken()}`,
          'Content-Type': 'application/json'
        },
        method: 'put',
        body: JSON.stringify(body)
      });
      const json = await res.json();
      if(json.error){
        throw new Error(json.error.message);
      }
      return json;
    } catch (err) {
      throw err;
    }
  }

  //   /api/jobapp/:jobAppId/note/:noteId/delete
  async deleteNote({ jobAppId, noteId }){
    const url = this.deleteNoteUrl.replace(/\/:\w+\//, `${jobAppId}/`).replace(/\/:\w+\//, `${noteId}/`);
    try {
      const res = await fetch(url, {
        headers: {
          authorization: `Bearer ${this.retrieveAuthToken()}`,
        },
        method: 'delete',
      });
      const json = await res.json();
      if(json.error){
        throw new Error(json.error.message);
      }
      return json;
    } catch (err) {
      throw err;
    }
  }

}