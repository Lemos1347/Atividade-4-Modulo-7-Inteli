from fastapi import FastAPI
import uvicorn
from user.routes import router as UserRouter
from admin.routes import router as AdminRouter
from auth.routes import router as AuthRouter
from model.routes import router as ModelRouter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(UserRouter)
app.include_router(AdminRouter)
app.include_router(AuthRouter)
app.include_router(ModelRouter)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3001)