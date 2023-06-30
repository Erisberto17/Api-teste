create schema api;

create table api_crud(
    id serial primary key,
    nome varchar(50),
    email text not null,
    senha varchar(64),
    created_at TIMESTAMP DEFAULT current_timestamp
)