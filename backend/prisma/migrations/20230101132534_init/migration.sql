-- CreateTable
CREATE TABLE `People` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `id_number` VARCHAR(191) NULL DEFAULT '',
    `pesel` VARCHAR(191) NULL DEFAULT '',
    `nip` VARCHAR(191) NULL DEFAULT '',
    `telephone` VARCHAR(191) NULL DEFAULT '',
    `email` VARCHAR(191) NULL DEFAULT '',
    `description` VARCHAR(191) NULL DEFAULT '',
    `adress` VARCHAR(191) NULL DEFAULT '',
    `type_of_person` ENUM('legal', 'private', 'none') NOT NULL,
    `black_list` BOOLEAN NULL DEFAULT false,
    `province_id` INTEGER NOT NULL,
    `city_id` INTEGER NOT NULL,
    `commune_id` INTEGER NOT NULL,
    `shelters_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `People_ID_key`(`ID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tablePeople` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `adress` VARCHAR(191) NOT NULL,
    `pesel` VARCHAR(191) NOT NULL,
    `nip` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,
    `commune` VARCHAR(191) NOT NULL,
    `black_list` BOOLEAN NOT NULL,
    `shelters_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dataRegisterPeople` (
    `ID` INTEGER NOT NULL,
    `animals_id` VARCHAR(191) NOT NULL,
    `people_id` INTEGER NOT NULL,
    `type_of_person` ENUM('legal', 'private', 'none') NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `id_number` VARCHAR(191) NULL,
    `pesel` VARCHAR(191) NULL,
    `nip` VARCHAR(191) NULL,
    `telephone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `adress` VARCHAR(191) NULL,
    `city` VARCHAR(191) NOT NULL,
    `zip_code` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `shelters_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `dataRegisterPeople_ID_key`(`ID`),
    UNIQUE INDEX `dataRegisterPeople_animals_id_key`(`animals_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Animals` (
    `ID` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `nr_chip` VARCHAR(191) NOT NULL,
    `id_number` VARCHAR(191) NOT NULL,
    `date_vaccination` DATE NULL,
    `vaccination` BOOLEAN NOT NULL,
    `date_of_birth` DATE NOT NULL,
    `size` ENUM('medium', 'large', 'small') NOT NULL,
    `gender` ENUM('male', 'female') NOT NULL,
    `description_animal` VARCHAR(191) NULL DEFAULT '',
    `area_id` INTEGER NOT NULL,
    `commune_id` INTEGER NOT NULL,
    `color_id` INTEGER NOT NULL,
    `species_id` INTEGER NOT NULL,
    `breed_id` INTEGER NOT NULL,
    `shelters_id` VARCHAR(191) NOT NULL,
    `sterilization` BOOLEAN NOT NULL,
    `date_sterilization` DATE NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tableAnimals` (
    `ID` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `species` VARCHAR(191) NOT NULL,
    `breed` VARCHAR(191) NOT NULL,
    `gender` ENUM('male', 'female') NOT NULL,
    `commune` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NOT NULL,
    `id_number` VARCHAR(191) NOT NULL,
    `nr_chip` VARCHAR(191) NOT NULL,
    `shelters_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dataRegisterAnimal` (
    `ID` INTEGER NOT NULL,
    `animals_id` VARCHAR(191) NOT NULL,
    `people_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `species` VARCHAR(191) NOT NULL,
    `breed` VARCHAR(191) NOT NULL,
    `id_number` VARCHAR(191) NOT NULL,
    `commune` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `size` ENUM('medium', 'large', 'small') NOT NULL,
    `gender` ENUM('male', 'female') NOT NULL,
    `nr_chip` VARCHAR(191) NOT NULL,
    `date_of_birth` DATETIME(3) NOT NULL,
    `description_animal` VARCHAR(191) NOT NULL,
    `shelters_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `dataRegisterAnimal_ID_key`(`ID`),
    UNIQUE INDEX `dataRegisterAnimal_animals_id_key`(`animals_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Adoption` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `date_of_adoption` DATE NOT NULL,
    `description` VARCHAR(191) NULL DEFAULT '',
    `introduced_employee_id` INTEGER NOT NULL,
    `spent_employee_id` INTEGER NOT NULL,
    `type_adoption_id` INTEGER NOT NULL,
    `people_id` INTEGER NOT NULL,
    `animals_id` VARCHAR(191) NOT NULL,
    `shelters_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dataAdoptionAnimal` (
    `ID` INTEGER NOT NULL,
    `animals_id` VARCHAR(191) NOT NULL,
    `people_id` INTEGER NOT NULL,
    `nameAnimals` VARCHAR(191) NOT NULL,
    `species_id` INTEGER NOT NULL,
    `type_adoption` VARCHAR(191) NOT NULL,
    `date_of_adoption` DATE NOT NULL,
    `nameIntroduced` VARCHAR(191) NOT NULL,
    `sunameIntroduced` VARCHAR(191) NOT NULL,
    `nameSpent` VARCHAR(191) NOT NULL,
    `sunameSpent` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL DEFAULT '',
    `shelters_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `dataAdoptionAnimal_animals_id_key`(`animals_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Registration` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `date_of_registration` DATE NOT NULL,
    `quarantine` DATE NOT NULL,
    `type_of_acceptance` VARCHAR(191) NOT NULL,
    `decription_registration` VARCHAR(191) NULL DEFAULT '',
    `introduced_employees_id` INTEGER NOT NULL,
    `accepted_employees_id` INTEGER NOT NULL,
    `people_id` INTEGER NOT NULL,
    `animals_id` VARCHAR(191) NOT NULL,
    `shelters_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `animalsOfPeopleGivingBack` (
    `ID` INTEGER NOT NULL,
    `people_id` INTEGER NOT NULL,
    `animals_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `species` VARCHAR(191) NOT NULL,
    `breed` VARCHAR(191) NOT NULL,
    `gender` ENUM('male', 'female') NOT NULL,
    `commune` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NOT NULL,
    `id_number` VARCHAR(191) NOT NULL,
    `nr_chip` VARCHAR(191) NOT NULL,
    `shelters_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dataRegistration` (
    `ID` INTEGER NOT NULL,
    `animals_id` VARCHAR(191) NOT NULL,
    `people_id` INTEGER NOT NULL,
    `date_of_registration` DATE NOT NULL,
    `quarantine` DATE NOT NULL,
    `sterilization` BOOLEAN NOT NULL,
    `date_sterilization` DATE NULL,
    `nameIntroduced` VARCHAR(191) NOT NULL,
    `surnameIntroduced` VARCHAR(191) NOT NULL,
    `decription_registration` VARCHAR(191) NOT NULL,
    `shelters_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `dataRegistration_ID_key`(`ID`),
    UNIQUE INDEX `dataRegistration_animals_id_key`(`animals_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `City` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `city` VARCHAR(191) NOT NULL,
    `zip_code` VARCHAR(191) NOT NULL,
    `shelters_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `City_ID_key`(`ID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Province` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `province` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Commune` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `commune` VARCHAR(191) NOT NULL,
    `shelters_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Commune_ID_key`(`ID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Species` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `species` VARCHAR(191) NOT NULL,
    `shelters_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Species_ID_key`(`ID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Breed` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `breed` VARCHAR(191) NOT NULL,
    `species_id` INTEGER NOT NULL,
    `shelters_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Breed_ID_key`(`ID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Color` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `color` VARCHAR(191) NOT NULL,
    `shelters_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Color_ID_key`(`ID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Area` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `area` VARCHAR(191) NOT NULL,
    `shelters_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Area_ID_key`(`ID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TypeAdoption` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `type_adoption` VARCHAR(191) NOT NULL,
    `shelters_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TypeAdoption_ID_key`(`ID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employees` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `surname` VARCHAR(191) NOT NULL,
    `shelters_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Employees_ID_key`(`ID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shelters` (
    `ID` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `img` LONGBLOB NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `ID` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Account_ID_key`(`ID`),
    UNIQUE INDEX `Account_username_key`(`username`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `People` ADD CONSTRAINT `People_province_id_fkey` FOREIGN KEY (`province_id`) REFERENCES `Province`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `People` ADD CONSTRAINT `People_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `City`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `People` ADD CONSTRAINT `People_commune_id_fkey` FOREIGN KEY (`commune_id`) REFERENCES `Commune`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `People` ADD CONSTRAINT `People_shelters_id_fkey` FOREIGN KEY (`shelters_id`) REFERENCES `Shelters`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Animals` ADD CONSTRAINT `Animals_area_id_fkey` FOREIGN KEY (`area_id`) REFERENCES `Area`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Animals` ADD CONSTRAINT `Animals_commune_id_fkey` FOREIGN KEY (`commune_id`) REFERENCES `Commune`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Animals` ADD CONSTRAINT `Animals_color_id_fkey` FOREIGN KEY (`color_id`) REFERENCES `Color`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Animals` ADD CONSTRAINT `Animals_species_id_fkey` FOREIGN KEY (`species_id`) REFERENCES `Species`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Animals` ADD CONSTRAINT `Animals_breed_id_fkey` FOREIGN KEY (`breed_id`) REFERENCES `Breed`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Animals` ADD CONSTRAINT `Animals_shelters_id_fkey` FOREIGN KEY (`shelters_id`) REFERENCES `Shelters`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Adoption` ADD CONSTRAINT `Adoption_introduced_employee_id_fkey` FOREIGN KEY (`introduced_employee_id`) REFERENCES `Employees`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Adoption` ADD CONSTRAINT `Adoption_spent_employee_id_fkey` FOREIGN KEY (`spent_employee_id`) REFERENCES `Employees`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Adoption` ADD CONSTRAINT `Adoption_type_adoption_id_fkey` FOREIGN KEY (`type_adoption_id`) REFERENCES `TypeAdoption`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Adoption` ADD CONSTRAINT `Adoption_people_id_fkey` FOREIGN KEY (`people_id`) REFERENCES `People`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Adoption` ADD CONSTRAINT `Adoption_animals_id_fkey` FOREIGN KEY (`animals_id`) REFERENCES `Animals`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Adoption` ADD CONSTRAINT `Adoption_shelters_id_fkey` FOREIGN KEY (`shelters_id`) REFERENCES `Shelters`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Registration` ADD CONSTRAINT `Registration_introduced_employees_id_fkey` FOREIGN KEY (`introduced_employees_id`) REFERENCES `Employees`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Registration` ADD CONSTRAINT `Registration_accepted_employees_id_fkey` FOREIGN KEY (`accepted_employees_id`) REFERENCES `Employees`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Registration` ADD CONSTRAINT `Registration_people_id_fkey` FOREIGN KEY (`people_id`) REFERENCES `People`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Registration` ADD CONSTRAINT `Registration_animals_id_fkey` FOREIGN KEY (`animals_id`) REFERENCES `Animals`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Registration` ADD CONSTRAINT `Registration_shelters_id_fkey` FOREIGN KEY (`shelters_id`) REFERENCES `Shelters`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `City` ADD CONSTRAINT `City_shelters_id_fkey` FOREIGN KEY (`shelters_id`) REFERENCES `Shelters`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commune` ADD CONSTRAINT `Commune_shelters_id_fkey` FOREIGN KEY (`shelters_id`) REFERENCES `Shelters`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Species` ADD CONSTRAINT `Species_shelters_id_fkey` FOREIGN KEY (`shelters_id`) REFERENCES `Shelters`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Breed` ADD CONSTRAINT `Breed_species_id_fkey` FOREIGN KEY (`species_id`) REFERENCES `Species`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Breed` ADD CONSTRAINT `Breed_shelters_id_fkey` FOREIGN KEY (`shelters_id`) REFERENCES `Shelters`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Color` ADD CONSTRAINT `Color_shelters_id_fkey` FOREIGN KEY (`shelters_id`) REFERENCES `Shelters`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Area` ADD CONSTRAINT `Area_shelters_id_fkey` FOREIGN KEY (`shelters_id`) REFERENCES `Shelters`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TypeAdoption` ADD CONSTRAINT `TypeAdoption_shelters_id_fkey` FOREIGN KEY (`shelters_id`) REFERENCES `Shelters`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employees` ADD CONSTRAINT `Employees_shelters_id_fkey` FOREIGN KEY (`shelters_id`) REFERENCES `Shelters`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
