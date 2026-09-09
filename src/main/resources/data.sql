-- 유저
insert into roles(name) values('ROLE_USER');
insert into roles(name) values('ROLE_ADMIN');

insert into users(email, created_date, modified_date, nickname, password) values("aaaa@aaaa.com", "2022-06-01 00:00:00", "2022-06-01 00:00:00", "같공", "$2a$10$.mkPounQ.21xk7YLmY7me.A8QmLtx1lfdv.l1b3OfUNfI27.QU0YW");
insert into users(email, created_date, modified_date, nickname, password) values("user2@example.com", "2022-06-01 00:00:00", "2022-06-01 00:00:00", "찬찬", "$2a$10$.mkPounQ.21xk7YLmY7me.A8QmLtx1lfdv.l1b3OfUNfI27.QU0YW");
insert into users(email, created_date, modified_date, nickname, password) values("user3@example.com", "2022-06-01 00:00:00", "2022-06-01 00:00:00", "민민", "$2a$10$.mkPounQ.21xk7YLmY7me.A8QmLtx1lfdv.l1b3OfUNfI27.QU0YW");
insert into users(email, created_date, modified_date, nickname, password) values("bbbb@bbbb.com", "2022-05-25 00:00:00", "2022-05-25 00:00:00", "hah", "$2a$10$SF8DLsuB42mCZ6IwagbuZeTWWSejLc7MQf1E9xG5Xqmb6ScmQG1oG");
insert into users(email, created_date, modified_date, nickname, password) values("cccc@cccc.com", "2022-06-01 00:00:00", "2022-06-01 00:00:00", "진진", "$2a$10$SF8DLsuB42mCZ6IwagbuZeTWWSejLc7MQf1E9xG5Xqmb6ScmQG1oG");
insert into users(email, created_date, modified_date, nickname, password) values("dddd@dddd.com", "2022-06-01 00:00:00", "2022-06-01 00:00:00", "신주", "$2a$10$SF8DLsuB42mCZ6IwagbuZeTWWSejLc7MQf1E9xG5Xqmb6ScmQG1oG");
insert into users(email, created_date, modified_date, nickname, password) values("eeee@eeee.com", "2022-06-01 00:00:00", "2022-06-01 00:00:00", "구주", "$2a$10$SF8DLsuB42mCZ6IwagbuZeTWWSejLc7MQf1E9xG5Xqmb6ScmQG1oG");

-- 레코드
insert into record (id, created_date, modified_date, continuity, max_continuity, user_id) values (1, "2022-06-01 00:00:00", "2022-06-01 00:00:00", 0, 0, 1);
insert into record (id, created_date, modified_date, continuity, max_continuity, user_id) values (2, "2022-06-01 00:00:00", "2022-06-01 00:00:00", 0, 0, 2);
insert into record (id, created_date, modified_date, continuity, max_continuity, user_id) values (3, "2022-06-01 00:00:00", "2022-06-01 00:00:00", 0, 0, 3);
insert into record (id, created_date, modified_date, continuity, max_continuity, user_id) values (4, "2022-05-25 00:00:00", "2022-05-25 00:00:00", 0, 0, 4);
insert into record (id, created_date, modified_date, continuity, max_continuity, user_id) values (5, "2022-06-01 00:00:00", "2022-06-01 00:00:00", 0, 0, 5);
insert into record (id, created_date, modified_date, continuity, max_continuity, user_id) values (6, "2022-06-01 00:00:00", "2022-06-01 00:00:00", 0, 0, 6);
insert into record (id, created_date, modified_date, continuity, max_continuity, user_id) values (7, "2022-06-01 00:00:00", "2022-06-01 00:00:00", 0, 0, 7);




-- 뱃지
insert into achievements (id, title, description, needs_count) values (1, 'pillgood', '첫 로그인', 0);
insert into achievements (id, title, description, needs_count) values (2, 'supplements_count', '영양제 1개 등록', 1);
insert into achievements (id, title, description, needs_count) values (3, 'max_continuity', '연속일수 3일', 3);