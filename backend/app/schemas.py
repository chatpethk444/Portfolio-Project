from pydantic import BaseModel, Field

class Project(BaseModel):
    id: int | str | None = None
    title: str
    category: str | None = None
    short_desc: str | None = None
    full_desc: str | None = None
    images: list[str] = Field(default_factory=list)
    tech_stack: list[str] = Field(default_factory=list)
    features: list[str] = Field(default_factory=list)
    github_url: str | None = None
    demo_url: str | None = None
    canva_url: str | None = None

class Certificate(BaseModel):
    id: int | str | None = None
    name: str
    description: str | None = None
    img_url: str | None = None

class HealthResponse(BaseModel):
    status: str
    database: str
