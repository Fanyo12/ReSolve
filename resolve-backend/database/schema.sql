CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin') NOT NULL DEFAULT 'admin',
    active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(80) NOT NULL UNIQUE,
    active BOOLEAN NOT NULL DEFAULT TRUE
);
CREATE TABLE IF NOT EXISTS general_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(80) NOT NULL UNIQUE,
    active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS room_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(80) NOT NULL UNIQUE,
    active BOOLEAN NOT NULL DEFAULT TRUE
);
CREATE TABLE IF NOT EXISTS general_tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,

    report_date DATE NOT NULL,
    report_time TIME NOT NULL,

    location_name VARCHAR(120) NOT NULL,

    category_id INT NOT NULL,
    department_id INT NOT NULL,

    reported_by VARCHAR(100) NOT NULL,

    description TEXT NOT NULL,

    status ENUM(
        'por_realizar',
        'realizando',
        'realizado'
    ) NOT NULL DEFAULT 'por_realizar',

    solution TEXT,

    observations TEXT,

    external_provider BOOLEAN NOT NULL DEFAULT FALSE,

    provider_name VARCHAR(100),

    provider_date DATE,

    publish_library BOOLEAN NOT NULL DEFAULT FALSE,

    created_by INT NOT NULL,

    assigned_to INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_general_category
        FOREIGN KEY (category_id)
        REFERENCES general_categories(id),

    CONSTRAINT fk_general_department
        FOREIGN KEY (department_id)
        REFERENCES departments(id),

    CONSTRAINT fk_general_created_by
        FOREIGN KEY (created_by)
        REFERENCES users(id),

    CONSTRAINT fk_general_assigned_to
        FOREIGN KEY (assigned_to)
        REFERENCES users(id)
);