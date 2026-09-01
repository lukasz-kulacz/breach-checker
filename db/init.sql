CREATE TABLE IF NOT EXISTS leaked_passwords (
    hash CHAR(40) PRIMARY KEY  -- SHA-1
);

\copy leaked_passwords(hash) FROM '/docker-entrypoint-initdb.d/sample_hashes.txt';