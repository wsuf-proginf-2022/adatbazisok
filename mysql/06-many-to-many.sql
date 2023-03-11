
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

insert into connections.students (firstname, lastname) values ('John', 'Doe');
insert into connections.students (firstname, lastname) values ('Sally', 'Smith');
insert into connections.students (firstname, lastname) values ('Karl', 'Karlson');



insert into connections.courses (coursename) values ('Java');
insert into connections.courses (coursename) values ('JavaScript');
insert into connections.courses (coursename) values ('Python');
insert into connections.courses (coursename) values ('MySQL');

insert into connections.students_courses (studentid, courseid) values (1, 1);
insert into connections.students_courses (studentid, courseid) values (2, 1);
insert into connections.students_courses (studentid, courseid) values (3, 2);

select * from connections.students_courses;
