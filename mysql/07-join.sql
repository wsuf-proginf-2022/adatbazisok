
create table connections.students (
  studentid int not null auto_increment,
  firstname varchar(255),
  lastname varchar(255) not null,
  primary key (studentid)
);

create table connections.courses (
  courseid int not null auto_increment,
  coursename varchar(255) not null,
  primary key (courseid)
);

-- egy tanulóhoz több kurzus is tartozhat
-- egy kurzushoz több tanuló is tartozhat

create table connections.students_courses (
  studentid int not null,
  courseid int not null,
  primary key (studentid, courseid),
  foreign key (studentid) references connections.students(studentid),
  foreign key (courseid) references connections.courses(courseid)
);

select * from connections.students;
select * from connections.courses;
select * from connections.students_courses;
use connections;
select students.firstname, students.lastname, courses.coursename from students_courses
join students using(studentid)
join courses using(courseid);


-- melyik kurzusra nem jelentkezett egyetlen tanuló sem?
select * from connections.students_courses;
use connections;
select coursename, courseid from courses
left join students_courses using(courseid)
where studentid is null;


-- ugyanez csak right join-al
use connections;
select coursename, courseid from students_courses
right join courses using(courseid)
where studentid is null;


use connections;
select coursename, courses.courseid from students_courses
right join courses on students_courses.courseid = courses.courseid
where studentid is null;

use connections;
select a.coursename, a.courseid from students_courses as b
right join courses as a on b.courseid = a.courseid
where studentid is null;
