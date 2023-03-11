

show tables from sakila;
select * from sakila.category;


-- hány ember bérelt ki Action kategóriába tartozó filmeket?
select count(distinct customer_id) from sakila.customer
join sakila.rental using (customer_id)
join sakila.inventory using (inventory_id)
join sakila.film using (film_id)
join sakila.film_category using (film_id)
join sakila.category using (category_id)
where category.name = 'Action';
