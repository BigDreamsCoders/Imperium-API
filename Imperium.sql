

CREATE TABLE public.building_entrance (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    user_id integer,
    building_action_id integer
);




--
-- TOC entry 231 (class 1259 OID 24803)

--

CREATE TABLE public.building_entrance_action (
    id integer NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);




--
-- TOC entry 230 (class 1259 OID 24801)

--

CREATE SEQUENCE public.building_entrance_action_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3240 (class 0 OID 0)
-- Dependencies: 230

--

ALTER SEQUENCE public.building_entrance_action_id_seq OWNED BY public.building_entrance_action.id;


--
-- TOC entry 232 (class 1259 OID 24813)

--

CREATE SEQUENCE public.building_entrance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3241 (class 0 OID 0)
-- Dependencies: 232

--

ALTER SEQUENCE public.building_entrance_id_seq OWNED BY public.building_entrance.id;


--
-- TOC entry 217 (class 1259 OID 24712)

--

CREATE TABLE public.gender (
    id integer NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);




--
-- TOC entry 216 (class 1259 OID 24710)

--

CREATE SEQUENCE public.gender_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3242 (class 0 OID 0)
-- Dependencies: 216

--

ALTER SEQUENCE public.gender_id_seq OWNED BY public.gender.id;


--
-- TOC entry 201 (class 1259 OID 24614)

--

CREATE TABLE public.medic_file (
    id integer NOT NULL,
    weight numeric NOT NULL,
    height numeric NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);




--
-- TOC entry 200 (class 1259 OID 24612)

--

CREATE SEQUENCE public.medic_file_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3243 (class 0 OID 0)
-- Dependencies: 200

--

ALTER SEQUENCE public.medic_file_id_seq OWNED BY public.medic_file.id;


--
-- TOC entry 207 (class 1259 OID 24650)

--

CREATE TABLE public.membership (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    membership_type integer,
    membership_state integer
);




--
-- TOC entry 206 (class 1259 OID 24648)

--

CREATE SEQUENCE public.membership_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3244 (class 0 OID 0)
-- Dependencies: 206

--

ALTER SEQUENCE public.membership_id_seq OWNED BY public.membership.id;


--
-- TOC entry 205 (class 1259 OID 24637)

--

CREATE TABLE public.membership_state (
    id integer NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);




--
-- TOC entry 204 (class 1259 OID 24635)

--

CREATE SEQUENCE public.membership_state_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3245 (class 0 OID 0)
-- Dependencies: 204

--

ALTER SEQUENCE public.membership_state_id_seq OWNED BY public.membership_state.id;


--
-- TOC entry 203 (class 1259 OID 24624)

--

CREATE TABLE public.membership_type (
    id integer NOT NULL,
    name character varying NOT NULL,
    price integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);




--
-- TOC entry 202 (class 1259 OID 24622)

--

CREATE SEQUENCE public.membership_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3246 (class 0 OID 0)
-- Dependencies: 202

--

ALTER SEQUENCE public.membership_type_id_seq OWNED BY public.membership_type.id;


--
-- TOC entry 209 (class 1259 OID 24660)

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




--
-- TOC entry 208 (class 1259 OID 24658)

--

CREATE SEQUENCE public.privilege_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3247 (class 0 OID 0)
-- Dependencies: 208

--

ALTER SEQUENCE public.privilege_id_seq OWNED BY public.privilege.id;


--
-- TOC entry 211 (class 1259 OID 24673)

--

CREATE TABLE public.role (
    id integer NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);




--
-- TOC entry 210 (class 1259 OID 24671)

--

CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3248 (class 0 OID 0)
-- Dependencies: 210

--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- TOC entry 234 (class 1259 OID 24822)

--

CREATE TABLE public.role_privilege_privilege (
    "roleId" integer NOT NULL,
    "privilegeId" integer NOT NULL
);




--
-- TOC entry 215 (class 1259 OID 24699)

--

CREATE TABLE public.routine (
    id integer NOT NULL,
    name character varying NOT NULL,
    suggested_time integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    creator_id integer,
    routine_type_id integer
);




--
-- TOC entry 214 (class 1259 OID 24697)

--

CREATE SEQUENCE public.routine_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3249 (class 0 OID 0)
-- Dependencies: 214

--

ALTER SEQUENCE public.routine_id_seq OWNED BY public.routine.id;


--
-- TOC entry 213 (class 1259 OID 24686)

--

CREATE TABLE public.routine_type (
    id integer NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);




--
-- TOC entry 212 (class 1259 OID 24684)

--

CREATE SEQUENCE public.routine_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3250 (class 0 OID 0)
-- Dependencies: 212

--

ALTER SEQUENCE public.routine_type_id_seq OWNED BY public.routine_type.id;


--
-- TOC entry 219 (class 1259 OID 24725)

--

CREATE TABLE public."user" (
    id integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    birthday timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    gender_id integer,
    membership_id integer,
    role_id integer,
    file_id integer
);




--
-- TOC entry 218 (class 1259 OID 24723)

--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3251 (class 0 OID 0)
-- Dependencies: 218

--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 221 (class 1259 OID 24742)

--

CREATE TABLE public.workstation (
    id integer NOT NULL,
    name character varying NOT NULL,
    img character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    workstation_type_id integer,
    workstation_state_id integer
);




--
-- TOC entry 223 (class 1259 OID 24755)

--

CREATE TABLE public.workstation_action (
    id integer NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);




--
-- TOC entry 222 (class 1259 OID 24753)

--

CREATE SEQUENCE public.workstation_action_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3252 (class 0 OID 0)
-- Dependencies: 222

--

ALTER SEQUENCE public.workstation_action_id_seq OWNED BY public.workstation_action.id;


--
-- TOC entry 220 (class 1259 OID 24740)

--

CREATE SEQUENCE public.workstation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3253 (class 0 OID 0)
-- Dependencies: 220

--

ALTER SEQUENCE public.workstation_id_seq OWNED BY public.workstation.id;


--
-- TOC entry 227 (class 1259 OID 24777)

--

CREATE TABLE public.workstation_state (
    id integer NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);




--
-- TOC entry 226 (class 1259 OID 24775)

--

CREATE SEQUENCE public.workstation_state_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3254 (class 0 OID 0)
-- Dependencies: 226

--

ALTER SEQUENCE public.workstation_state_id_seq OWNED BY public.workstation_state.id;


--
-- TOC entry 229 (class 1259 OID 24790)

--

CREATE TABLE public.workstation_type (
    id integer NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);




--
-- TOC entry 228 (class 1259 OID 24788)

--

CREATE SEQUENCE public.workstation_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3255 (class 0 OID 0)
-- Dependencies: 228

--

ALTER SEQUENCE public.workstation_type_id_seq OWNED BY public.workstation_type.id;


--
-- TOC entry 225 (class 1259 OID 24768)

--

CREATE TABLE public.workstation_use (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    user_id integer,
    workstation_id integer,
    workstation_action_id integer
);




--
-- TOC entry 224 (class 1259 OID 24766)

--

CREATE SEQUENCE public.workstation_use_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3256 (class 0 OID 0)
-- Dependencies: 224

--

ALTER SEQUENCE public.workstation_use_id_seq OWNED BY public.workstation_use.id;


--
-- TOC entry 3009 (class 2604 OID 24818)

--

ALTER TABLE ONLY public.building_entrance ALTER COLUMN id SET DEFAULT nextval('public.building_entrance_id_seq'::regclass);


--
-- TOC entry 3007 (class 2604 OID 24806)

--

ALTER TABLE ONLY public.building_entrance_action ALTER COLUMN id SET DEFAULT nextval('public.building_entrance_action_id_seq'::regclass);


--
-- TOC entry 2987 (class 2604 OID 24715)

--

ALTER TABLE ONLY public.gender ALTER COLUMN id SET DEFAULT nextval('public.gender_id_seq'::regclass);


--
-- TOC entry 2963 (class 2604 OID 24617)

--

ALTER TABLE ONLY public.medic_file ALTER COLUMN id SET DEFAULT nextval('public.medic_file_id_seq'::regclass);


--
-- TOC entry 2972 (class 2604 OID 24653)

--

ALTER TABLE ONLY public.membership ALTER COLUMN id SET DEFAULT nextval('public.membership_id_seq'::regclass);


--
-- TOC entry 2969 (class 2604 OID 24640)

--

ALTER TABLE ONLY public.membership_state ALTER COLUMN id SET DEFAULT nextval('public.membership_state_id_seq'::regclass);


--
-- TOC entry 2966 (class 2604 OID 24627)

--

ALTER TABLE ONLY public.membership_type ALTER COLUMN id SET DEFAULT nextval('public.membership_type_id_seq'::regclass);


--
-- TOC entry 2975 (class 2604 OID 24663)

--

ALTER TABLE ONLY public.privilege ALTER COLUMN id SET DEFAULT nextval('public.privilege_id_seq'::regclass);


--
-- TOC entry 2978 (class 2604 OID 24676)

--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- TOC entry 2984 (class 2604 OID 24702)

--

ALTER TABLE ONLY public.routine ALTER COLUMN id SET DEFAULT nextval('public.routine_id_seq'::regclass);


--
-- TOC entry 2981 (class 2604 OID 24689)

--

ALTER TABLE ONLY public.routine_type ALTER COLUMN id SET DEFAULT nextval('public.routine_type_id_seq'::regclass);


--
-- TOC entry 2990 (class 2604 OID 24728)

--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 2993 (class 2604 OID 24745)

--

ALTER TABLE ONLY public.workstation ALTER COLUMN id SET DEFAULT nextval('public.workstation_id_seq'::regclass);


--
-- TOC entry 2996 (class 2604 OID 24758)

--

ALTER TABLE ONLY public.workstation_action ALTER COLUMN id SET DEFAULT nextval('public.workstation_action_id_seq'::regclass);


--
-- TOC entry 3001 (class 2604 OID 24780)

--

ALTER TABLE ONLY public.workstation_state ALTER COLUMN id SET DEFAULT nextval('public.workstation_state_id_seq'::regclass);


--
-- TOC entry 3004 (class 2604 OID 24793)

--

ALTER TABLE ONLY public.workstation_type ALTER COLUMN id SET DEFAULT nextval('public.workstation_type_id_seq'::regclass);


--
-- TOC entry 2999 (class 2604 OID 24771)

--

ALTER TABLE ONLY public.workstation_use ALTER COLUMN id SET DEFAULT nextval('public.workstation_use_id_seq'::regclass);


--
-- TOC entry 3233 (class 0 OID 24815)
-- Dependencies: 233

--





--
-- TOC entry 3231 (class 0 OID 24803)
-- Dependencies: 231

--





--
-- TOC entry 3217 (class 0 OID 24712)
-- Dependencies: 217

--





--
-- TOC entry 3201 (class 0 OID 24614)
-- Dependencies: 201

--





--
-- TOC entry 3207 (class 0 OID 24650)
-- Dependencies: 207

--





--
-- TOC entry 3205 (class 0 OID 24637)
-- Dependencies: 205

--





--
-- TOC entry 3203 (class 0 OID 24624)
-- Dependencies: 203

--





--
-- TOC entry 3209 (class 0 OID 24660)
-- Dependencies: 209

--





--
-- TOC entry 3211 (class 0 OID 24673)
-- Dependencies: 211

--





--
-- TOC entry 3234 (class 0 OID 24822)
-- Dependencies: 234

--





--
-- TOC entry 3215 (class 0 OID 24699)
-- Dependencies: 215

--





--
-- TOC entry 3213 (class 0 OID 24686)
-- Dependencies: 213

--





--
-- TOC entry 3219 (class 0 OID 24725)
-- Dependencies: 219

--





--
-- TOC entry 3221 (class 0 OID 24742)
-- Dependencies: 221

--





--
-- TOC entry 3223 (class 0 OID 24755)
-- Dependencies: 223

--





--
-- TOC entry 3227 (class 0 OID 24777)
-- Dependencies: 227

--





--
-- TOC entry 3229 (class 0 OID 24790)
-- Dependencies: 229

--





--
-- TOC entry 3225 (class 0 OID 24768)
-- Dependencies: 225

--





--
-- TOC entry 3257 (class 0 OID 0)
-- Dependencies: 230

--

SELECT pg_catalog.setval('public.building_entrance_action_id_seq', 1, false);


--
-- TOC entry 3258 (class 0 OID 0)
-- Dependencies: 232

--

SELECT pg_catalog.setval('public.building_entrance_id_seq', 1, false);


--
-- TOC entry 3259 (class 0 OID 0)
-- Dependencies: 216

--

SELECT pg_catalog.setval('public.gender_id_seq', 1, false);


--
-- TOC entry 3260 (class 0 OID 0)
-- Dependencies: 200

--

SELECT pg_catalog.setval('public.medic_file_id_seq', 1, false);


--
-- TOC entry 3261 (class 0 OID 0)
-- Dependencies: 206

--

SELECT pg_catalog.setval('public.membership_id_seq', 1, false);


--
-- TOC entry 3262 (class 0 OID 0)
-- Dependencies: 204

--

SELECT pg_catalog.setval('public.membership_state_id_seq', 1, false);


--
-- TOC entry 3263 (class 0 OID 0)
-- Dependencies: 202

--

SELECT pg_catalog.setval('public.membership_type_id_seq', 1, false);


--
-- TOC entry 3264 (class 0 OID 0)
-- Dependencies: 208

--

SELECT pg_catalog.setval('public.privilege_id_seq', 1, false);


--
-- TOC entry 3265 (class 0 OID 0)
-- Dependencies: 210

--

SELECT pg_catalog.setval('public.role_id_seq', 1, false);


--
-- TOC entry 3266 (class 0 OID 0)
-- Dependencies: 214

--

SELECT pg_catalog.setval('public.routine_id_seq', 1, false);


--
-- TOC entry 3267 (class 0 OID 0)
-- Dependencies: 212

--

SELECT pg_catalog.setval('public.routine_type_id_seq', 1, false);


--
-- TOC entry 3268 (class 0 OID 0)
-- Dependencies: 218

--

SELECT pg_catalog.setval('public.user_id_seq', 1, false);


--
-- TOC entry 3269 (class 0 OID 0)
-- Dependencies: 222

--

SELECT pg_catalog.setval('public.workstation_action_id_seq', 1, false);


--
-- TOC entry 3270 (class 0 OID 0)
-- Dependencies: 220

--

SELECT pg_catalog.setval('public.workstation_id_seq', 1, false);


--
-- TOC entry 3271 (class 0 OID 0)
-- Dependencies: 226

--

SELECT pg_catalog.setval('public.workstation_state_id_seq', 1, false);


--
-- TOC entry 3272 (class 0 OID 0)
-- Dependencies: 228

--

SELECT pg_catalog.setval('public.workstation_type_id_seq', 1, false);


--
-- TOC entry 3273 (class 0 OID 0)
-- Dependencies: 224

--

SELECT pg_catalog.setval('public.workstation_use_id_seq', 1, false);


--
-- TOC entry 3038 (class 2606 OID 24765)

--

ALTER TABLE ONLY public.workstation_action
    ADD CONSTRAINT "PK_0ec6866df5bcc01b1410f7cc0ff" PRIMARY KEY (id);


--
-- TOC entry 3036 (class 2606 OID 24752)

--

ALTER TABLE ONLY public.workstation
    ADD CONSTRAINT "PK_305422595c2601e928ff7520516" PRIMARY KEY (id);


--
-- TOC entry 3014 (class 2606 OID 24634)

--

ALTER TABLE ONLY public.membership_type
    ADD CONSTRAINT "PK_5c09e5b961e10506b61cf12c9f9" PRIMARY KEY (id);


--
-- TOC entry 3024 (class 2606 OID 24696)

--

ALTER TABLE ONLY public.routine_type
    ADD CONSTRAINT "PK_5e11ae73d6afde6e551b400203c" PRIMARY KEY (id);


--
-- TOC entry 3026 (class 2606 OID 24709)

--

ALTER TABLE ONLY public.routine
    ADD CONSTRAINT "PK_5f1178fd54059b2f9479d6141ec" PRIMARY KEY (id);


--
-- TOC entry 3016 (class 2606 OID 24647)

--

ALTER TABLE ONLY public.membership_state
    ADD CONSTRAINT "PK_77a78f1c79575e10cefcbfa3b27" PRIMARY KEY (id);


--
-- TOC entry 3018 (class 2606 OID 24657)

--

ALTER TABLE ONLY public.membership
    ADD CONSTRAINT "PK_83c1afebef3059472e7c37e8de8" PRIMARY KEY (id);


--
-- TOC entry 3052 (class 2606 OID 24826)

--

ALTER TABLE ONLY public.role_privilege_privilege
    ADD CONSTRAINT "PK_93a4c74b153fc324b84a1f7cf19" PRIMARY KEY ("roleId", "privilegeId");


--
-- TOC entry 3028 (class 2606 OID 24722)

--

ALTER TABLE ONLY public.gender
    ADD CONSTRAINT "PK_98a711129bc073e6312d08364e8" PRIMARY KEY (id);


--
-- TOC entry 3044 (class 2606 OID 24800)

--

ALTER TABLE ONLY public.workstation_type
    ADD CONSTRAINT "PK_a2793fc7bb23c94ebca4c7c96c3" PRIMARY KEY (id);


--
-- TOC entry 3048 (class 2606 OID 24821)

--

ALTER TABLE ONLY public.building_entrance
    ADD CONSTRAINT "PK_b0acab4eb0428ddcc69408073da" PRIMARY KEY (id);


--
-- TOC entry 3020 (class 2606 OID 24670)

--

ALTER TABLE ONLY public.privilege
    ADD CONSTRAINT "PK_b1691196ff9c996998bab2e406e" PRIMARY KEY (id);


--
-- TOC entry 3022 (class 2606 OID 24683)

--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY (id);


--
-- TOC entry 3046 (class 2606 OID 24812)

--

ALTER TABLE ONLY public.building_entrance_action
    ADD CONSTRAINT "PK_c1408fabd203a3d9cfb4e84722a" PRIMARY KEY (id);


--
-- TOC entry 3040 (class 2606 OID 24774)

--

ALTER TABLE ONLY public.workstation_use
    ADD CONSTRAINT "PK_c2fcf0fdb8c3069d9ab8b7693f9" PRIMARY KEY (id);


--
-- TOC entry 3030 (class 2606 OID 24735)

--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- TOC entry 3012 (class 2606 OID 24621)

--

ALTER TABLE ONLY public.medic_file
    ADD CONSTRAINT "PK_f6b39c145a6df7415483b18d6ad" PRIMARY KEY (id);


--
-- TOC entry 3042 (class 2606 OID 24787)

--

ALTER TABLE ONLY public.workstation_state
    ADD CONSTRAINT "PK_f745ff43811fc1c334e18229b85" PRIMARY KEY (id);


--
-- TOC entry 3032 (class 2606 OID 24737)

--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "REL_79d3d7350ae33ad6fe1743df86" UNIQUE (membership_id);


--
-- TOC entry 3034 (class 2606 OID 24739)

--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "REL_c6771f226a8149de690641d11a" UNIQUE (file_id);


--
-- TOC entry 3049 (class 1259 OID 24828)

--

CREATE INDEX "IDX_0bd7464c26f4d699ec2a5bad08" ON public.role_privilege_privilege USING btree ("privilegeId");


--
-- TOC entry 3050 (class 1259 OID 24827)

--

CREATE INDEX "IDX_a0b7732af9502459207c8f1b22" ON public.role_privilege_privilege USING btree ("roleId");


--
-- TOC entry 3061 (class 2606 OID 24869)

--

ALTER TABLE ONLY public.workstation
    ADD CONSTRAINT "FK_07d5351bd5da015bc2b6d68a3d9" FOREIGN KEY (workstation_type_id) REFERENCES public.workstation_type(id);


--
-- TOC entry 3069 (class 2606 OID 24909)

--

ALTER TABLE ONLY public.role_privilege_privilege
    ADD CONSTRAINT "FK_0bd7464c26f4d699ec2a5bad08b" FOREIGN KEY ("privilegeId") REFERENCES public.privilege(id) ON DELETE CASCADE;


--
-- TOC entry 3054 (class 2606 OID 24834)

--

ALTER TABLE ONLY public.membership
    ADD CONSTRAINT "FK_50b6087a77db98729ece6a1e00a" FOREIGN KEY (membership_state) REFERENCES public.membership_state(id);


--
-- TOC entry 3056 (class 2606 OID 24844)

--

ALTER TABLE ONLY public.routine
    ADD CONSTRAINT "FK_56436af2f3bf6581afbab887c7f" FOREIGN KEY (routine_type_id) REFERENCES public.routine_type(id);


--
-- TOC entry 3053 (class 2606 OID 24829)

--

ALTER TABLE ONLY public.membership
    ADD CONSTRAINT "FK_60a861b92af00057b041209058e" FOREIGN KEY (membership_type) REFERENCES public.membership_type(id);


--
-- TOC entry 3055 (class 2606 OID 24839)

--

ALTER TABLE ONLY public.routine
    ADD CONSTRAINT "FK_635351519843a97fa5f157bda0c" FOREIGN KEY (creator_id) REFERENCES public."user"(id);


--
-- TOC entry 3057 (class 2606 OID 24849)

--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_6d4390ab1c0e8c86287d9f4c430" FOREIGN KEY (gender_id) REFERENCES public.gender(id);


--
-- TOC entry 3058 (class 2606 OID 24854)

--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_79d3d7350ae33ad6fe1743df86c" FOREIGN KEY (membership_id) REFERENCES public.membership(id);


--
-- TOC entry 3065 (class 2606 OID 24889)

--

ALTER TABLE ONLY public.workstation_use
    ADD CONSTRAINT "FK_811ea799f900a4ae20427405efd" FOREIGN KEY (workstation_action_id) REFERENCES public.workstation_action(id);


--
-- TOC entry 3067 (class 2606 OID 24899)

--

ALTER TABLE ONLY public.building_entrance
    ADD CONSTRAINT "FK_8f4a501a8d286034c57d44508e0" FOREIGN KEY (building_action_id) REFERENCES public.building_entrance_action(id);


--
-- TOC entry 3068 (class 2606 OID 24904)

--

ALTER TABLE ONLY public.role_privilege_privilege
    ADD CONSTRAINT "FK_a0b7732af9502459207c8f1b229" FOREIGN KEY ("roleId") REFERENCES public.role(id) ON DELETE CASCADE;


--
-- TOC entry 3060 (class 2606 OID 24864)

--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_c6771f226a8149de690641d11ae" FOREIGN KEY (file_id) REFERENCES public.medic_file(id);


--
-- TOC entry 3064 (class 2606 OID 24884)

--

ALTER TABLE ONLY public.workstation_use
    ADD CONSTRAINT "FK_cd3ef0f3991b077e354f9d1b064" FOREIGN KEY (workstation_id) REFERENCES public.workstation(id);


--
-- TOC entry 3062 (class 2606 OID 24874)

--

ALTER TABLE ONLY public.workstation
    ADD CONSTRAINT "FK_d2c45fcbdcb7550b82f10f33c99" FOREIGN KEY (workstation_state_id) REFERENCES public.workstation_state(id);


--
-- TOC entry 3063 (class 2606 OID 24879)

--

ALTER TABLE ONLY public.workstation_use
    ADD CONSTRAINT "FK_d92c15e4ff67b45449a1868767d" FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- TOC entry 3066 (class 2606 OID 24894)

--

ALTER TABLE ONLY public.building_entrance
    ADD CONSTRAINT "FK_ee96cbf1d06827e6a1e0dfb8210" FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- TOC entry 3059 (class 2606 OID 24859)

--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY (role_id) REFERENCES public.role(id);


-- Completed on 2020-10-22 00:08:02

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
    ('USERS', 'read', 'any', 'Leer usuarios');

INSERT INTO public.role_privilege_privilege ("roleId", "privilegeId")
    VALUES (1, 1), (1, 2), (1, 3), (1, 4), (1, 6), (1, 7), (2, 5);

INSERT INTO public.gender ("name") VALUES ('MASCULINO'), ('FEMENINO');

INSERT INTO public.membership_state ("name") VALUES ('ACTIVA'), ('INACTIVA'), ('VENCIDA');

INSERT INTO public.membership_type ("name", "price") VALUES ('BASICA', 11.99), ('PREMIUM', 29.99);
