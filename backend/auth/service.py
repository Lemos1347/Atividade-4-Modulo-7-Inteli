from __init__ import db
from prisma import Prisma, errors
from contextlib import asynccontextmanager
import bcrypt
from datetime import datetime, timedelta
import jwt
import os

class AuthService:
   def __init__(self, email, password):
      self.email = email
      self.password = password

   @asynccontextmanager
   async def database_connection(self):
      self.db = db
      await self.db.connect()
      try:
         yield
      finally:
         await self.db.disconnect()
   
   async def login(self) -> Prisma.user:
      async with self.database_connection():
         user = await self.db.user.find_unique_or_raise(
            where={
               "email": self.email
            },
         )
         if self.check_password(user.password):
            return self.create_jwt({"id": user.id})
         return False
   
   def check_password(self, password) -> bool:
      if bcrypt.checkpw(self.password.encode('utf-8'), password.encode('utf-8')):
         return True
      else:
         return False
   
   def create_jwt(self, data_to_encode) -> str:
      expire_date = datetime.utcnow() + timedelta(minutes=120)

      to_encode = data_to_encode.copy()

      to_encode.update({"exp": expire_date})

      encoded_jwt = jwt.encode(to_encode, os.environ.get("SECRET_KEY"), algorithm=os.environ.get("ALGORITHM"))

      return encoded_jwt
