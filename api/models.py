from pydantic import BaseModel

class Book(BaseModel):
    name: str
    selectedStatus: str
    user_id: str
    