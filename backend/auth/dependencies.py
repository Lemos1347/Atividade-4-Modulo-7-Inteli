from __init__ import db
from fastapi import Depends, HTTPException, Request
from jwt.exceptions import InvalidTokenError
import jwt
import os

def get_jwt_token(request: Request) -> str:
    try:
        authorization: str = request.headers.get("Authorization", "")
        token_prefix, token = authorization.split(" ")
        if token_prefix.lower() != "bearer":
            raise HTTPException(status_code=403, detail="Not authenticated")
        return token
    except:
        raise HTTPException(status_code=403, detail="Not authenticated")

def get_jwt_payload(token: str = Depends(get_jwt_token)) -> dict:
    try:
        payload = jwt.decode(token, os.environ.get("SECRET_KEY"), algorithms=[os.environ.get("ALGORITHM")])
    except InvalidTokenError:
        raise HTTPException(status_code=403, detail="Invalid token")
    return payload

async def admin_only(payload: dict = Depends(get_jwt_payload)) -> dict:
    if payload.get("id") == "":
        raise HTTPException(status_code=403, detail="Not authorized")
    await db.connect()

    user = await db.user.find_unique_or_raise(where={"id": payload.get("id")})

    await db.disconnect()

    if "ADMIN" in user.role:
        return payload
    
    raise HTTPException(status_code=403, detail="Not authorized")
