from .service import AuthService
from fastapi import HTTPException
from prisma import errors

async def controller_login(data):
   auth_service = AuthService(email=data.email, password=data.password)
   try:
      token = await auth_service.login()
      return {"message": "Login successful", "access_token": token}
   
   except errors.RecordNotFoundError:
      raise HTTPException(status_code=404, detail="User not found")

   except ValueError:
      raise HTTPException(status_code=401, detail="Wrong password")
   
   except Exception as e:
      raise HTTPException(status_code=500, detail=str(e))