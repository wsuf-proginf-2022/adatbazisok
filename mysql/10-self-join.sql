

create table ecommerce.employee (
    employee_id int auto_increment,
    name varchar(50) not null,
    manager_id int,
    primary key (employee_id)
);

insert into ecommerce.employee
(employee_id, name, manager_id)
values
(1, 'Mike', 3),
(2, 'John', 3),
(3, 'Mary', 4),
(4, 'Jane', null);

select * from ecommerce.employee;

select e1.name as employee_name, e2.name as manager_name
from ecommerce.employee e1
join ecommerce.employee e2
on e1.manager_id = e2.employee_id;

select e1.name as employee_name, ifnull(e2.name, 'Top Manager') as manager_name
from ecommerce.employee e1
left join ecommerce.employee e2
on e1.manager_id = e2.employee_id;

