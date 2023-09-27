from .service import ModelService
from fastapi import HTTPException
from prisma import errors
   
async def controller_predict_customer(customer_id, user_id):
   model_service = ModelService(costumer_id=customer_id)
   try:
      predict = await model_service.predict_customer(user_id)
      return {"message": f"Value {predict} predicted for customer {customer_id}"}
   
   except errors.RecordNotFoundError:
      raise HTTPException(status_code=404, detail="Costumer not found")
   
   except Exception as e:
      raise HTTPException(status_code=500, detail=str(e))

async def controller_create_customer(data, user_id):
   print(data)
   if data["gender"].lower() not in ["female", "mulher", "feminino", "male", "homem", "masculino"]:
         raise HTTPException(status_code=404, detail="Gender not allowed")
   
   model_service = ModelService(costumer_name=data["name"], costumer_age=data["age"], costumer_gender=data["gender"], costumer_annual_income=data["annual_income"])
   try:
      costumer = await model_service.create_customer(user_id)
      return {"message": f"Costumer {costumer.name} created successfully"}
   
   except Exception as e:
      raise HTTPException(status_code=500, detail=str(e))
   
async def controller_get_customers(user_id):
   model_service = ModelService()
   try:
      costumers = await model_service.get_customers(user_id)
      return {"costumers": costumers}
   
   except Exception as e:
      raise HTTPException(status_code=500, detail=str(e))
   
async def controller_get_customer(customer_id, user_id):
   model_service = ModelService(costumer_id=customer_id)
   try:
      costumer = await model_service.get_costumer_by_id(user_id)
      return {"costumer": costumer}
   
   except Exception as e:
      raise HTTPException(status_code=500, detail=str(e))
   
async def controller_update_customer(data, customer_id, user_id):
   if data.name == None and data.gender == None and data.age == None and data.annual_income == None:
      raise HTTPException(status_code=400, detail="No data to update")
   
   for attr in list(vars(data)):
      if getattr(data, attr) is None:
            delattr(data, attr)
   
   model_service = ModelService(costumer_id=customer_id)
   try:
      costumer = await model_service.update_user_by_id(user_id, dict(data))
      return {"message": f"Costumer {costumer.name} updated successfully"}
   
   except errors.RecordNotFoundError:
      raise HTTPException(status_code=404, detail="Costumer not found")

   except Exception as e:
      raise HTTPException(status_code=500, detail=str(e))
   
async def controller_delete_customer(customer_id, user_id):
   model_service = ModelService(costumer_id=customer_id)
   try:
      costumer = await model_service.delete_customer_by_id(user_id)
      return {"message": f"Costumer {costumer.name} deleted successfully"}
   
   except errors.RecordNotFoundError:
      raise HTTPException(status_code=404, detail="Costumer not found")
   
   except Exception as e:
      raise HTTPException(status_code=500, detail=str(e))