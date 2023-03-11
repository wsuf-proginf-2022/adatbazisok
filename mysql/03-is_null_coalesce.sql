

update ecommerce.users set email = 'a@a.hu' where id = 2;

-- remove restriction from last_name: can be null
alter table ecommerce.users modify last_name varchar(50);

update ecommerce.users set last_name = NULL where id = 2;

select * from ecommerce.users;


select first_name, ifnull(email, 'email not provided') as email
from ecommerce.users;

select id, coalesce(email, last_name, first_name, 'not provided') as something
from ecommerce.users;

-- coalesce használható úgy is mint az ifnull
select first_name, coalesce(email, 'email not provided') as email
from ecommerce.users;
