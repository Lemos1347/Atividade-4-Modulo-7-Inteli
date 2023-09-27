from .service import AdminService
from fastapi import HTTPException
from prisma import errors

async def controller_create_user(email: str, name: str, password: str) -> dict:
   user = AdminService(email=email, name=name, password=password)
   try:
      new_user = await user.create_user()
      return {"message": f"User {new_user.name} created successfully"}
   
   except NameError:
      raise HTTPException(status_code=404, detail="User already exists")
   
   except Exception as e:
      raise HTTPException(status_code=500, detail=str(e))

async def controller_set_admin_by_id(id: str):
   adminService = AdminService(id=id)

   try: 
      user_updated = await adminService.set_admin_by_id()

      if user_updated:
         return {"message": f"{user_updated.name} is now an admin!"}
   
   except errors.RecordNotFoundError:
      raise HTTPException(status_code=404, detail="User not found")
   
   except Exception as e:
      raise HTTPException(status_code=500, detail=str(e))

async def controller_get_all_users() -> dict:
   userService = AdminService()
   try:
      users = await userService.get_all_users()
      return {"users": users}
   except Exception as e:
      raise HTTPException(status_code=500, detail=str(e))

async def controller_get_user_by_id(id: int) -> dict:
   if id == "": 
      raise HTTPException(status_code=400, detail="Invalid parameters")
   
   userService = AdminService(id=id)
   try:
      user = await userService.get_user_by_id()
      return {"user": user}
   
   except errors.RecordNotFoundError:
      raise HTTPException(status_code=404, detail="User not found")
   
   except Exception as e:
      raise HTTPException(status_code=500, detail=str(e))

async def controller_update_user(update_data: dict, id) -> dict:
   checked_data = {k: v for k, v in update_data.items() if v is not None}
   if checked_data == {}:
      raise HTTPException(status_code=400, detail="Invalid parameters")
   
   userService = AdminService(id=id)
   try:
      updated_user = await userService.update_user_by_id(checked_data)
      return {"message": f"User {updated_user.name} updated successfully"}
   
   except errors.RecordNotFoundError:
      raise HTTPException(status_code=404, detail="User not found")
   
   except Exception as e:
      raise HTTPException(status_code=500, detail=str(e))
   
async def controller_delete_user(data):
   checked_data = {k: v for k, v in data.items() if v is not None}

   if checked_data == {}:
      raise HTTPException(status_code=400, detail="Invalid parameters")
   
   userService = AdminService()
   try:
      deleted_user = await userService.delete_user(checked_data)
      return {"message": f"User {deleted_user.name} deleted successfully"}

   except HTTPException:
       raise HTTPException(status_code=400, detail="Invalid parameters")

   except errors.RecordNotFoundError:
      raise HTTPException(status_code=404, detail="User not found")
   
   except Exception as e:
      raise HTTPException(status_code=500, detail=str(e))