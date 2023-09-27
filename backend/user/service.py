from __init__ import db
from prisma import Prisma
from contextlib import asynccontextmanager

class UserService: 
      def __init__(self, email="", name="", password="", id=""):
         self.email = email
         self.name = name
         self.password = password
         self.id = id

      @asynccontextmanager
      async def database_connection(self):
        self.db = db
        await self.db.connect()
        try:
            yield
        finally:
            await self.db.disconnect()
      
      async def get_user_by_id(self):
         async with self.database_connection():
            user = await self.db.user.find_unique_or_raise(
               where={
                  "id": self.id
               },
               include={
                  "Customer": {"include": {"Prediction": True}}
               }
            )
            return user
      
      async def update_user_by_id(self, update_data) -> Prisma.user:
         async with self.database_connection():

            await self.db.user.find_unique_or_raise(
               where={
                  "id": self.id
               },
            )
            update_user = await self.db.user.update(
               where={
                  "id": self.id
               },
               data={
                  **update_data
               }
            )

            return update_user        
         

      async def delete_user(self) -> Prisma.user:
         async with self.database_connection():
            await self.db.user.find_unique_or_raise(
               where={
                  "id": self.id
               },
            )
         
            return await self.db.user.delete(
               where={
                  "id": self.id
               }
            )