from fastapi import APIRouter, Depends
from .controller import controller_delete_user, controller_get_user_by_id, controller_update_user
from auth.dependencies import get_jwt_payload
from pydantic import BaseModel

router = APIRouter(prefix="/user")
class DeleteUserRequest(BaseModel):
    email: str | None = None
    id: str | None = None

class UpdateUserRequest(BaseModel):
    email: str | None = None
    name: str | None = None

@router.get('/')
async def get_user_by_id(payload: dict = Depends(get_jwt_payload)):
    return await controller_get_user_by_id(id=payload.get("id"))

@router.put('/update')
async def update_user(update_data: UpdateUserRequest, payload: dict = Depends(get_jwt_payload)):
      return await controller_update_user(update_data.model_dump(), payload.get("id"))

@router.delete('/delete')
async def delete_user(payload: dict = Depends(get_jwt_payload)):
      return await controller_delete_user(id=payload.get("id"))