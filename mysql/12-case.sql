


select emp_no, first_name, last_name,
case
  when gender = 'M' then 'Male'
  else 'Female'
end
as gender
from employees.employees
limit 20;

-- készítsünk kimutatást a managerek fizetés emeléséről
select emp_no, first_name, last_name,
  max(salaries.salary) - min(salaries.salary) as salary_difference,
  case 
    when max(salaries.salary) - min(salaries.salary) > 30000 then 'Salary was increased by more than $30 000'
    when max(salaries.salary) - min(salaries.salary) between 20000 and 30000 then 'Salary was raised by more than $20 000 but less then $30 000'
    else 'Salary was raised by less than $20 000'
  end
    as salary_increase
from employees.dept_manager
join employees.salaries using (emp_no)
join employees.employees using (emp_no)
group by emp_no;

