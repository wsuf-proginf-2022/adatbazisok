
use employees;
delimiter $$

create trigger before_salaries_insert
before insert on salaries
for each row
begin
  if new.salary < 0 then
    set new.salary = 0;
  end if;
end$$

delimiter ;

select * from employees.salaries
where emp_no = 10001;

insert into employees.salaries (emp_no, salary, from_date, to_date)
values (10001, -100, '2222-02-22', '3333-03-03');

use employees;
delimiter $$
create trigger before_salaries_update
before update on salaries
for each row
begin
  if new.salary < 0 then
    set new.salary = old.salary;
  end if;
end$$

delimiter ;


update employees.salaries
set salary = -100
where emp_no = 10001;

select trigger_schema, trigger_name
from information_schema.triggers
where trigger_schema = 'employees';
