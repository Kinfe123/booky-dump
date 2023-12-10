from pydantic import BaseModel

class Book(BaseModel):
    name: str
    status: str
    url: str
    