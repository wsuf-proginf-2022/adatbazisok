CREATE DATABASE first_database;

SHOW DATABASES;

CREATE DATABASE IF NOT EXISTS first_database;

-- comment
CREATE DATABASE `first database`;

use first_database;
-- nincs primary key, az id-t mi töltjük fel, és lehet két azonos id is
create table users (id int, name varchar(255));
show tables from first_database;
create table if not exists first_database.sales (id int, name varchar(255));


create database if not exists ecommerce;
create table if not exists ecommerce.rates (
  rental_rate int,
  id int unsigned auto_increment primary key
);

show tables from ecommerce;
describe ecommerce.rates;

insert into ecommerce.rates (rental_rate) values (100);

select * from ecommerce.rates;

insert into ecommerce.rates (rental_rate, id) values (1000, 2);


insert into ecommerce.rates
(rental_rate)
values
(11),
(22),
(33),
(44);

-- create hungarian database:
-- create database if not exists magyar character set utf8 collate utf8_hungarian_ci;

create table if not exists ecommerce.users (
  first_name varchar(50) not null,
  last_name varchar(50) not null,
  user_name varchar(50) not null,
  id int unsigned auto_increment primary key
) character set utf8 collate utf8_hungarian_ci;

insert into ecommerce.users
(first_name, last_name, user_name)
values
('Gábor', 'Kiss', 'gkiss'),
('Kovács', 'Gábor', 'kgabor');


select * from ecommerce.users;

select last_name from ecommerce.users order by last_name asc;

select last_name from ecommerce.users order by last_name desc;

select * from ecommerce.users where id > 1; 

-- 
select * from ecommerce.users where id = 1; 
select * from ecommerce.users where id != 1; 

select * from ecommerce.users where 2 = 1; 

select first_name as 'keresztnév' from ecommerce.users;
select first_name as "keresztnév" from ecommerce.users;
select first_name as `keresztnév` from ecommerce.users;


select rental_rate*1.27 as 'brutto_ar' from ecommerce.rates 

select cast(rental_rate*1.27 as int) as 'brutto_ar' from ecommerce.rates

create table if not exists ecommerce.payment(
  amount int,
  created datetime,
  id int unsigned auto_increment primary key
);

insert into ecommerce.payment (amount, created) values (1000, now());
insert into ecommerce.payment (amount, created) values (1000, curdate());
insert into ecommerce.payment (amount, created) values (1000, '2023-03-11-10:34:23');

select * from ecommerce.payment;

insert into ecommerce.payment (amount, created) values (1000, str_to_date('January/01/2019', '%M/%d/%Y'));

select * from ecommerce.payment;

SET lc_time_names = 'hu_HU';
select date_format(created, '%Y, %M %d. - %T : %f') as 'dátum' from ecommerce.payment;

-- timestamp:
select unix_timestamp(created) from ecommerce.payment;
select timestamp(created) from ecommerce.payment;

select created,
       weekday(created)+1 as dayofweek,
       quarter(created) as quarter,
       week(created) as week,
       monthname(created) as monthname
       from ecommerce.payment;

select amount from ecommerce.payment where created > '2019-01-01';

select amount from ecommerce.payment where created between '2019-01-01' and now();


select concat(first_name, ' ', last_name) as 'name' from ecommerce.users;

select concat(left(first_name, 1), left(last_name, 1)) as 'monogramm' from ecommerce.users;

-- distinct: csak egyedi értékeket ad vissza
select distinct first_name from ecommerce.users;

select count(distinct first_name) from ecommerce.users;

insert into ecommerce.users
(first_name, last_name, user_name)
values
('István', 'Kovács', 'ikovacs'),
('Katalin', 'Király', 'kkata'),
('Nóra', 'Balogh', 'nbalogh');

select * from ecommerce.users
where first_name in ('Gábor', 'István');

select * from ecommerce.users
where first_name not in ('Gábor', 'István');

select * from ecommerce.users
where last_name like 'K%';

select * from ecommerce.users
where last_name like 'Ki%';

-- like: % - bármilyen karakter helyettesíthető, bármennyiszer
select * from ecommerce.users
where last_name like 'K%i%';

-- _ egy karakter helyettesítője
select * from ecommerce.users
where last_name like 'K_s_';

select * from ecommerce.users
-- az eslő paramétere a limitnek az hogy honnan kezdődjön a lekérdezés
-- a második paramétere a limitnek az hogy hány elemet ad vissza
limit 2, 3;
