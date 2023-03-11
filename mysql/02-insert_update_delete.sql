
update ecommerce.users set user_name = 'Johny';

select * from ecommerce.users;

update ecommerce.users set user_name = 'Tommy' where id = 1;

update ecommerce.users set user_name = 'Tommy', last_name = 'Smith' where id = 1;

delete from ecommerce.users where id = 1;

-- add new column to the users table
alter table ecommerce.users add column email varchar(255);

-- make email column unique
alter table ecommerce.users add unique (email);

-- a tábla összes rekordjának ürítése
truncate ecommerce.users;

-- a tábla törlése
drop table ecommerce.users;

-- az adatbázis törlése
drop database ecommerce;
