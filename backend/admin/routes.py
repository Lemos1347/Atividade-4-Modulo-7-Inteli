from fastapi import APIRouter, HTTPException, Depends
from .controller import controller_set_admin_by_id, controller_get_all_users, controller_get_user_by_id, controller_update_user, controller_create_user, controller_delete_user
from auth.dependencies import admin_only
from pydantic import BaseModel

router = APIRouter(prefix="/admin", dependencies=[Depends(admin_only)])

class UpdateUserRequest(BaseModel):
    email: str | None = None
    name: str | None = None

class DeleteUserRequest(BaseModel):
    email: str | None = None
    id: str | None = None

class CreateUserRequest(BaseModel):
    email: str
    name: str
    password: str

@router.post('/createUser')
async def create_user(user_data: CreateUserRequest):
      return await controller_create_user(email=user_data.email, name=user_data.name, password=user_data.password)

@router.put('/set/{id}')
async def create_user(id: str):
      return await controller_set_admin_by_id(id=id)

@router.get('/all')
async def list_users():
    return await controller_get_all_users()

@router.get('/{id}')
async def get_user_by_id(id: str):
    return await controller_get_user_by_id(id=id)

@router.put('/update/{id}')
async def update_user_by_id(id: str, update_data: UpdateUserRequest):
      return await controller_update_user(update_data.model_dump(), id)

@router.delete('/delete')
async def delete_user(data: DeleteUserRequest):
      return await controller_delete_user(data=data.model_dump())