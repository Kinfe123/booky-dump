from fastapi import FastAPI
from supabase import Client , create_client
from pydantic import BaseModel
from api.models import Book , BookUpdate
supabase_url="https://lwbrieedpabydhggagss.supabase.co"
supabase_key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3YnJpZWVkcGFieWRoZ2dhZ3NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIwNzU0NTIsImV4cCI6MjAxNzY1MTQ1Mn0.7Yu5NacEbQmRaeNfA0btLo0qdkooXHuSxF_vE8KRg14"
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