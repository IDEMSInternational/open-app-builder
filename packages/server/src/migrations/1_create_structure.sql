CREATE TABLE session_actions (
  id VARCHAR(255) NOT NULL,
  task_id VARCHAR(255) NOT NULL,
  actions json[],
  _created Timestamp without time zone,
  _appVersion VARCHAR(255) NOT NULL,
  _completed boolean,
  _duration VARCHAR(255) NOT NULL
);

ALTER TABLE session_actions ADD CONSTRAINT pksession_actions PRIMARY KEY (id);

CREATE TABLE changes (
  id SERIAL,
  rev integer,
  source integer,
  type varchar(255) NOT NULL,
  table_name varchar(255) NOT NULL,
  key varchar(255) NOT NULL,
  obj json,
  mods json
);

ALTER TABLE changes ADD CONSTRAINT pkchanges PRIMARY KEY (id);