--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0 (Debian 13.0-1.pgdg100+1)
-- Dumped by pg_dump version 13.0 (Debian 13.0-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: building_entrance; Type: TABLE; Schema: public; Owner: petrlr14
--

CREATE TABLE public.building_entrance (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    user_id integer,
    building_action_id integer
);


ALTER TABLE public.building_entrance OWNER TO petrlr14;

--
-- Name: building_entrance_action; Type: TABLE; Schema: public; Owner: petrlr14
--

CREATE TABLE public.building_entrance_action (
    id integer NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);

CREATE SEQUENCE public.building_entrance_action_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.building_entrance_action_id_seq OWNED BY public.building_entrance_action.id;


--
-- Name: building_entrance_id_seq; Type: SEQUENCE; Schema: public; Owner: petrlr14
--

CREATE SEQUENCE public.building_entrance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.building_entrance_id_seq OWNED BY public.building_entrance.id;


--
-- Name: gender; Type: TABLE; Schema: public; Owner: petrlr14
--

CREATE TABLE public.gender (
    id integer NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);

CREATE SEQUENCE public.gender_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.gender_id_seq OWNED BY public.gender.id;


--
-- Name: medic_file; Type: TABLE; Schema: public; Owner: petrlr14
--

CREATE TABLE public.medic_file (
    id integer NOT NULL,
    weight numeric NOT NULL,
    height numeric NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);

CREATE SEQUENCE public.medic_file_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.medic_file_id_seq OWNED BY public.medic_file.id;


--
-- Name: membership; Type: TABLE; Schema: public; Owner: petrlr14
--

CREATE TABLE public.membership (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    membership_type integer,
    membership_state integer
);

CREATE SEQUENCE public.membership_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.membership_id_seq OWNED BY public.membership.id;


--
-- Name: membership_state; Type: TABLE; Schema: public; Owner: petrlr14
--

CREATE TABLE public.membership_state (
    id integer NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);

CREATE SEQUENCE public.membership_state_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.membership_state_id_seq OWNED BY public.membership_state.id;


--
-- Name: membership_type; Type: TABLE; Schema: public; Owner: petrlr14
--

CREATE TABLE public.membership_type (
    id integer NOT NULL,
    name character varying NOT NULL,
    price numeric NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);

CREATE SEQUENCE public.membership_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.membership_type_id_seq OWNED BY public.membership_type.id;


--
-- Name: privilege; Type: TABLE; Schema: public; Owner: petrlr14
--

CREATE TABLE public.privilege (
    id integer NOT NULL,
    resource character varying NOT NULL,
    action character varying NOT NULL,
    possession character varying NOT NULL,
    display_name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);

CREATE SEQUENCE public.privilege_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.privilege_id_seq OWNED BY public.privilege.id;


--
-- Name: role; Type: TABLE; Schema: public; Owner: petrlr14
--

CREATE TABLE public.role (
    id integer NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);

CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- Name: role_privilege_privilege; Type: TABLE; Schema: public; Owner: petrlr14
--

CREATE TABLE public.role_privilege_privilege (
    "roleId" integer NOT NULL,
    "privilegeId" integer NOT NULL
);

CREATE TABLE public.routine (
    id integer NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    creator_id integer
);

CREATE TABLE public.routine_data (
    id integer NOT NULL,
    "time" character varying,
    repetition integer,
    sets integer,
    workstation_id integer,
    calories character varying
);

CREATE SEQUENCE public.routine_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.routine_data_id_seq OWNED BY public.routine_data.id;



--
-- Name: routine_history; Type: TABLE; Schema: public; Owner: petrlr14
--

CREATE TABLE public.routine_history (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    routine_id integer,
    user_id integer
);

CREATE TABLE public.routine_history_data_routine_data (
    "routineHistoryId" integer NOT NULL,
    "routineDataId" integer NOT NULL
);

CREATE SEQUENCE public.routine_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.routine_history_id_seq OWNED BY public.routine_history.id;


--
-- Name: routine_id_seq; Type: SEQUENCE; Schema: public; Owner: petrlr14
--

CREATE SEQUENCE public.routine_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.routine_id_seq OWNED BY public.routine.id;


--
-- Name: routine_type; Type: TABLE; Schema: public; Owner: petrlr14
--

CREATE TABLE public.routine_type (
    id integer NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);

CREATE SEQUENCE public.routine_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.routine_type_id_seq OWNED BY public.routine_type.id;


--
-- Name: routine_workstation_workstation; Type: TABLE; Schema: public; Owner: petrlr14
--

CREATE TABLE public.routine_workstation_workstation (
    "routineId" integer NOT NULL,
    "workstationId" integer NOT NULL
);

CREATE TABLE public.routine_workstation_workstation_category (
    "routineId" integer NOT NULL,
    "workstationCategoryId" integer NOT NULL
);

CREATE TABLE public."user" (
    id integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    birthday timestamp without time zone NOT NULL,
    is_identified boolean DEFAULT false NOT NULL, 
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    gender_id integer,
    membership_id integer,
    role_id integer,
    file_id integer
);

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: user_saved_routines_routine; Type: TABLE; Schema: public; Owner: petrlr14
--

CREATE TABLE public.user_saved_routines_routine (
    "userId" integer NOT NULL,
    "routineId" integer NOT NULL
);

CREATE TABLE public.workstation (
    id integer NOT NULL,
    code character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    workstation_type_id integer,
    workstation_state_id integer,
    workstation_category_id integer
);

CREATE TABLE public.workstation_action (
    id integer NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);

CREATE SEQUENCE public.workstation_action_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.workstation_action_id_seq OWNED BY public.workstation_action.id;


--
-- Name: workstation_category; Type: TABLE; Schema: public; Owner: petrlr14
--

CREATE TABLE public.workstation_category (
    id integer NOT NULL,
    name character varying NOT NULL,
    img character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    workstation_type_id integer
);

CREATE SEQUENCE public.workstation_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.workstation_category_id_seq OWNED BY public.workstation_category.id;


--
-- Name: workstation_id_seq; Type: SEQUENCE; Schema: public; Owner: petrlr14
--

CREATE SEQUENCE public.workstation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.workstation_id_seq OWNED BY public.workstation.id;


--
-- Name: workstation_state; Type: TABLE; Schema: public; Owner: petrlr14
--

CREATE TABLE public.workstation_state (
    id integer NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);

CREATE SEQUENCE public.workstation_state_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.workstation_state_id_seq OWNED BY public.workstation_state.id;


--
-- Name: workstation_type; Type: TABLE; Schema: public; Owner: petrlr14
--

CREATE TABLE public.workstation_type (
    id integer NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);

CREATE SEQUENCE public.workstation_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.workstation_type_id_seq OWNED BY public.workstation_type.id;


--
-- Name: workstation_use; Type: TABLE; Schema: public; Owner: petrlr14
--

CREATE TABLE public.workstation_use (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    user_id integer,
    workstation_id integer,
    workstation_action_id integer
);

CREATE SEQUENCE public.workstation_use_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.workstation_use_id_seq OWNED BY public.workstation_use.id;


--
-- Name: building_entrance id; Type: DEFAULT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.building_entrance ALTER COLUMN id SET DEFAULT nextval('public.building_entrance_id_seq'::regclass);


--
-- Name: building_entrance_action id; Type: DEFAULT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.building_entrance_action ALTER COLUMN id SET DEFAULT nextval('public.building_entrance_action_id_seq'::regclass);


--
-- Name: gender id; Type: DEFAULT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.gender ALTER COLUMN id SET DEFAULT nextval('public.gender_id_seq'::regclass);


--
-- Name: medic_file id; Type: DEFAULT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.medic_file ALTER COLUMN id SET DEFAULT nextval('public.medic_file_id_seq'::regclass);


--
-- Name: membership id; Type: DEFAULT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.membership ALTER COLUMN id SET DEFAULT nextval('public.membership_id_seq'::regclass);


--
-- Name: membership_state id; Type: DEFAULT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.membership_state ALTER COLUMN id SET DEFAULT nextval('public.membership_state_id_seq'::regclass);


--
-- Name: membership_type id; Type: DEFAULT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.membership_type ALTER COLUMN id SET DEFAULT nextval('public.membership_type_id_seq'::regclass);


--
-- Name: privilege id; Type: DEFAULT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.privilege ALTER COLUMN id SET DEFAULT nextval('public.privilege_id_seq'::regclass);


--
-- Name: role id; Type: DEFAULT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- Name: routine id; Type: DEFAULT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.routine ALTER COLUMN id SET DEFAULT nextval('public.routine_id_seq'::regclass);


--
-- Name: routine_data id; Type: DEFAULT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.routine_data ALTER COLUMN id SET DEFAULT nextval('public.routine_data_id_seq'::regclass);



--
-- Name: routine_history id; Type: DEFAULT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.routine_history ALTER COLUMN id SET DEFAULT nextval('public.routine_history_id_seq'::regclass);


--
-- Name: routine_type id; Type: DEFAULT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.routine_type ALTER COLUMN id SET DEFAULT nextval('public.routine_type_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: workstation id; Type: DEFAULT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.workstation ALTER COLUMN id SET DEFAULT nextval('public.workstation_id_seq'::regclass);


--
-- Name: workstation_action id; Type: DEFAULT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.workstation_action ALTER COLUMN id SET DEFAULT nextval('public.workstation_action_id_seq'::regclass);


--
-- Name: workstation_category id; Type: DEFAULT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.workstation_category ALTER COLUMN id SET DEFAULT nextval('public.workstation_category_id_seq'::regclass);


--
-- Name: workstation_state id; Type: DEFAULT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.workstation_state ALTER COLUMN id SET DEFAULT nextval('public.workstation_state_id_seq'::regclass);


--
-- Name: workstation_type id; Type: DEFAULT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.workstation_type ALTER COLUMN id SET DEFAULT nextval('public.workstation_type_id_seq'::regclass);


--
-- Name: workstation_use id; Type: DEFAULT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.workstation_use ALTER COLUMN id SET DEFAULT nextval('public.workstation_use_id_seq'::regclass);



SELECT pg_catalog.setval('public.building_entrance_action_id_seq', 1, false);


--
-- Name: building_entrance_id_seq; Type: SEQUENCE SET; Schema: public; Owner: petrlr14
--

SELECT pg_catalog.setval('public.building_entrance_id_seq', 1, false);


--
-- Name: gender_id_seq; Type: SEQUENCE SET; Schema: public; Owner: petrlr14
--

SELECT pg_catalog.setval('public.gender_id_seq', 2, true);


--
-- Name: medic_file_id_seq; Type: SEQUENCE SET; Schema: public; Owner: petrlr14
--

SELECT pg_catalog.setval('public.medic_file_id_seq', 2, true);


--
-- Name: membership_id_seq; Type: SEQUENCE SET; Schema: public; Owner: petrlr14
--

SELECT pg_catalog.setval('public.membership_id_seq', 2, true);


--
-- Name: membership_state_id_seq; Type: SEQUENCE SET; Schema: public; Owner: petrlr14
--

SELECT pg_catalog.setval('public.membership_state_id_seq', 3, true);


--
-- Name: membership_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: petrlr14
--

SELECT pg_catalog.setval('public.membership_type_id_seq', 2, true);


--
-- Name: privilege_id_seq; Type: SEQUENCE SET; Schema: public; Owner: petrlr14
--

SELECT pg_catalog.setval('public.privilege_id_seq', 7, true);


--
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: petrlr14
--

SELECT pg_catalog.setval('public.role_id_seq', 2, true);


--
-- Name: routine_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: petrlr14
--

SELECT pg_catalog.setval('public.routine_data_id_seq', 1, false);


--
-- Name: routine_data_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: petrlr14
--

SELECT pg_catalog.setval('public.routine_data_type_id_seq', 2, true);


--
-- Name: routine_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: petrlr14
--

SELECT pg_catalog.setval('public.routine_history_id_seq', 1, false);


--
-- Name: routine_id_seq; Type: SEQUENCE SET; Schema: public; Owner: petrlr14
--

SELECT pg_catalog.setval('public.routine_id_seq', 7, true);


--
-- Name: routine_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: petrlr14
--

SELECT pg_catalog.setval('public.routine_type_id_seq', 1, false);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: petrlr14
--

SELECT pg_catalog.setval('public.user_id_seq', 2, true);


--
-- Name: workstation_action_id_seq; Type: SEQUENCE SET; Schema: public; Owner: petrlr14
--

SELECT pg_catalog.setval('public.workstation_action_id_seq', 2, true);


--
-- Name: workstation_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: petrlr14
--

SELECT pg_catalog.setval('public.workstation_category_id_seq', 4, true);


--
-- Name: workstation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: petrlr14
--

SELECT pg_catalog.setval('public.workstation_id_seq', 15, true);


--
-- Name: workstation_state_id_seq; Type: SEQUENCE SET; Schema: public; Owner: petrlr14
--

SELECT pg_catalog.setval('public.workstation_state_id_seq', 3, true);


--
-- Name: workstation_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: petrlr14
--

SELECT pg_catalog.setval('public.workstation_type_id_seq', 2, true);


--
-- Name: workstation_use_id_seq; Type: SEQUENCE SET; Schema: public; Owner: petrlr14
--

SELECT pg_catalog.setval('public.workstation_use_id_seq', 34, true);


--
-- Name: workstation_action PK_0ec6866df5bcc01b1410f7cc0ff; Type: CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.workstation_action
    ADD CONSTRAINT "PK_0ec6866df5bcc01b1410f7cc0ff" PRIMARY KEY (id);


--
-- Name: workstation PK_305422595c2601e928ff7520516; Type: CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.workstation
    ADD CONSTRAINT "PK_305422595c2601e928ff7520516" PRIMARY KEY (id);


--
-- Name: routine_data PK_4b67981d16fe91bb0d9bcf8b0f0; Type: CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.routine_data
    ADD CONSTRAINT "PK_4b67981d16fe91bb0d9bcf8b0f0" PRIMARY KEY (id);


--
-- Name: routine_workstation_workstation_category PK_4bc31665d179c55cf5046d2523a; Type: CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.routine_workstation_workstation_category
    ADD CONSTRAINT "PK_4bc31665d179c55cf5046d2523a" PRIMARY KEY ("routineId", "workstationCategoryId");


--
-- Name: membership_type PK_5c09e5b961e10506b61cf12c9f9; Type: CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.membership_type
    ADD CONSTRAINT "PK_5c09e5b961e10506b61cf12c9f9" PRIMARY KEY (id);


--
-- Name: routine_type PK_5e11ae73d6afde6e551b400203c; Type: CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.routine_type
    ADD CONSTRAINT "PK_5e11ae73d6afde6e551b400203c" PRIMARY KEY (id);


--
-- Name: routine PK_5f1178fd54059b2f9479d6141ec; Type: CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.routine
    ADD CONSTRAINT "PK_5f1178fd54059b2f9479d6141ec" PRIMARY KEY (id);


--
-- Name: user_saved_routines_routine PK_69fbcab74bfb6457c800d8d30fa; Type: CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.user_saved_routines_routine
    ADD CONSTRAINT "PK_69fbcab74bfb6457c800d8d30fa" PRIMARY KEY ("userId", "routineId");


--
-- Name: membership_state PK_77a78f1c79575e10cefcbfa3b27; Type: CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.membership_state
    ADD CONSTRAINT "PK_77a78f1c79575e10cefcbfa3b27" PRIMARY KEY (id);


--
-- Name: membership PK_83c1afebef3059472e7c37e8de8; Type: CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.membership
    ADD CONSTRAINT "PK_83c1afebef3059472e7c37e8de8" PRIMARY KEY (id);


--
-- Name: role_privilege_privilege PK_93a4c74b153fc324b84a1f7cf19; Type: CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.role_privilege_privilege
    ADD CONSTRAINT "PK_93a4c74b153fc324b84a1f7cf19" PRIMARY KEY ("roleId", "privilegeId");


--
-- Name: gender PK_98a711129bc073e6312d08364e8; Type: CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.gender
    ADD CONSTRAINT "PK_98a711129bc073e6312d08364e8" PRIMARY KEY (id);


--
-- Name: workstation_category PK_9d16d098fdc64e1bf10730d5951; Type: CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.workstation_category
    ADD CONSTRAINT "PK_9d16d098fdc64e1bf10730d5951" PRIMARY KEY (id);


--
-- Name: workstation_type PK_a2793fc7bb23c94ebca4c7c96c3; Type: CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.workstation_type
    ADD CONSTRAINT "PK_a2793fc7bb23c94ebca4c7c96c3" PRIMARY KEY (id);


--
-- Name: building_entrance PK_b0acab4eb0428ddcc69408073da; Type: CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.building_entrance
    ADD CONSTRAINT "PK_b0acab4eb0428ddcc69408073da" PRIMARY KEY (id);


--
-- Name: privilege PK_b1691196ff9c996998bab2e406e; Type: CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.privilege
    ADD CONSTRAINT "PK_b1691196ff9c996998bab2e406e" PRIMARY KEY (id);


--
-- Name: role PK_b36bcfe02fc8de3c57a8b2391c2; Type: CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY (id);


--
-- Name: routine_history_data_routine_data PK_bdbfe190665918fb67cc20e51ca; Type: CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.routine_history_data_routine_data
    ADD CONSTRAINT "PK_bdbfe190665918fb67cc20e51ca" PRIMARY KEY ("routineHistoryId", "routineDataId");


--
-- Name: routine_history PK_c106e063288c9686f7bd2363ccd; Type: CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.routine_history
    ADD CONSTRAINT "PK_c106e063288c9686f7bd2363ccd" PRIMARY KEY (id);


--
-- Name: building_entrance_action PK_c1408fabd203a3d9cfb4e84722a; Type: CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.building_entrance_action
    ADD CONSTRAINT "PK_c1408fabd203a3d9cfb4e84722a" PRIMARY KEY (id);


--
-- Name: workstation_use PK_c2fcf0fdb8c3069d9ab8b7693f9; Type: CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.workstation_use
    ADD CONSTRAINT "PK_c2fcf0fdb8c3069d9ab8b7693f9" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);



--
-- Name: routine_workstation_workstation PK_eee1bbd1214ffac038978a47215; Type: CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.routine_workstation_workstation
    ADD CONSTRAINT "PK_eee1bbd1214ffac038978a47215" PRIMARY KEY ("routineId", "workstationId");


--
-- Name: medic_file PK_f6b39c145a6df7415483b18d6ad; Type: CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.medic_file
    ADD CONSTRAINT "PK_f6b39c145a6df7415483b18d6ad" PRIMARY KEY (id);


--
-- Name: workstation_state PK_f745ff43811fc1c334e18229b85; Type: CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.workstation_state
    ADD CONSTRAINT "PK_f745ff43811fc1c334e18229b85" PRIMARY KEY (id);


--
-- Name: user REL_79d3d7350ae33ad6fe1743df86; Type: CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "REL_79d3d7350ae33ad6fe1743df86" UNIQUE (membership_id);


--
-- Name: user REL_c6771f226a8149de690641d11a; Type: CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "REL_c6771f226a8149de690641d11a" UNIQUE (file_id);


--
-- Name: IDX_02cb33d054232c83af6dda7952; Type: INDEX; Schema: public; Owner: petrlr14
--

CREATE INDEX "IDX_02cb33d054232c83af6dda7952" ON public.routine_workstation_workstation USING btree ("routineId");


--
-- Name: IDX_0bd7464c26f4d699ec2a5bad08; Type: INDEX; Schema: public; Owner: petrlr14
--

CREATE INDEX "IDX_0bd7464c26f4d699ec2a5bad08" ON public.role_privilege_privilege USING btree ("privilegeId");


--
-- Name: IDX_1bb65f97814955e7f4b0b2370f; Type: INDEX; Schema: public; Owner: petrlr14
--

CREATE INDEX "IDX_1bb65f97814955e7f4b0b2370f" ON public.user_saved_routines_routine USING btree ("userId");


--
-- Name: IDX_344903258f2aedc0f2ef5a8da9; Type: INDEX; Schema: public; Owner: petrlr14
--

CREATE INDEX "IDX_344903258f2aedc0f2ef5a8da9" ON public.routine_history_data_routine_data USING btree ("routineHistoryId");


--
-- Name: IDX_65e9ea7611bf59285f9233d171; Type: INDEX; Schema: public; Owner: petrlr14
--

CREATE INDEX "IDX_65e9ea7611bf59285f9233d171" ON public.routine_workstation_workstation_category USING btree ("routineId");


--
-- Name: IDX_945c21de79cf825677d737ae57; Type: INDEX; Schema: public; Owner: petrlr14
--

CREATE INDEX "IDX_945c21de79cf825677d737ae57" ON public.user_saved_routines_routine USING btree ("routineId");


--
-- Name: IDX_a0b7732af9502459207c8f1b22; Type: INDEX; Schema: public; Owner: petrlr14
--

CREATE INDEX "IDX_a0b7732af9502459207c8f1b22" ON public.role_privilege_privilege USING btree ("roleId");


--
-- Name: IDX_bae24226df5419260e20415e5a; Type: INDEX; Schema: public; Owner: petrlr14
--

CREATE INDEX "IDX_bae24226df5419260e20415e5a" ON public.routine_workstation_workstation_category USING btree ("workstationCategoryId");


--
-- Name: IDX_d2548aea7b0221d2e673d70475; Type: INDEX; Schema: public; Owner: petrlr14
--

CREATE INDEX "IDX_d2548aea7b0221d2e673d70475" ON public.routine_history_data_routine_data USING btree ("routineDataId");


--
-- Name: IDX_ff8552a2c966f9fb86fa3c5928; Type: INDEX; Schema: public; Owner: petrlr14
--

CREATE INDEX "IDX_ff8552a2c966f9fb86fa3c5928" ON public.routine_workstation_workstation USING btree ("workstationId");


--
-- Name: routine_workstation_workstation FK_02cb33d054232c83af6dda79528; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.routine_workstation_workstation
    ADD CONSTRAINT "FK_02cb33d054232c83af6dda79528" FOREIGN KEY ("routineId") REFERENCES public.routine(id) ON DELETE CASCADE;


--
-- Name: workstation FK_07d5351bd5da015bc2b6d68a3d9; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.workstation
    ADD CONSTRAINT "FK_07d5351bd5da015bc2b6d68a3d9" FOREIGN KEY (workstation_type_id) REFERENCES public.workstation_type(id);


--
-- Name: role_privilege_privilege FK_0bd7464c26f4d699ec2a5bad08b; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.role_privilege_privilege
    ADD CONSTRAINT "FK_0bd7464c26f4d699ec2a5bad08b" FOREIGN KEY ("privilegeId") REFERENCES public.privilege(id) ON DELETE CASCADE;



--
-- Name: user_saved_routines_routine FK_1bb65f97814955e7f4b0b2370fe; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.user_saved_routines_routine
    ADD CONSTRAINT "FK_1bb65f97814955e7f4b0b2370fe" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: routine_history_data_routine_data FK_344903258f2aedc0f2ef5a8da94; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.routine_history_data_routine_data
    ADD CONSTRAINT "FK_344903258f2aedc0f2ef5a8da94" FOREIGN KEY ("routineHistoryId") REFERENCES public.routine_history(id) ON DELETE CASCADE;


--
-- Name: workstation_category FK_34ce58cb8abb3e1c1c2c1d6946a; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.workstation_category
    ADD CONSTRAINT "FK_34ce58cb8abb3e1c1c2c1d6946a" FOREIGN KEY (workstation_type_id) REFERENCES public.workstation_type(id);


--
-- Name: membership FK_50b6087a77db98729ece6a1e00a; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.membership
    ADD CONSTRAINT "FK_50b6087a77db98729ece6a1e00a" FOREIGN KEY (membership_state) REFERENCES public.membership_state(id);


--
-- Name: membership FK_60a861b92af00057b041209058e; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.membership
    ADD CONSTRAINT "FK_60a861b92af00057b041209058e" FOREIGN KEY (membership_type) REFERENCES public.membership_type(id);


--
-- Name: routine FK_635351519843a97fa5f157bda0c; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.routine
    ADD CONSTRAINT "FK_635351519843a97fa5f157bda0c" FOREIGN KEY (creator_id) REFERENCES public."user"(id);


--
-- Name: routine_workstation_workstation_category FK_65e9ea7611bf59285f9233d1716; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.routine_workstation_workstation_category
    ADD CONSTRAINT "FK_65e9ea7611bf59285f9233d1716" FOREIGN KEY ("routineId") REFERENCES public.routine(id) ON DELETE CASCADE;


--
-- Name: user FK_6d4390ab1c0e8c86287d9f4c430; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_6d4390ab1c0e8c86287d9f4c430" FOREIGN KEY (gender_id) REFERENCES public.gender(id);


--
-- Name: routine_data FK_74a7e0abff56e60869c21ea270b; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.routine_data
    ADD CONSTRAINT "FK_74a7e0abff56e60869c21ea270b" FOREIGN KEY (workstation_id) REFERENCES public.workstation(id);


--
-- Name: user FK_79d3d7350ae33ad6fe1743df86c; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_79d3d7350ae33ad6fe1743df86c" FOREIGN KEY (membership_id) REFERENCES public.membership(id);


--
-- Name: workstation_use FK_811ea799f900a4ae20427405efd; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.workstation_use
    ADD CONSTRAINT "FK_811ea799f900a4ae20427405efd" FOREIGN KEY (workstation_action_id) REFERENCES public.workstation_action(id);


--
-- Name: building_entrance FK_8f4a501a8d286034c57d44508e0; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.building_entrance
    ADD CONSTRAINT "FK_8f4a501a8d286034c57d44508e0" FOREIGN KEY (building_action_id) REFERENCES public.building_entrance_action(id);


--
-- Name: user_saved_routines_routine FK_945c21de79cf825677d737ae576; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.user_saved_routines_routine
    ADD CONSTRAINT "FK_945c21de79cf825677d737ae576" FOREIGN KEY ("routineId") REFERENCES public.routine(id) ON DELETE CASCADE;


--
-- Name: role_privilege_privilege FK_a0b7732af9502459207c8f1b229; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.role_privilege_privilege
    ADD CONSTRAINT "FK_a0b7732af9502459207c8f1b229" FOREIGN KEY ("roleId") REFERENCES public.role(id) ON DELETE CASCADE;


--
-- Name: routine_workstation_workstation_category FK_bae24226df5419260e20415e5a7; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.routine_workstation_workstation_category
    ADD CONSTRAINT "FK_bae24226df5419260e20415e5a7" FOREIGN KEY ("workstationCategoryId") REFERENCES public.workstation_category(id) ON DELETE CASCADE;


--
-- Name: user FK_c6771f226a8149de690641d11ae; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_c6771f226a8149de690641d11ae" FOREIGN KEY (file_id) REFERENCES public.medic_file(id);


--
-- Name: workstation_use FK_cd3ef0f3991b077e354f9d1b064; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.workstation_use
    ADD CONSTRAINT "FK_cd3ef0f3991b077e354f9d1b064" FOREIGN KEY (workstation_id) REFERENCES public.workstation(id);


--
-- Name: routine_history FK_cdb527d837fe60e0581d85b7eb7; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.routine_history
    ADD CONSTRAINT "FK_cdb527d837fe60e0581d85b7eb7" FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: routine_history_data_routine_data FK_d2548aea7b0221d2e673d704758; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.routine_history_data_routine_data
    ADD CONSTRAINT "FK_d2548aea7b0221d2e673d704758" FOREIGN KEY ("routineDataId") REFERENCES public.routine_data(id) ON DELETE CASCADE;


--
-- Name: workstation FK_d2c45fcbdcb7550b82f10f33c99; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.workstation
    ADD CONSTRAINT "FK_d2c45fcbdcb7550b82f10f33c99" FOREIGN KEY (workstation_state_id) REFERENCES public.workstation_state(id);


--
-- Name: routine_history FK_d5430efc612f1810e3667f5ca6a; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.routine_history
    ADD CONSTRAINT "FK_d5430efc612f1810e3667f5ca6a" FOREIGN KEY (routine_id) REFERENCES public.routine(id);


--
-- Name: workstation_use FK_d92c15e4ff67b45449a1868767d; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.workstation_use
    ADD CONSTRAINT "FK_d92c15e4ff67b45449a1868767d" FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: workstation FK_e8abbcfc41321b2b45ac1bb8f14; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.workstation
    ADD CONSTRAINT "FK_e8abbcfc41321b2b45ac1bb8f14" FOREIGN KEY (workstation_category_id) REFERENCES public.workstation_category(id);


--
-- Name: building_entrance FK_ee96cbf1d06827e6a1e0dfb8210; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.building_entrance
    ADD CONSTRAINT "FK_ee96cbf1d06827e6a1e0dfb8210" FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: user FK_fb2e442d14add3cefbdf33c4561; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- Name: routine_workstation_workstation FK_ff8552a2c966f9fb86fa3c59289; Type: FK CONSTRAINT; Schema: public; Owner: petrlr14
--

ALTER TABLE ONLY public.routine_workstation_workstation
    ADD CONSTRAINT "FK_ff8552a2c966f9fb86fa3c59289" FOREIGN KEY ("workstationId") REFERENCES public.workstation(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

-- database pupulation
INSERT INTO public.role (name) VALUES ('ADMIN'), ('USER');
INSERT INTO public.privilege ("resource", "action", "possession", "display_name" )
	VALUES 
    ('ROLES', 'create', '', 'Crear roles'),
    ('ROLES', 'read', 'any', 'Leer roles de usuarios'),
    ('ROLES', 'update', '', 'Actualizar roles'),
    ('ROLES', 'delete', 'any', 'Eliminar roles'),
    ('ROLES', 'read', 'own', 'Leer propio rol'),
    ('ADMIN', 'read', 'own', 'Entrar a portal de administración'),
    ('USERS', 'read', 'any', 'Leer usuarios'), 
    ('MARK', 'update', 'any', 'Marcar entrada y salida');

INSERT INTO public.role_privilege_privilege ("roleId", "privilegeId")
    VALUES (1, 1), (1, 2), (1, 3), (1, 4), (1, 6), (1, 7), (1, 8), (2, 5);

INSERT INTO public.gender ("name") VALUES ('MASCULINO'), ('FEMENINO');

INSERT INTO public.membership_state ("name") VALUES ('ACTIVA'), ('INACTIVA'), ('VENCIDA');

INSERT INTO public.membership_type ("name", "price") VALUES ('BASICA', 11.99), ('PREMIUM', 29.99);

INSERT INTO public.workstation_type ("name") VALUES ('Cardio'), ('Strength');

INSERT INTO public.workstation_state ("name") VALUES ('Available'), ('Unavailable'), ('Inactive');

INSERT INTO public.workstation_category ("name", "img", "workstation_type_id") 
VALUES 
    ('Elíptica', 'https://www.mundofitness.es/media/catalog/product/cache/1/image/654x654/9df78eab33525d08d6e5fb8d27136e95/p/e/petl74917-gallery.png', 1),
    ('Remo', 'https://www.johnsonfitness.com/Home/ProductImage?sku=2712US', 1),
    ('Bicileta estacionaria', 'https://img2.pngio.com/exercise-bike-png-transparent-exercise-bikepng-images-pluspng-stationary-bike-png-300_300.png', 1),
    ('Caminadora', 'https://pngimg.com/uploads/treadmill/treadmill_PNG12.png', 1),
    ('Prensa', 'https://i.ibb.co/PMVBRMV/Maquina.png', 2);
    

INSERT INTO public.workstation ("code", "workstation_type_id", "workstation_state_id", "workstation_category_id")
VALUES 
    ('ELL01', 1, 1, 1), ('ELL02', 1, 1, 1), ('ELL03', 1, 1, 1), ('ELL04', 1, 1, 1), ('ELL05', 1, 1, 1),
    ('ROWING01', 1, 1, 2), ('ROWING02', 1, 1, 2), ('ROWING03', 1, 1, 2), ('ROWING04', 1, 1, 2), ('ROWING05', 1, 1, 2),
    ('BIKE01', 1, 1, 3), ('BIKE02', 1, 1, 3), ('BIKE03', 1, 1, 3), ('BIKE04', 1, 1, 3), ('BIKE05', 1, 1, 3),
    ('CAMINADORA01', 1, 1, 4), ('CAMINADORA02', 1, 1, 4), ('CAMINADORA03', 1, 1, 4), ('CAMINADORA04', 1, 1, 4), ('CAMINADORA05', 1, 1, 4),
    ('PRENSA01', 2, 1, 5), ('PRESNA02', 2, 1, 5), ('PRESNA03', 2, 1, 5), ('PRESNA04', 2, 1, 5), ('PRESNA05', 2, 1, 5);

INSERT INTO building_entrance_action("name") values ('ENTRADA'), ('SALIDA')