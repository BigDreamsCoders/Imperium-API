-- Tables creation
CREATE TABLE "workstation"
(
    "id"                   SERIAL PRIMARY KEY      NOT NULL,
    "name"                 VARCHAR                 NOT NULL,
    "img"                  VARCHAR                 NOT NULL,
    "workstation_state_id" INTEGER                 NOT NULL,
    "workstation_type_id"  INTEGER                 NOT NULL,
    "created_at"           TIMESTAMP DEFAULT now() NOT NULL,
    "updated_at"           TIMESTAMP DEFAULT now() NOT NULL
);

CREATE TABLE "workstation_type"
(
    "id"         SERIAL PRIMARY KEY      NOT NULL,
    "name"       VARCHAR                 NOT NULL,
    "created_at" TIMESTAMP DEFAULT now() NOT NULL,
    "updated_at" TIMESTAMP DEFAULT now() NOT NULL

);

CREATE TABLE "workstation_state"
(
    "id"         SERIAL PRIMARY KEY      NOT NULL,
    "name"       VARCHAR                 NOT NULL,
    "created_at" TIMESTAMP DEFAULT now() NOT NULL,
    "updated_at" TIMESTAMP DEFAULT now() NOT NULL

);

CREATE TABLE "workstation_use"
(
    "id"                   SERIAL PRIMARY KEY      NOT NULL,
    "user_id"              INTEGER DEFAULT NULL,
    "workstation_id"       INTEGER                 NOT NULL,
    "workstation_action_id"   INTEGER                 NOT NULL,
    "created_at"           TIMESTAMP DEFAULT now() NOT NULL
);

CREATE TABLE "workstation_action"
(
    "id"                   SERIAL PRIMARY KEY      NOT NULL,
    "name"                 VARCHAR                 NOT NULL,
    "created_at"           TIMESTAMP DEFAULT now() NOT NULL,
    "updated_at"           TIMESTAMP DEFAULT now() NOT NULL
);

CREATE TABLE "role"
(
    "id"         SERIAL PRIMARY KEY      NOT NULL,
    "name"       VARCHAR                 NOT NULL,
    "created_at" TIMESTAMP DEFAULT now() NOT NULL,
    "updated_at" TIMESTAMP DEFAULT now() NOT NULL

);

CREATE TABLE "privilege"
(
    "id"         SERIAL PRIMARY KEY      NOT NULL,
    "display_name" VARCHAR               NOT NULL,
    "resource"   VARCHAR                 NOT NULL,
    "action"     VARCHAR                 NOT NULL,
    "possession" VARCHAR DEFAULT '',
    "created_at" TIMESTAMP DEFAULT now() NOT NULL,
    "updated_at" TIMESTAMP DEFAULT now() NOT NULL
);

CREATE TABLE "role_privilege"
(
    "role_id"    INTEGER                 NOT NULL,
    "privilege_id" INTEGER                 NOT NULL,
    "created_at" TIMESTAMP DEFAULT now() NOT NULL,
    "updated_at" TIMESTAMP DEFAULT now() NOT NULL,
    PRIMARY KEY ("role_id", "privilege_id")
);

CREATE TABLE "routine"
(
    "id"              SERIAL PRIMARY KEY      NOT NULL,
    "name"            VARCHAR                 NOT NULL,
    "suggested_time"  DECIMAL                 NOT NULL,
    "creator_id"      INTEGER                 NOT NULL,
    "routine_type_id" INTEGER                 NOT NULL,
    "created_at"      TIMESTAMP DEFAULT now() NOT NULL,
    "updated_at"      TIMESTAMP DEFAULT now() NOT NULL

);

CREATE TABLE "routine_type"
(
    "id"         SERIAL PRIMARY KEY      NOT NULL,
    "name"       VARCHAR                 NOT NULL,
    "created_at" TIMESTAMP DEFAULT now() NOT NULL,
    "updated_at" TIMESTAMP DEFAULT now() NOT NULL
);

CREATE TABLE "membership"
(
    "id"               SERIAL PRIMARY KEY      NOT NULL,
    "membership_type"  INTEGER                 NOT NULL,
    "membership_state" INTEGER                 NOT NULL,
    "created_at"       TIMESTAMP DEFAULT now() NOT NULL,
    "updated_at"       TIMESTAMP DEFAULT now() NOT NULL

);

CREATE TABLE "membership_type"
(
    "id"         SERIAL PRIMARY KEY      NOT NULL,
    "name"       VARCHAR                 NOT NULL,
    "price"      DECIMAL                 NOT NULL,
    "created_at" TIMESTAMP DEFAULT now() NOT NULL,
    "updated_at" TIMESTAMP DEFAULT now() NOT NULL

);

CREATE TABLE "membership_state"
(
    "id"         SERIAL PRIMARY KEY      NOT NULL,
    "name"       VARCHAR                 NOT NULL,
    "created_at" TIMESTAMP DEFAULT now() NOT NULL,
    "updated_at" TIMESTAMP DEFAULT now() NOT NULL

);

CREATE TABLE "gender"
(
    "id"         SERIAL PRIMARY KEY      NOT NULL,
    "name"       VARCHAR                 NOT NULL,
    "created_at" TIMESTAMP DEFAULT now() NOT NULL,
    "updated_at" TIMESTAMP DEFAULT now() NOT NULL
);

CREATE TABLE "medic_file"
(
    "id"         SERIAL PRIMARY KEY      NOT NULL,
    "weight"     DECIMAL                 NOT NULL,
    "height"     DECIMAL                 NOT NULL,
    "created_at" TIMESTAMP DEFAULT now() NOT NULL,
    "updated_at" TIMESTAMP DEFAULT now() NOT NULL

);

CREATE TABLE "building_entrance"
(
    "id"            SERIAL PRIMARY KEY      NOT NULL,
    "user_id"       INTEGER                 NOT NULL,
    "building_action_id"    INTEGER         NOT NULL,        
    "created_at"    TIMESTAMP DEFAULT now() NOT NULL
);

CREATE TABLE "building_entrance_action"
(
    "id"           SERIAL PRIMARY KEY      NOT NULL,
    "name"         VARCHAR                 NOT NULL,
    "crated_at"    TIMESTAMP DEFAULT now() NOT NULL
);

CREATE TABLE "user"
(
    "id"            SERIAL PRIMARY KEY      NOT NULL,
    "email"         VARCHAR                 NOT NULL,
    "password"      VARCHAR                 NOT NULL,
    "first_name"    VARCHAR                 NOT NULL,
    "last_name"     VARCHAR                 NOT NULL,
    "birthday"      TIMESTAMP               NOT NULL,
    "gender_id"     INTEGER                 NOT NULL,
    "membership_id" INTEGER                 NOT NULL,
    "role_id"       INTEGER                 NOT NULL,
    "file_id"       INTEGER                 NOT NULL,
    "created_at"    TIMESTAMP DEFAULT now() NOT NULL,
    "updated_at"    TIMESTAMP DEFAULT now() NOT NULL

);

ALTER TABLE "role_privilege_privilege"
    ADD FOREIGN KEY ("roleId") REFERENCES "role" ("id") ON DELETE CASCADE;

ALTER TABLE "role_privilege_privilege"
    ADD FOREIGN KEY ("privilegeId") REFERENCES "privilege" ("id") ON DELETE CASCADE;

ALTER TABLE "workstation"
    ADD FOREIGN KEY ("workstation_state_id") REFERENCES "workstation_state" ("id");

ALTER TABLE "workstation"
    ADD FOREIGN KEY ("workstation_type_id") REFERENCES "workstation_type" ("id");
    
ALTER TABLE "workstation_use"
    ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "workstation_use"
    ADD FOREIGN KEY ("workstation_id") REFERENCES "workstation" ("id");

ALTER TABLE "workstation_use"
    ADD FOREIGN KEY ("workstation_action_id") REFERENCES "workstation_action" ("id");

ALTER TABLE "membership"
    ADD FOREIGN KEY ("membership_state") REFERENCES "membership_state" ("id");

ALTER TABLE "membership"
    ADD FOREIGN KEY ("membership_type") REFERENCES "membership_type" ("id");

ALTER TABLE "routine"
    ADD FOREIGN KEY ("creator_id") REFERENCES "user" ("id");

ALTER TABLE "routine"
    ADD FOREIGN KEY ("routine_type_id") REFERENCES "routine_type" ("id");

ALTER TABLE "building_entrance"
    ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "building_entrance"
    ADD FOREIGN KEY ("building_action_id") REFERENCES "building_entrance_action" ("id");

ALTER TABLE "user"
    ADD FOREIGN KEY ("file_id") REFERENCES "medic_file" ("id");

ALTER TABLE "user"
    ADD FOREIGN KEY ("role_id") REFERENCES "role" ("id");

ALTER TABLE "user"
    ADD FOREIGN KEY ("gender_id") REFERENCES "gender" ("id");

ALTER TABLE "user"
    ADD FOREIGN KEY ("membership_id") REFERENCES "membership" ("id");