from __init__ import db
from prisma import Prisma, errors
from contextlib import asynccontextmanager
import pandas as pd
from joblib import load

model = load('model/modelo_regressao.joblib')

class ModelService: 
      def __init__(self, costumer_name="", costumer_gender="", costumer_age="", costumer_annual_income="", costumer_id="", prediction_id=""):
         self.costumer_name = costumer_name
         self.costumer_gender = costumer_gender
         self.costumer_id = costumer_id
         self.costumer_age = costumer_age
         self.costumer_annual_income = costumer_annual_income
         self.prediction_id = prediction_id

      @asynccontextmanager
      async def database_connection(self):
        self.db = db
        await self.db.connect()
        try:
            yield
        finally:
            await self.db.disconnect()
      
      async def create_customer(self, user_id):
         async with self.database_connection():
            costumer = await self.db.customer.create(
                data={
                    "name": self.costumer_name,
                    "gender": self.costumer_gender,
                    "age": self.costumer_age,
                    "annual_income": self.costumer_annual_income,
                    "userId": user_id
                })
            return costumer
      
      async def get_customers(self, user_id):
         async with self.database_connection():
            costumers = await self.db.customer.find_many(
               where={
                  "userId": user_id
               }
            )
            return costumers
      
      async def get_costumer_by_id(self, user_id):
         async with self.database_connection():
            costumer = await self.db.customer.find_first_or_raise(
               where={
                  "id": self.costumer_id,
                  "userId": user_id
               },
               include={
                  "Prediction": True
               }
            )
            return costumer
         
      async def predict_customer(self, user_id):
         data_to_predict = {}
         costumer = await self.get_costumer_by_id(user_id)

         if costumer.gender.lower() in ["female", "mulher", "feminino"]:
            data_to_predict["gender"] = 0
         elif costumer.gender.lower() in ["male", "homem", "masculino"]:
            data_to_predict["gender"] = 1

         data_to_predict["age"] = costumer.age
         data_to_predict["annual_income"] = costumer.annual_income

         input_data = pd.DataFrame([data_to_predict])

         prediction = model.predict(input_data)

         async with self.database_connection():
            await self.db.prediction.create(
               data={
                  "predicted": prediction[0],
                  "userId": self.costumer_id
               }
            )

         return prediction[0]
      
      async def update_user_by_id(self, user_id, update_data) -> Prisma.user:
         async with self.database_connection():

            await self.db.customer.find_first_or_raise(
               where={
                  "id": self.costumer_id,
                  "userId": user_id
               },
            )
            update_user = await self.db.customer.update(
               where={
                  "id": self.costumer_id,
               },
               data={
                  **update_data
               }
            )

            return update_user        
         

      async def delete_customer_by_id(self, userId) -> Prisma.user:
         async with self.database_connection():
            await self.db.customer.find_first_or_raise(
               where={
                  "id": self.costumer_id,
                  "userId": userId
               },
            )
         
            return await self.db.customer.delete(
               where={
                  "id": self.costumer_id
               }
            )