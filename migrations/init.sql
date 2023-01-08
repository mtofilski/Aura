CREATE TABLE receiver_view (
        id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        receiver varchar(255) NOT NULL,
        amount int(11) NOT NULL DEFAULT '0',
        created datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        modified datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY id (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE reward (
        id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        receiver varchar(255) NOT NULL,
        giver varchar(255) NOT NULL,
        amount int(11) NOT NULL,
        created datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY id (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE giver_view (
        id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        giver varchar(255) NOT NULL,
        amount int(11) NOT NULL DEFAULT '0',
        created datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        modified datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY id (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;