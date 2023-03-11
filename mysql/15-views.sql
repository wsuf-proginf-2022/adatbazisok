


-- előre definiált lekérdezés amelyre később név alapján hivatkozhatunk
create or replace view employees.v_department_emp_latest_date as
select emp_no, max(from_date) as from_date, max(to_date) as to_date
from employees.dept_emp
group by emp_no
limit 10;

show create view employees.v_department_emp_latest_date;

select * from employees.v_department_emp_latest_date;

