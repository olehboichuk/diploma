DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS files CASCADE;
DROP TABLE IF EXISTS users_files CASCADE;
DROP TABLE IF EXISTS chats CASCADE;
DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE users
(
    id         BIGSERIAL NOT NULL,
    login      TEXT      NOT NULL UNIQUE,
    password   TEXT      NOT NULL,
    first_name TEXT      NULL,
    last_name  TEXT      NULL,
    active     BOOLEAN   NOT NULL DEFAULT TRUE,
    PRIMARY KEY (id)
);

CREATE TABLE files
(
    id          SERIAL NOT NULL,
    invite_link SERIAL NOT NULL UNIQUE,
    name        TEXT   NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE users_files
(
    id_user BIGINT  NOT NULL,
    id_file INTEGER NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_file) REFERENCES files (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY (id_user, id_file)
);

CREATE TABLE chats
(
    id      BIGSERIAL NOT NULL,
    id_file BIGINT    NOT NULL,
    id_user BIGINT    NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_file) REFERENCES files (id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE messages
(
    id          BIGSERIAL NOT NULL,
    id_chat     BIGSERIAL NOT NULL,
    id_user     BIGINT    NOT NULL,
    message     TEXT      NOT NULL,
    time_posted TIMESTAMP NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_chat) REFERENCES chats (id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (id)
);
