CREATE TABLE "gender" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "routine_type" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "membership_type" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "membership_state" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "role" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "privilage" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "roleXprivilage" (
  "role_id" int,
  "privilage_id" int,
  PRIMARY KEY ("role_id", "privilage_id")
);

CREATE TABLE "workstation" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "img" varchar,
  "workstation_state_id" int
);

CREATE TABLE "workstation_state" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "birthday" timestamp,
  "gender_id" int,
  "membership_id" int,
  "role_id" int,
  "file_id" int
);

CREATE TABLE "file" (
  "id" SERIAL PRIMARY KEY,
  "weight" decimal,
  "height" decimal
);

CREATE TABLE "membership" (
  "id" SERIAL PRIMARY KEY,
  "membership_type" int,
  "membership_state" int
);

CREATE TABLE "routine" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "suggested_time" double,
  "creator_id" int,
  "routine_type_id" int
);

ALTER TABLE "roleXprivilage" ADD FOREIGN KEY ("role_id") REFERENCES "role" ("id");

ALTER TABLE "roleXprivilage" ADD FOREIGN KEY ("privilage_id") REFERENCES "privilage" ("id");

ALTER TABLE "workstation" ADD FOREIGN KEY ("workstation_state_id") REFERENCES "workstation_state" ("id");

ALTER TABLE "file" ADD FOREIGN KEY ("id") REFERENCES "user" ("file_id");

ALTER TABLE "user" ADD FOREIGN KEY ("role_id") REFERENCES "role" ("id");

ALTER TABLE "gender" ADD FOREIGN KEY ("id") REFERENCES "user" ("gender_id");

ALTER TABLE "membership" ADD FOREIGN KEY ("membership_state") REFERENCES "membership_state" ("id");

ALTER TABLE "membership" ADD FOREIGN KEY ("membership_type") REFERENCES "membership_type" ("id");

ALTER TABLE "membership" ADD FOREIGN KEY ("id") REFERENCES "user" ("membership_id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "routine" ("creator_id");

ALTER TABLE "routine_type" ADD FOREIGN KEY ("id") REFERENCES "routine" ("routine_type_id");

