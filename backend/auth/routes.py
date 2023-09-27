from fastapi import APIRouter
from .controller import controller_login
from pydantic import BaseModel

router = APIRouter(prefix="/auth")

class LoginAuthRequest(BaseModel):
    email: str
    password: str

@router.post('/login')
async def login(login_data: LoginAuthRequest):
      return await controller_login(login_data)