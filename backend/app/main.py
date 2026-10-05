from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.router import api_router

app = FastAPI(title="API America Prime", version="1.0.0")

# Configuración de CORS front
origins = [
    "http://localhost:5173",  # port default vite
    "http://127.0.0.1:5173",
    "https://proyecto-america-prime.vercel.app", # front vercel
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir las rutas de la API
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "API America Prime funcionando"}