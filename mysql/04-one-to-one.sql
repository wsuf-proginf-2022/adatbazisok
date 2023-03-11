

create database if not exists connections;

-- one to one relationship

create table if not exists connections.users (
    id int not null auto_increment,
    user_name varchar(255) not null,
    primary key (id)
);

create table if not exists connections.accounts (
    user_id int unique not null,
    id int not null auto_increment,
    account_name varchar(255) not null,
    primary key (id),
    foreign key (user_id) references connections.users(id)
);

insert into connections.users (user_name) values ('user1');

insert into connections.accounts (user_id, account_name) values (1, 'account1');

-- 1 usernek csak 1 accountja lehet
select * from connections.accounts;
