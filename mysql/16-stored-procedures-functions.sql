

use employees;

drop procedure if exists select_emoloyees;

delimiter $$
create procedure select_emoloyees()
begin
  select * from employees
  limit 100;
end$$
delimiter ;

call employees.select_emoloyees();
call employees.select_emoloyees;


-- stored procedure with input parameters
use employees;
drop procedure if exists emp_salary;
delimiter $$
create procedure emp_salary(in p_emp_no integer)
  begin
    select employees.first_name, employees.last_name, salaries.salary
    from salaries
    join employees using(emp_no)
    where emp_no = p_emp_no;
  end$$
delimiter ;

call employees.emp_salary(10001);

-- stored procedure with input and ountput parameters
use employees;
drop procedure if exists emp_avg_salary;
delimiter $$
--                                                                    pl 12345678.90
create procedure emp_avg_salary(in p_emp_no integer, out p_avg_salary decimal(10,2))
  begin
    select avg(salaries.salary) into p_avg_salary
    from salaries
    join employees using(emp_no)
    where emp_no = p_emp_no;
  end$$
delimiter ;

set @avg_salary = 0;
call employees.emp_avg_salary(10001, @avg_salary);
select @avg_salary;

-- stored function
-- stored procedure can have multiple output parameters, function can have only one
-- functions must return a value using return statement


use employees;
drop function if exists f_emp_avg_salary;
delimiter $$
--                                                         pl 12345678.90
create function f_emp_avg_salary(p_emp_no integer) returns decimal(10,2)
  begin
    declare v_avg_salary decimal(10,2);
    select avg(salaries.salary) into v_avg_salary
    from salaries
    join employees using(emp_no)
    where emp_no = p_emp_no;
    return v_avg_salary;
  end$$
delimiter ;

-- call stored function
select employees.f_emp_avg_salary(10001);


-- select-en belül nem lehet stored procedure-t hívni csak stored function-t

use employees;
set @v_emp_no = 10001;
select emp_no, first_name, last_name, f_emp_avg_salary(@v_emp_no) as avg_salary
from employees
where emp_no = @v_emp_no;

select @@global.max_allowed_packet;

set global max_connections = 1000;
