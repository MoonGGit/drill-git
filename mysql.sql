create user moong@localhost identified by 'moong';
grant all privileges on *.* to user@localhost;
grant all privileges on DB이름.* to user@localhost;
flush privileges;

show grants for moong@localhost;
show grants for current_user;

-- 비밀번호 변경
alter user 'moong'@'localhost' identified with mysql_native_password by 'moong';


show databases; use database_name;
show tables;
desc table_name;

