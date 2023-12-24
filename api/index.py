import os
from dotenv import load_dotenv
from fastapi import FastAPI
from supabase import Client , create_client
from pydantic import BaseModel
from api.models import Book , BookUpdate

load_dotenv()




#Supbase configs for creatign supabase client 
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
# print('The supabase configs are: ' , supabase_key , supabase_url)
supabase = create_client(supabase_url, supabase_key)


app = FastAPI()
@app.get("/api/books")
def fetch_books():
    res = supabase.table('books').select("*").execute()
    return res.data

@app.get("/api/users")
def fetch_users():
    res = supabase.table('users').select('*').execute()
    return res.data
@app.post("/api/books")
def create_books(book: Book):
    name , status , user_id = book.name , book.status , book.user_id
    print(name , status, user_id)
    res = supabase.from_('books').insert({"name" : name  , "status": status , "user_id": user_id }).execute()
   
    return res.data
@app.put("/api/books")
def update_book(book: BookUpdate):

    id_ , name , status , user_id = book.id , book.name , book.status ,book.user_id
    res = supabase.from_('books').update({"name": name , 'status': status , 'user_id': user_id}).eq("id" , id_).execute()
    return res.data
@app.delete('/api/books')
def delete_book(book: BookUpdate):
      id_ , name , status , user_id = book.id , book.name , book.status ,book.user_id
      print("Hello world" , id_)
      res = supabase.from_('books').delete().eq('id' , id_).execute()
      return res.data




    
   
@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}
@app.get("/api/hellow")
def hellow():
    return {"Message" : "Never say never"}