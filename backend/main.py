from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import usuarios, productos, ordenes, recepciones, lotes, movimientos

app = FastAPI(
    title="API America Prime"
)

# permite solicitudes desde front (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# routers de cada módulo
app.include_router(usuarios.router, prefix="/api")
app.include_router(productos.router, prefix="/api")
app.include_router(ordenes.router, prefix="/api")
app.include_router(recepciones.router, prefix="/api")
app.include_router(lotes.router, prefix="/api")
app.include_router(movimientos.router, prefix="/api")

@app.get("/")
def root():
    return {"status": "ok", "message": "API funcionando correctamente"}