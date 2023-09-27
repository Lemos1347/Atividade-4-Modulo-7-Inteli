from fastapi import APIRouter, Depends, HTTPException
from .controller import controller_predict_customer, controller_create_customer, controller_get_customers, controller_get_customer, controller_update_customer,controller_delete_customer
from pydantic import BaseModel
from auth.dependencies import get_jwt_payload

router = APIRouter(prefix="/model")

class Customer(BaseModel):
     name: str       
     gender: str 
     age: int        
     annual_income: int

class UpdateCustomer(BaseModel):
     name: str | None = None      
     gender: str | None = None
     age: int | None = None       
     annual_income: int | None = None

@router.get('/predict/{customer_id}')
async def predict(customer_id: str, payload: dict = Depends(get_jwt_payload)):
    return await controller_predict_customer(customer_id, payload.get("id"))


@router.post('/create_customer')
async def create_customer(data: Customer, payload: dict = Depends(get_jwt_payload)):
      return await controller_create_customer(dict(data), payload.get("id"))

@router.get('/customers')
async def get_customers(payload: dict = Depends(get_jwt_payload)):
      return await controller_get_customers(payload.get("id"))

@router.get('/customer/{customer_id}')
async def get_customer(customer_id: str, payload: dict = Depends(get_jwt_payload)):
      return await controller_get_customer(customer_id, payload.get("id"))

@router.put('/customer/{customer_id}')
async def update_customer(data: UpdateCustomer, customer_id: str, payload: dict = Depends(get_jwt_payload)):
      return await controller_update_customer(data, customer_id, payload.get("id"))

@router.delete('/customer/{customer_id}')
async def delete_customer(customer_id: str, payload: dict = Depends(get_jwt_payload)):
      return await controller_delete_customer(customer_id, payload.get("id"))


    # Convertendo o gênero de string para 0 ou 1
   # if data.gender.lower() in ["female", "mulher", "feminino"]:
   #    data.gender = 0
   # elif data.gender.lower() in ["male", "homem", "masculino"]:
   #    data.gender = 1
   # else:
   #    raise HTTPException(status_code=400, detail="Gênero inválido. Por favor, use 'male'/'homem' ou 'female'/'mulher'.")
   # try:     
   #      # Convertendo dados para DataFrame
   #      input_data = pd.DataFrame([dict(data)])
        
   #      # Realizando previsão
   #      prediction = model.predict(input_data)
        
   #      return {"predicted_spending_score": prediction[0]}
   # except:
   #      raise HTTPException(status_code=400, detail="Error in prediction.")