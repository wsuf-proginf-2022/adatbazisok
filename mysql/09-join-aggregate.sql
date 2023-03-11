
-- mennyi az álagfizetése az összes munkavállalónak?
select avg(employees.salaries.salary) as avg_salary
from employees.employees
join employees.salaries using(emp_no);

-- mennyi az álagfizetése a nőknek és a férfiaknak?
-- valamilyen aggregációs fügvényt kell használni ha group by-t használunk
select employees.gender, avg(employees.salaries.salary) as avg_salary
from employees.employees
join employees.salaries using(emp_no)
group by gender;
