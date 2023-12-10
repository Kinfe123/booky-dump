from fastapi import FastAPI
from supabase import Client , create_client

supabase_url="https://lwbrieedpabydhggagss.supabase.co"
supabase_key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3YnJpZWVkcGFieWRoZ2dhZ3NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIwNzU0NTIsImV4cCI6MjAxNzY1MTQ1Mn0.7Yu5NacEbQmRaeNfA0btLo0qdkooXHuSxF_vE8KRg14"
supabase = create_client(supabase_url, supabase_key)


app = FastAPI()
@app.get("/api/books")
def check_db():
    res = supabase.table('books').select("*").execute()
   
    return res.data

@app.get("/api/users")
def fetch_users():
    res = supabase.table('users').select('*').execute()
    return res.data


@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}

@app.get("/api/hellow")
def hellow():
   
    return {"Message" : "Never say never"}