

select * from employees.employees
where hire_date > '1998-01-01';

create index i_hire_date on employees.employees(hire_date);


show index from employees.employees;

select * from employees.employees
where first_name = 'Georgi' and last_name = 'Facello';

create index i_first_name on employees.employees(first_name, last_name);

