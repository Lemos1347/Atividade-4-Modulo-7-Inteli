\connect -reuse-previous=on "dbname='API-CRUD'"

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

--
-- Name: Role; Type: TYPE; Schema: public; Owner: user
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN'
);


ALTER TYPE public."Role" OWNER TO "user";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Customer; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public."Customer" (
    id text NOT NULL,
    name text NOT NULL,
    gender text NOT NULL,
    age integer NOT NULL,
    annual_income integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."Customer" OWNER TO "user";

--
-- Name: Prediction; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public."Prediction" (
    id text NOT NULL,
    predicted double precision NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."Prediction" OWNER TO "user";

--
-- Name: User; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    name text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    role public."Role"[] DEFAULT ARRAY['USER'::public."Role"]
);


ALTER TABLE public."User" OWNER TO "user";

--
-- Data for Name: Customer; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public."Customer" (id, name, gender, age, annual_income, "createdAt", "updatedAt", "userId") FROM stdin;
bd9d4190-4934-4438-9c1a-097136b4c0be	Nicola	homem	30	30	2023-09-27 17:44:29.735	2023-09-27 17:44:29.735	634d80c2-7b11-407e-8595-d965b04427b8
4b4beb2c-68a4-4eef-a43d-f2c7cddc1be9	Nicole 	mulher	25	100	2023-09-27 17:44:45.388	2023-09-27 17:44:45.388	634d80c2-7b11-407e-8595-d965b04427b8
9043d86a-d642-45dd-9e6e-c5790abb3e36	Murilo	homem	25	50	2023-09-27 17:44:18.207	2023-09-27 17:45:03.76	634d80c2-7b11-407e-8595-d965b04427b8
\.


--
-- Data for Name: Prediction; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public."Prediction" (id, predicted, "createdAt", "userId") FROM stdin;
7f8e8960-c72a-425f-a876-3d9980ab04bc	59.33879326552118	2023-09-27 17:44:54.092	9043d86a-d642-45dd-9e6e-c5790abb3e36
f6790f61-f20f-4ce7-bcf7-2aeacab60b28	58.16294599745507	2023-09-27 17:44:59.619	9043d86a-d642-45dd-9e6e-c5790abb3e36
364b57fa-e6fc-4daf-a97a-19ef89df4337	58.7015759004514	2023-09-27 17:45:06.421	9043d86a-d642-45dd-9e6e-c5790abb3e36
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public."User" (id, email, name, password, "createdAt", "updatedAt", role) FROM stdin;
634d80c2-7b11-407e-8595-d965b04427b8	gui@gmail.com	Guilherme	$2b$12$aSinHhwh7LuzhIU7dOofcO0YDkRrB3M9fforV/F8yilZ6lcfB9gqi	2023-09-27 17:29:06.322	2023-09-27 17:29:48.666	{USER,ADMIN}
884ec7be-72ff-4f48-b9bb-7fc81d3ab8d7	gmail@nicola.com	Nicola	$2b$12$fr8RPwn3UfiqsXMU450Ecu3iEPZaA9T7cGTtJMSxThaCvahlSiNqO	2023-09-27 17:45:48.261	2023-09-27 17:45:50.352	{USER,ADMIN}
\.


--
-- Name: Customer Customer_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "Customer_pkey" PRIMARY KEY (id);


--
-- Name: Prediction Prediction_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Prediction"
    ADD CONSTRAINT "Prediction_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: user
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Customer Customer_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Prediction Prediction_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Prediction"
    ADD CONSTRAINT "Prediction_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Customer"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0 (Debian 16.0-1.pgdg120+1)
-- Dumped by pg_dump version 16.0 (Debian 16.0-1.pgdg120+1)

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

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: user
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO "user";

\connect postgres

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

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: user
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

