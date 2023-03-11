
select first_name
from sakila.actor
group by first_name;

select distinct first_name
from sakila.actor;

select first_name, count(first_name)
from sakila.actor
group by first_name;

select first_name, count(first_name)
from sakila.actor
group by first_name
order by first_name desc;

select title 
from sakila.film
where release_year = 2006;


-- a where nem használható aggregációs függvényekkel
select first_name, count(first_name) as name_count
from sakila.actor
where first_name like 'J%'
group by first_name
having count(first_name) > 3;

