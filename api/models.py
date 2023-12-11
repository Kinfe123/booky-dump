from pydantic import BaseModel

class Book(BaseModel):
    name: str
    status: str
    user_id: str
class BookUpdate(BaseModel):
    id: int
    name: str
    status: str
    user_id: str
