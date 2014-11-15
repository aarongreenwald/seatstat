create table user_access (
    user_access_id serial primary key not null, 
    access_datetime timestamp not null,
    ip_address varchar null,    
    method varchar(6) not null,
    url varchar not null,
    query_string varchar null,
    body varchar null   
)
