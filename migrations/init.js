import connection from '../Infrastructure/mysql-connector';

const up = () => {
  connection.execute(
    `CREATE TABLE receiver_view (
        id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        receiver varchar(255) NOT NULL,
        amount int(11) NOT NULL DEFAULT '0',
        created datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        modified datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY id (id)
      ) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
  );
  connection.execute(
    `CREATE TABLE reward (
        id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        receiver varchar(255) NOT NULL,
        giver varchar(255) NOT NULL,
        amount int(11) NOT NULL,
        created datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY id (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
  );
  connection.execute(
    'CREATE TABLE `giver_view` (`id` serial,`giver` varchar(255) NOT NULL, `amount` int NOT NULL DEFAULT 0, `created` datetime NOT NULL DEFAULT NOW(),`modified` datetime NOT NULL DEFAULT NOW(), PRIMARY KEY (id))',
  );
};

up();
