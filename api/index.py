from fastapi import FastAPI

app = FastAPI()

@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}

@app.get("/api/hellow")
def hellow():
   
    return {"Message" : "Never say never"}