CREATE TABLE IF NOT EXISTS auth_user (
  id serial NOT NULL,
  email varchar(100) NOT NULL,
  password varchar(100) NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
)
CREATE TABLE IF NOT EXISTS wallet_balance (
  id serial NOT NULL,
  user_id int NOT NULL,
  amount decimal(10,2) NOT NULL,
  created_at timestamp DEFAULT NULL,
  updated_at timestamp DEFAULT NULL,
  PRIMARY KEY (id)
) 


CREATE TABLE IF NOT EXISTS wallet_movemen (
  id serial NOT NULL,
  user_id int NOT NULL,
  type smallint NOT NULL,
  amount decimal(10,2) NOT NULL,
  created_at timestamp DEFAULT NULL,
  updated_at timestamp DEFAULT NULL
) 


CREATE TABLE IF NOT EXISTS wallet_subscription (
  id serial NOT NULL,
  user_id int NOT NULL,
  code varchar(20) NOT NULL,
  amount decimal(10,2) NOT NULL,
  cron varchar(50) NOT NULL,
  created_at timestamp DEFAULT NULL,
  updated_at timestamp DEFAULT NULL,
  PRIMARY KEY (id)
) 

INSERT INTO auth_user (email, password, created_at, updated_at) VALUES
	('eduardo@kodoti.com', 'jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=', '2020-07-09 00:36:13', NULL);