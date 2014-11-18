create table user_access (
    user_access_id serial primary key not null, 
    access_datetime timestamp not null,
    ip_address varchar null,    
    method varchar(6) not null,
    url varchar not null,
    query_string varchar null,
    body varchar null   
)

create table app_user 
(
  app_user_id serial primary key NOT NULL,
  first_name varchar NOT NULL,
  last_name varchar NOT NULL,
  email varchar UNIQUE NOT NULL,
  password varchar NOT NULL,
  created_datetime timestamp without time zone NOT NULL,    
)
