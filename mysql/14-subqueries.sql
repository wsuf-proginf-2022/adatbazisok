
-- keressük meg azokat a vásárlókat (customer) akik akciófilmet béreltek

select distinct first_name, last_name  from sakila.customer
join sakila.rental using (customer_id)
join sakila.inventory using (inventory_id)
join sakila.film using (film_id)
join sakila.film_category using (film_id)
join sakila.category using (category_id)
where category.name = 'Action';


use sakila;
select customer.customer_id, customer.first_name, customer.last_name
from customer
where customer.customer_id in (

select rental.customer_id
from rental
where rental.inventory_id in (

select inventory.inventory_id
from inventory
where inventory.film_id in (

select film_category.film_id
from film_category
where film_category.category_id in (

select category.category_id
from sakila.category
where category.name = 'Action'
))));
